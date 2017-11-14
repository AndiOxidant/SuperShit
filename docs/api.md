Building REST APIs
==================

Supershit has a `api()` method to define REST APIs. A call returns a `SupershitRouter` instance.

```js
import supershit from 'supershit'

const api = supershit.api('/api')

api.route('/hello', {
  get() {
    return { message: 'Hello World!' }
  }
})
```

### Usage

#### api([*str* mount])

Returns a `SupershitRouter` instance. The Router can get an optional mount path.


### SupershitRouter

#### route(*str* slug, *obj* conf)

Registers a route under `slug`. The second arg configures the route.

##### VERB(*obj* req, *obj* res)

**VERB** can be a lowercased HTTP method. We support `GET`, `POST`, `PUT`, `PATCH` and `DELETE`.

It registers a HTTP request handler under `slug`. This method gets called when a request of the same method to `slug` was made. The method knows two arguments.

`req` The incoming request, its an Express.js [req](http://expressjs.com/en/4x/api.html#req) object  
`res` The outgoing response, its an Express.js [res](http://expressjs.com/en/4x/api.html#res) object  

**Return value**  
If the return value is a `Promise` it uses the resolving value as output,
otherwise the returned value is used.

```js
api.route('/hello', {
  get(req, res) {
    return { message: 'Hello World!' }
  },
  post(req, res) {
    return db.save('user', req.body.user)
  }
})

// or with promises

api.route('/hello', {
  get() {
    return new Promise((resolve, reject) => {
      resolve({ message: 'Hello World!' })
    }
  }
})

// or if you're using NodeJS >= 8 you could use async/await instead

api.route('/hello', {
  async get() {
    const msg = await Promise.resolve({ message: 'Hello World!' })
    return msg
  }
})
```

##### *obj* model

Connect a model instance or class with a route. It registers a path depending on `allow` and `static` option.

It registers a `GET` route under slug `/${slug}/:id`. If static is set to true, no `/:id` part would be add. The `allow` option can be used to register `POST`, `PUT` or `DELETE routes.

```js
api.route('/user', {
  model: UserModel,
  allow: ['READ', 'CREATE']
})
```

registers:  

`GET /api/user/:id` to return a user  
`POST /api/user/` to create a user`  

##### *bool*  static

If static is true and `model` is using the slug won't be a dynamic route.
The registered path is `/${slug}` and it always returns the same model.

##### *arr* allow

Set route methods. Possible values are: `READ`, `CREATE`, `UPDATE` and `DELETE`

Flag | Method
-----|-------
READ | `GET /${slug}/:id` Get a dataset (default)
CREATE | `POST /${slug}` Create a dataset
REPLACE | `PUT /${slug}/:id` Replace a dataset
CHANGE | `PATCH /${slug}/:id` Change a dataset or subset
DELETE | `DELETE /${slug}/:id` Delete a dataset
UPDATE | REPLACE and CHANGE
CRUD | CREATE, READ, UPDATE and DELETE

#### use([*str* slug,] *func* ...fn)

Registers one or more middlewares. All middlewares getting called before any routs, even they get registered after them.

```js
api.use((req, res, next) => {
  // do something here
  return next()
})
```

```js
api.use(async (req, res, next) => {
  // do something here
  await Promise.resolve()
  if (!req.isAdmin) {
    // exit chain
    return
  } else {
    // continue chain
    return next()
  }
})
```

### ErrorHandling

Supershit has a basic error handling. Whenever an error is thrown within a request handler the request responds with `500 Internal Server Error`

```js
api.route('/hello', {
  get() {
    throw new Error('Something went wrong')
  }
})
```

Response:

```http
GET 500 /hello
{
  "type": "InternalServerError",
  "message": "Something went wrong"
}
```

The error type can be set by throwing a specific error

```js
import { NotFoundError } from 'supershit'

api.route('/hello', {
  get() {
    throw new NotFoundError('Item was not found!')
  }
})
```

Response:

```http
GET 404 /hello
{
  "type": "NotFoundError",
  "message": "Item was not found!"
}
```
