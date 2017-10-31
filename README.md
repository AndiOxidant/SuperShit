Supershit
=========

Lightweight search-engine friendly single-page web framework

Installation
------------

```shell
npm i supershit -g
```


How to use
----------

### REST API

Lets create a simple REST API in a few steps.

```js
const api = supershit.api('/api')

api.route('/hello', {
  get() {
    return { message: 'Hello World!' }
  }
})
```

You'll find this example in `examples/simple-api.js` folder.
Start the example by using the command `node examples/simple-api.js` and fire a curl to the API.

```shell
curl -X GET -H "accept: application/json" http://localhost:7448/api/hello

# Response
< HTTP/1.1 200 OK
< Access-Control-Allow-Origin: *
< Content-Type: application/json; charset=utf-8
< Content-Length: 26
{"message":"Hello World!"}
```


Read more about the `api()` method at [REST API](./docs/api.md) page
### Start a server

The default port is 7448. Supershit starts a webserver when it's required. Use the start command `supershit start` to start the app in clustermode or for development the dev command `supershit dev`, it reloads the app everytime when a source file changes.

Refer to [CLI](./docs/commands.md) page to get a list of all supported commands.

## Config

Supershit reads config from `config/${process.env.NODE_ENV}.json`. A config file can be either a `.json`, `.cson` or `.yaml` file.

```js
// load config from config files
const config = supershit.config()
```

Read more about config at the [Config](./docs/config.md) page.


## Logging

```js
const log = supershit.logger()
log.info('App started successful,', {
  port: 7448
})

log.debug('Process id:,', process.pid)
```

Read more about logging at the [Logging](./docs/logging.md) page.
