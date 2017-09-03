Configuration
=============

Supershit uses [superconf](https://npmjs.org/packages/superconf) to handle configurations.
Configurations getting load from `config/${env}.json`. The default environment is `development`. A configuration can be either a `.json`  `.cson` or `.yml` file.



```js
const supershit = require('supershit')

// load config from config files
const config = supershit.config()
```
