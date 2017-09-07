const CoreIO = require('coreio')

class SupershitRouter {
  constructor(mount, conf) {
    conf = conf || {}
    this.mount = mount || ''
    this.Router = new CoreIO.Router({
      mount: this.mount,
      noServer: conf.noServer || false
    })
  }

  /**
   * Registers an API route
   *
   * @method  route
   * @param   {str} slug API path
   * @param   {obj} conf Path config
   *
   * @example {js}
   * const router = new SupershitRouter('/api')
   * api.route('/foo', {
   *   get() {
   *     return 'Hello World!'
   *   }
   * })
   *
   * @chainable
   */
  route(slug, conf) {
    this.Router.registerRoutes(Object.assign({
      slug
    }, conf))

    return this
  }

  /**
   * Joins an API path
   *
   * @version 1.0.0
   * @method join
   * @param {string} ...path Takes one or n path fragments and puts it together.
   * @return {string} Returns a path string
   */
  join() {
    const args = Array.prototype.slice.call(arguments)
    let parts = []

    for (const slice of args) {
      const s = slice.split(/\//g)
      parts = parts.concat(s)
    }

    return `/${parts.filter((a) => !!a).join('/')}`
  }

  use() {
    // TODO add middleware support
  }

  removeRoute(path) {
    let i = 0;
    for (const layer of this.Router.app._router.stack) {
      if (layer.path === path) {
        this.Router.app._router.stack.splice(i, 1)
      } else {
        i += 1
      }
    }
  }
}

module.exports = SupershitRouter
