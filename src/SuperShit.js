'use strict';

const CoreIO = require('coreio')
const SuperShitServer = require('./SuperShitServer')
const SuperShitNode = require('./SuperShitNode')
const SupershitConfig = require('./SuperShitConfig')
const SuperShitCommander = require('./SuperShitCommander')
const WebBuilder = require('./libs/WebBuilder')
const log = require('logtopus').getLogger('supershit')

class SuperShit {
  /**
   * Register a supershit app
   *
   * @method app
   * @static
   * @version 1.0.0
   *
   * @param  {object} conf Custom configuration
   * @return {[type]}      [description]
   */
  static app(conf) {
    // load config
    const config = new SupershitConfig(conf)

    CoreIO.logLevel = 'sys'
    CoreIO.httpPort = conf.port || 7448

    log.setLevel('debug')

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
   *
   * @method cmd
   * @static
   * @version 1.0.0
   *
   * @param  {string} name Command name
   * @return {object}      Returns a SuperShitCommander object
   */
  static cmd(name, fn) {
    const cmd = new SuperShitCommander();
    cmd.command(name || 'default');
    if (typeof fn === 'function') {
      return cmd.then(fn).catch((err) => {
        console.error(err) // eslint-disable-line no-console
        process.exit(1)
      })
    }

    return {
      action(fn) {
        cmd.then(fn).catch((err) => {
          console.error(err) // eslint-disable-line no-console
          process.exit(1)
        })

        return cmd
      }
    }
  }

  /**
   * Load supershit conf from `$PROJECT_DIR/config/`
   *
   * @method config
   * @static
   * @version 1.0.0
   *
   * @param  {object} customConf Set custom conf, overwrites predefined config
   * @return {object}            Returns a SupershitConfig object
   */
  static config(customConf) {
    const conf = new SupershitConfig(customConf)
    return conf.load()
  }
}

module.exports = SuperShit
