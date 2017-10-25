Configuration
=============

Supershit uses [superconf](https://npmjs.org/packages/superconf) to handle configurations.  
Configurations getting load from `config/${process.env.NODE_ENV}.json`. The default environment is `development`. A configuration can be either a `.json` `.cson` or  a `.yml` file. The default config will be used if no config was found.

Usage
-----

```js
const supershit = require('supershit')

// load config from config files
const config = supershit.config()
```

A call to `supershit.config()` loads config from project config file and stores it in an internal cache. All following calls return the cached config.

The default config is:

```js
{
  server: {
    port: 7448,
    host: '0.0.0.0'
  },
  log: {
    level: 'sys',
    logger: {
      console: {
        noColor: false
      }
    }
  },
  debugLevel: 'sys',
  pingRoute: {
    enabled: true,
    status: 204,
    message: ''
  }
}
```
