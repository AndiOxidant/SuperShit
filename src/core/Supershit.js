'use strict'

const path = require('path')

const CoreIO = require('coreio')
const superimport = require('superimport')
const logtopus = require('logtopus')

const SupershitNode = require('./SupershitNode')
const SupershitConfig = require('./SupershitConfig')
const SupershitCommand = require('./SupershitCommand')
const SupershitRouter = require('./SupershitRouter')
const WebBuilder = require('../utils/WebBuilder')

let pkg
try {
  pkg = require(path.join(process.cwd(), 'package.json'))
} catch (err) {
  // skip error reporting
  pkg = {
    name: 'example-app'
  }
}

class Supershit {
  constructor (conf) {
    const config = this.config(conf)

    // initialize logger
    const log = logtopus.getInstance(pkg.name, config.log)
    log.setLevel(config.log.level)
    log.sys('Setting loglevel to', config.log.level)

    CoreIO.logLevel = config.debugLevel.level
    CoreIO.httpPort = config.server.port
    CoreIO.httpHost = config.server.host

    CoreIO.CoreEvents.on('server:init', this.loadRoutes.bind(this))
  }

  api (mount) {
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
   * @return {object}      Returns a SupershitCommand object
   */
  cmd (name) {
    const command = new SupershitCommand()
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

  /**
   * Returns a logger instance
   *
   * @method  logger
   * @returns {object} Returns a Logtopus logger instance
   */
  logger () {
    return logtopus.getLogger(pkg.name)
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
