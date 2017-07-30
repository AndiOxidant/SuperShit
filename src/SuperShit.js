'use strict';

const SuperShitServer = require('./SuperShitServer')
const SuperShitNode = require('./SuperShitNode')
const SuperShitCommander = require('./SuperShitCommander')
const WebBuilder = require('./utils/WebBuilder')
const CoreIO = require('coreio')
const log = require('logtopus').getLogger('supershit')

class SuperShit {
  static app(conf) {
    CoreIO.logLevel = 'sys'
    CoreIO.httpPort = conf.port || 7448

    CoreIO.htmlPage('/', {
      title: conf.title,
      scripts: [
        '/js/bundle.js'
      ]
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

    CoreIO.api('/js/bundle.js', {
      get(req, res, next) {
        WebBuilder.buildJS().then((bundle) => {
          res.type('application/javascript')
          res.send(bundle)
        })
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
