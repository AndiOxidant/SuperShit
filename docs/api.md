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

##### get(*obj* req, *obj* res)

Defines a GET route under `slug`. This method is called when a GET request has been made to `slug`. It takes two arguments.

`req` The incoming request, its an Express.js [req](http://expressjs.com/en/4x/api.html#req) object  
`res` The outgoing response, its an Express.js [res](http://expressjs.com/en/4x/api.html#res) object  

**Return value**  
If the return value is a `Promise` it uses the resolving value as output,
otherwise the return value is used.

```js
api.route('/hello', {
  get() {
    return { message: 'Hello World!' }
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

#### use([*str* slug,] *func* ...fn)

Registers one or more a middlewares. All middlewares getting called before any routs, even they get registered after them.

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
