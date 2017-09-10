'use strict';

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
  constructor(customConf) {
    this.__customConf = customConf || {}

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
    }).merge(loadedConf || {}, this.getConf(), this.__customConf)

    Object.assign(this, conf)
    return this
  }

  merge(mergeConf) {
    const conf = superconf.config({
      dept: 1
    }).merge(this, mergeConf)
    Object.assign(this, conf)
  }

  getConf() {
    const conf = {}
    for (const key of Object.keys(this)) {
      if (/^[a-zA-Z]/.test(key)) {
        conf[key] = this[key]
      }
    }
    return conf
  }
}

module.exports = SupershitConfig
