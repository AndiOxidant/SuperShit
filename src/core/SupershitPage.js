const CoreIO = require('coreio')

class SupershitPage {
  constructor (path, conf = {}) {
    this.path = path
    this.name = this.getPageName()
  }

  getPageName () {
    if (this.path === '/') return 'Index'

    const split = this.path.split('/')
    const p = split.filter((s) => {
      return s && s.indexOf(':') === -1
    }).map((s) => {
      return s.charAt(0).toUpperCase() + s.substr(1).toLowerCase()
    })

    return p.join('')
  }

  cmp (cmpName, opts) {
    const component = new SupershitComponent(cmpName, opts)
    this.__components.add(component)
  }
}

module.exports = SupershitPage
