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

Config Properties
-----------------

### apiError

#### *str* level

**Allowed values:** error, info, debug

Defines the output of a HTTP error response

`error` returns error without custom message  
`text` returns error with custom message  
`debug` returns error message and stacktrace  

**Default:** `error`

##### Example

```js
apiError: {
  level: 'info'
}
```

### log

#### *str* level

**Default:** `sys`

Defines a log level. See [Logger](./logger.md) page for all allowed levels

#### *obj* logger

Logger transport configuration. Was adopt from the Logtopus config. Please refer to the [Logtopus](https://github.com/Andifeind/logtopus) docs for more details.

#### Example

```js
log: {
  level:'debug',
  logger: {
    console: {
      colors: true
    },
    file: {
      logfile: './logs/app.log'
    }
  }
}
```

### server

#### *num* port

Port for the web-server

**Default** `7448`

#### *str* host

Host for the web-server

**Default** `0.0.0.0`
