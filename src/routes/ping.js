module.exports = (supershit) => {
  const config = supershit.config()

  if (!config.pingRoute.enabled) {
    return
  }

  const api = supershit.api()
  api.route('/ping', {
    get(req, res) {
      res.status(config.pingRoute.status)
      res.type(typeof config.pingRoute.message === 'object' ? 'application/json' : 'text/plain')
      res.send(config.pingRoute.message)
    }
  })
}
