const path = require('path')
const superconf = require('superconf')

/**
 * Configuration loader module
 *
 * @package Supershit
 * @module Config
 *
 * @class SupershitConfig
 */
class SupershitConfig {

  /**
   * SupershitConfig constructor
   *
   * @method constructor
   * @param  {object}    customConf Custom config, overwrites predefined config
   */
  constructor(customConf) {
    this.__customConf = customConf || {}

    const defaultConf = {
      server: {
        port: 7448,
        listen: '0.0.0.0'
      },
      log: {
        level: 'sys'
      }
    }

    const conf = superconf.config({
      dept: 1
    }).merge(defaultConf, this.__customConf)

    Object.assign(this, conf)
  }

  /**
   * Loads a custom config from file
   *
   * @method load
   * @param  {array|string} files Sets config files as array or the config dir
   * @return {object}       Returns a SupershitConfig object
   */
  load(files) {
    const opts = {
      cwd: `${this.projectDir}/config`
    }

    if (Array.isArray(files)) {
      opts.files = files
    } else if (typeof files === 'string') {
      opts.cwd = path.resolve(process.cwd(), files)
    }

    const loadedConf = superconf(process.env.NODE_ENV || 'development', opts)
    const conf = superconf.config({
      dept: 1
    }).merge(loadedConf, this.__customConf)

    Object.assign(this, conf)
    return this
  }
}

module.exports = SupershitConfig
