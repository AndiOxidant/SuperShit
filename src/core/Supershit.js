'use strict';

const CoreIO = require('coreio')
const SupershitNode = require('./SupershitNode')
const SupershitConfig = require('./SupershitConfig')
const SupershitCommander = require('./SupershitCommander')
const WebBuilder = require('../libs/WebBuilder')
const log = require('logtopus').getLogger('supershit')

class Supershit {
  constructor() {
    const config = new SupershitConfig()

    log.info('Setting loglevel to', config.log.level)
    log.setLevel(config.log.level)

    CoreIO.logLevel = config.log.level
    CoreIO.httpPort = config.server.port
    CoreIO.httpHost = config.server.host
  }

  api(mount) {
    mount = mount || '';
    return {
      route(slug, conf) {
        CoreIO.api(`${mount}${slug}`, conf);
      }
    }
  }

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
  app(conf) {
    CoreIO.htmlPage('/', {
      title: conf.title,
      scripts: [
        '/js/bundle.js'
      ]
    })

    const nodes = new SupershitNode({
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
   * @return {object}      Returns a SupershitCommander object
   */
  cmd(name, fn) {
    const cmd = new SupershitCommander();
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
  config(customConf) {
    const conf = new SupershitConfig(customConf)
    return conf.load()
  }
}

module.exports = Supershit
