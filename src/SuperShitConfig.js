class SuperShitConfig {
  constructor(customConf) {
    const defaultConf = {
      port: 7448,
      projectDir: process.cwd()
    }

    this.conf = Object.assign(defaultConf, customConf || {})
  }
}

module.exports = SuperShitConfig
