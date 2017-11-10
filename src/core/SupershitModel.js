const CoreIO = require('coreio')

class SupershitModel extends CoreIO.Model {
  constructor (name, conf) {
    if (typeof name !== 'string') {
      throw new Error('Invalid arguments. Model name required!')
    }

    super(name, conf)
  }
}

module.exports = SupershitModel
