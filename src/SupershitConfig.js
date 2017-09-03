const path = require('path')
const superconf = require('superconf')

class SupershitConfig {
  constructor(customConf) {
    customConf = customConf || {}
    this.projectDir = customConf.projectDir || process.cwd()

    const defaultConf = {
      server: {
        port: 7448,
        listen: '0.0.0.0'
      }
    }

    const conf = superconf.config({
      dept: 1
    }).merge(defaultConf, customConf)

    Object.assign(this, conf)
  }

  load(files) {
    const opts = {
      cwd: `${this.projectDir}/config`
    }

    if (Array.isArray(files)) {
      opts.files = files
    } else if (typeof files === 'string') {
      opts.cwd = path.resolve(process.cwd(), files)
    }

    return superconf(process.env.NODE_ENV || 'development', opts)
  }
}

module.exports = SupershitConfig
