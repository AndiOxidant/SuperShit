const FireCMP = require('firecmp')

class Welcome extends FireCMP.Core {
  get tag() {
    return 'h1'
  }
}

module.exports = Welcome
