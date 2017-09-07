Supershit Docs
==============

## Example

```js
import supershit from 'supershit'

const app = supershit.app({
  path: '/',
  title: 'My page title',
  port: 7448
})

const pageModule = app.module({
  cmp: 'PageLayout'
})

const contentModule = pageModule.module({
  cmp: 'HelloCMP',
  model: 'HelloModel'
})
```

Start the web-server with the `supershit start` command and navigate to `http://localhost:7448/`

## Class methods

### api(*str* mount path) => `SupershitRouter`

Creates a API object and defines a route namespace. The method returns a `SupershitRouter` instance.
Use this to define a RESTFull API.

#### Example:

```js
import supershit from 'supershit'

const api = supershit.api('/api')

api.route('/hello', {
  get() {
    return { message: 'Hello World!' }
  }
})
```

### app(*obj* path) `SupershitPage`

Register a `SupershitApp` under a specific path and port.

Returns a `SupershitPage` object


### cmd(*str* command) `Promise`

Register a cli command. The filename must be equal with the command.
Command files must placed under `bin/`

```
my-project/
  bin/
    test.js
```

```js
import Supershit from 'supershit'
Supershit.cmd('test', () => {
  console.log('Hello World!')
})
```

Returns a `Promise`
