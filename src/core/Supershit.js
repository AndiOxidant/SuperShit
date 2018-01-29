'use strict'
'use strict'

const path = require('path')

const CoreIO = require('coreio')
const superimport = require('superimport')
const logtopus = require('logtopus')

const SupershitNode = require('./SupershitNode')
const SupershitConfig = require('./SupershitConfig')
const SupershitCommand = require('./SupershitCommand')
const SupershitCommandLine = require('./SupershitCommandLine')
const SupershitRouter = require('./SupershitRouter')
const SupershitModel = require('./SupershitModel')
const SupershitService = require('./SupershitService')
const SupershitList = require('./SupershitList')
const SupershitPage = require('./SupershitPage')
const WebBuilder = require('../utils/WebBuilder')

const API_ERROR_LEVELS = {
  'off': 0,
  'sys': 1,
  'info': 2,
  'debug': 3
}

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
    this.config(conf)

    CoreIO.CoreEvents.on('server:init', this.loadRoutes.bind(this))

    this.__pages = new Map()
  }

  api (mount) {
    return new SupershitRouter(mount)
  }

  /**
   * Register a supershit app
   *
   * **conf**
   * `title` Set a page title
   *
   * @method app
   * @static
   * @version 1.0.0
   *
   * @param  {object} conf Custom configuration
   * @return {object}      Returns a SupershitApp instance
   */
  app (conf) {
    CoreIO.htmlPage('/', {
      title: conf.title,
      scripts: [
        '/js/bundle.js'
      ]
    })

    // refactor

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
        this.configAll()
      }

      const conf = this.__config.getConfig()

      // initialize logger
      logtopus.getInstance(pkg.name, conf.log)
      return conf
    }

    const conf = new SupershitConfig(customConf)
    conf.load()
    this.__config = conf
    this.configAll()
    return conf.getConfig()
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

  /**
   * Create a SupershitModel instance
   *
   * @param  {string} name Model name
   * @param  {object} conf Model configuration
   * @return {object}      Returns a SupershitModel class
   */
  model (name, conf) {
    return CoreIO.Model.inherit(name, conf)
  }

  /**
   * Create a SupershitList instance
   *
   * @param  {string} name List name
   * @param  {object} conf List configuration
   * @return {object}      Returns a SupershitList class
   */
  list (name, conf) {
    return CoreIO.List.inherit(name, conf)
  }

  /**
   * Registers a page on frontend site
   *
   * @method  page
   * @param   {string} path Page path
   * @param   {object} conf Page configuration
   * @returns {object} Returns a SupershitPage instance
   */
  page (path, conf) {
    const page = new SupershitPage(path, conf)
    const log = this.logger()
    if (this.__pages.has(page.path)) {
      log.warn(`Page ${page.path} already registered!`)
      return
    }

    this.__pages.add(page.path, page)
  }

  /**
   * Create a SupershitService instance
   *
   * @param  {string} name List name
   * @param  {object} conf List configuration
   * @return {object}      Returns a SupershitService class
   */
  service (name, conf) {
    return CoreIO.Service.inherit(name, conf)
  }

  resetConfig () {
    this.__config = null
  }

  loadRoutes () {
    const routes = superimport.importAll(path.join(__dirname, '../routes/'))
    routes.forEach((r) => r(this))
  }

  registerHtmlPage (path, data, conf) {
    return CoreIO.htmlPage(path, data, conf)
  }

  configAll () {
    const conf = this.__config.getConfig()
    CoreIO.logLevel = conf.debug.level
    CoreIO.httpPort = conf.server.port
    CoreIO.httpHost = conf.server.host
    CoreIO.errorLevel = API_ERROR_LEVELS[conf.api.errorLevel]
    CoreIO.prettyPrint = conf.api.pretty
    CoreIO.showParseTime = conf.api.parseTime

    // TODO reconfigure logger
    const log = this.logger()
    if (log.getLevel() !== conf.log.level) {
      log.setLevel(conf.log.level)
      log.sys('Setting loglevel to', conf.log.level)
    }
  }

  commandLine (cmdPaths, argv) {
    const cmdln = new SupershitCommandLine(cmdPaths)
    cmdln.parse(argv)
    return cmdln
  }
}

module.exports = Supershit
module.exports.SupershitList = SupershitList
module.exports.SupershitModel = SupershitModel
module.exports.SupershitPage = SupershitPage
module.exports.SupershitService = SupershitService
