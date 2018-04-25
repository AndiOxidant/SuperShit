'use strict'

const path = require('path')
const superconf = require('superconf')
const defaultConf = require('../config/defaultConfig')

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
  constructor (customConf) {
    this.__customConf = customConf || {}
    this.__config = {}
    this.projectDir = process.cwd()

    this.__config = superconf.config({
      dept: 1
    }).merge(defaultConf, this.__customConf)
  }

  /**
   * Loads a custom config from file
   *
   * @method load
   * @param  {array|string} files Sets config files as array or the config dir
   * @return {object}       Returns a SupershitConfig object
   */
  load (files) {
    const opts = {
      cwd: `${this.projectDir}/config`
    }

    if (Array.isArray(files)) {
      opts.files = files
    } else if (typeof files === 'string') {
      opts.cwd = path.resolve(process.cwd(), files)
    }

    const env = process.env.NODE_ENV || 'development'
    const loadedConf = superconf(env, opts)
    const conf = superconf.config({
      dept: 1
    }).merge(loadedConf || {}, this.__config, this.__customConf)

    Object.assign(this.__config, conf)
    return this.__config
  }

  merge (mergeConf) {
    const conf = superconf.config({
      dept: 1
    }).merge(this.__config, mergeConf)
    Object.assign(this.__config, conf)
  }

  getConfig () {
    return this.__config
  }
}

module.exports = SupershitConfig
