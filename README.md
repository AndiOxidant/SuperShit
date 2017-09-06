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
