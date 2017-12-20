const CoreIO = require('coreio')

class SupershitService extends CoreIO.Service {
  constructor (name, conf) {
    if (typeof name !== 'string') {
      throw new Error('Invalid arguments. Service name required!')
    }

    super(name, conf)
  }
}

module.exports = SupershitService
