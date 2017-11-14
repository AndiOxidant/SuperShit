const defaultConf = {
  server: {
    port: 7448,
    host: '0.0.0.0'
  },
  log: {
    level: process.env.NODE_ENV === 'test' ? 'error' : 'sys',
    logger: {
      console: {
        colors: true
      }
    }
  },
  debug: {
    level: 'sys'
  },
  api: {
    errorLevel: 'error',
    pretty: false,
    parseTime: false
  },
  pingRoute: {
    enabled: true,
    status: 204,
    message: ''
  }
}

module.exports = defaultConf
