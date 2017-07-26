const SuperShitServer = require('./SuperShitServer')
const SuperShitNode = require('./SuperShitNode')
const SuperShitCommander = require('./SuperShitCommander')
const CoreIO = require('coreio')
const log = require('logtopus').getLogger('supershit')

class SuperShit {
  static app(conf) {
    CoreIO.logLevel = 'sys'
    CoreIO.httpPort = conf.port || 7448

    CoreIO.htmlPage('/', {
      title: conf.title
    })

    const nodes = new SuperShitNode({
      type: 'root',
      selector: 'body'
    })

    CoreIO.api('/api/nodes', {
      get(req, res, next) {
        res.json(nodes.toJSON())
      }
    })

    return nodes
  }

  /**
   * Register new cli command
   * @param  {string} name Command name
   * @return {object}      Returns a SuperShitCommander object
   */
  static cmd(name, fn) {
    const cmd = new SuperShitCommander();
    cmd.command(name || 'default');
    return cmd.then(fn).catch((err) => {
      console.error(err) // eslint-disable-line no-console
      process.exit(1)
    })
  }
}

module.exports = SuperShit
