'use strict'

const SupershitConfig = require('../../src/core/SupershitConfig')

module.exports = (conf) => {
  const config = new SupershitConfig(conf)
  return config.getConfig()
}

let presetConf = {}
module.exports.get = () => {
  const config = new SupershitConfig(presetConf)
  return config.getConfig()
}

module.exports.set = (conf) => {
  presetConf = conf
}
