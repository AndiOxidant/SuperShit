'use strict'

const path = require('path')

const CoreIO = require('coreio')
const superimport = require('superimport')

const SupershitNode = require('./SupershitNode')
const SupershitConfig = require('./SupershitConfig')
const SupershitCommander = require('./SupershitCommander')
const SupershitRouter = require('./SupershitRouter')
const WebBuilder = require('../libs/WebBuilder')
const log = require('logtopus').getLogger('supershit')

class Supershit {
  constructor (conf) {
    if (conf) {
      this.config(conf)
    }

    this.__initDone = false
  }

  init () {
    this.__initDone = true
    const config = this.config()
    log.setLevel(config.log.level)
    log.sys('Setting loglevel to', config.log.level)

    CoreIO.logLevel = config.log.level
    CoreIO.httpPort = config.server.port
    CoreIO.httpHost = config.server.host

    this.loadRoutes()
  }

  api (mount) {
    if (!this.__initDone) {
      this.init()
    }

    return new SupershitRouter(mount)
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
  app (conf) {
    if (!this.__initDone) {
      this.init()
    }

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
      get (req, res, next) {
        res.json(nodes.toJSON())
      }
    })

    CoreIO.api('/js/bundle.js', {
      get (req, res, next) {
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
  cmd (name) {
    const command = new SupershitCommander()
    return command.cmd(name || 'default')
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
  config (customConf) {
    if (this.__config) {
      if (customConf) {
        this.__config.merge(customConf)
      }

      return this.__config
    }

    const conf = new SupershitConfig(customConf)
    this.__config = conf
    return conf.load()
  }

  resetConfig () {
    this.__config = null
  }

  loadRoutes () {
    const routes = superimport.importAll(path.join(__dirname, '../routes/'))
    routes.forEach((r) => r(this))
  }
}

module.exports = Supershit
