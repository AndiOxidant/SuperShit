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
    return Promise.resolve({ message: 'Hello World!' })
  }
})
```
