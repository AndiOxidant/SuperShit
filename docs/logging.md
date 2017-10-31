Logging
=======

Logging is important, Logging is fun and everyone loves it.
We use the great [Logtopus](https://github.com/Andifeind/logtopus) logger which supports lots of logging transports.

Usage
-----
```js
import supershit from 'supershit'

const log = supershit.logger()
log.setLevel('sys') // overwrite default log level

log.info('Some infos') // not logged, level to low
log.sys('App has been start') // gets logged
log.error('App crashed!') // gets logged

// use data arguments
log.sys('Listening on port:', 7448)
```

The `suershit.logger()` method returns a instance of the `Logtopus` logger. It comes with some methods. See [Logging](https://github.com/andifeind/logtopuss) page for more about logging.

The logger has logging methods to log in different levels. A higher listed level logs in all lower listed levels. For example, if level is `res`, logs of `res()`, `req()`, `sys()`, `warn()` and `error()` getting logged, but not `debug()` and `info()`.

Method    | Level | Description
----------|-------|------------
`debug()` | debug | Debug log
`info()`  | info  | Info log
`res()`   | res   | Logs a http response
`req()`   | req   | Logs a http request
`sys()`   | sys   | System log
`warn()`  | warn  | Logs a warning
`error()` | error | Logs an error

All log methods expecting a log message as its first parameter. All following arguments are interpret as data.

Configuration
-------------

The logger can be configure in your project config. There's a `log` section.
The config structure was adopt 1:1 from [Logtopus](https://github.com/Andifeind/logtopus).

```coffee
log:
  level: 'sys' # default log level
  logger:
    console:
      colors: true
    file:
      logfile: './logs/app.log'
```
