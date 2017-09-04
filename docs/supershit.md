Supershit Docs
==============

## Example

```js
import Supershit from 'supershit'

const app = Supershit.app({
  path: '/',
  title: 'My page title',
  port: 7448
});

const pageModule = app.module({
  cmp: 'PageLayout'
});

const contentModule = pageModule.module({
  cmp: 'HelloCMP',
  model: 'HelloModel'
});
```

Start the web-server with `supershit start` and navigate to `http://localhost:7448/`

## Static methods

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
