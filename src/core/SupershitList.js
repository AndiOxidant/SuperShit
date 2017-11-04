const CoreIO = require('coreio')

class SupershitList extends CoreIO.List {
  constructor (name, conf) {
    if (typeof name !== 'string') {
      throw new Error('Invalid arguments. List name required!')
    }

    super(name, conf)
  }
}

module.exports = SupershitList
