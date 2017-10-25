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

Start the example `node examples/simple-api.js` and fire a curl against your API.

```shell
curl -X GET -H "accept: application/json" http://localhost:7448/api/hello
```

Read more about the `api()` method at [REST API](./docs/api.md) page
### Start a server

The default port is 7448. Supershit starts a webserver when it's required. Use the start command to start the app in clustermode `supershit start` or for development use the dev command `supershit dev`, it reloads the app everytime when any source file changes.

Refer to [CLI](./docs/commands.md) page to get a list of all supported commands.

## Logging

Everybody love logs, and we know that. [Logtopus](https://github.com/Andifeind/logtopus) is a very flexible logger module for Node.js and comes with different loggers. Place the logger configuration in the project config by using the key `log`. Paste a Logtopus config here as it's described in their docs.

```coffee
log:
  level: 'debug'
  logger:
    console:
      colors: true
    file:
      logfile: 'logs/supershit.log'
```

Within your code, after you have instantiate a Logger instance you can use a few logging methods.

```js
const log = supershit.logger()
log.info('App started successful,', {
  port: 7448
})

log.debug('Process id:,', process.pid)
```

The `suershit.logger()` method returns a instance of the `Logtopus` logger. It comes with a few methods. See [Logging](https://github.com/andifeind/logtopuss) page for more about logging.
