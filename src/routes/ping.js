/**
 * Registers a ping route
 *
 * It replays with a http status `204`. The route is configurable
 * by using the `pingRoute` configuration.
 *
 * ```cson
 * pingRoute:
 *   enabled: true
 *   status: 204
 *   message: ''
 * ```
 * Overwrite the configuration to change the endpoint behavior
 *
 * @module Routes
 * @api GET /ping
 * @response 204
 *
 */
module.exports = (supershit) => {
  const config = supershit.config()

  if (!config.pingRoute.enabled) {
    return
  }

  const api = supershit.api()
  api.route('/ping', {
    get (req, res) {
      res.status(config.pingRoute.status)
      res.type(typeof config.pingRoute.message === 'object' ? 'application/json' : 'text/plain')
      res.send(config.pingRoute.message)
    }
  })
}
