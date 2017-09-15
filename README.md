Supershit
=========

Lightweight search-engine friendly single-page web framework

## Installation

```shell
npm i supershit -g
```


Folder tree
-----------

```
app/            Backend stuff
  modules/      Backend modules
  routes/       Backend rest api adapter
  app.js        Bootstrap file
conf/           Configurations
bin/            Scripts
public/         Public stuff (URL: /filename.xy)
web/            Frontend stuff
  js/           Frontend Javascript
    web.js      Bootstrap file
  styles/       Frontend styls
    styles.styl Bootstrap file
```
## How to use

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

```curl
curl -X GET -H "accept: application/json" http://localhost:7448/api/hello
```

### Start a server

The default port is 7448. It is not necessary to start a web-server, Supershit starts it when it's required.

## Logging

Everybody love logs, and we know that. [Logtopus](https://github.com/Andifeind/logtopus) is a very flexible logger module for Node.js and comes with different loggers. Place the logger configuration in the project config by using the key `logger`. Paste a Logtopus config object as its described in the docs.

```coffee
logger:
  level: 'debug'
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

The `suershit.logger()` method returns a instance of the `Logtopus` logger. It comes with a few methods. See [the docs](https://github.com/andifeind/logtopuss) for a complete list.
