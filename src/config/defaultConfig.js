const defaultConf = {
  server: {
    port: 7448,
    listen: '0.0.0.0'
  },
  log: {
    level: process.env.NODE_ENV === 'test' ? 'error' : 'sys'
  },
  pingRoute: {
    enabled: true,
    status: 204,
    message: ''
  }
}

module.exports = defaultConf
