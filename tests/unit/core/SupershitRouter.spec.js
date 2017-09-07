const inspect = require('inspect.js')
const sinon = require('sinon')
inspect.useSinon(sinon)

const SupershitRouter = require('../../../src/core/SupershitRouter')

describe('SupershitRouter', () => {
  describe('class', () => {
    it('is a class', () => {
      inspect(SupershitRouter).isClass()
    })

    it('has a join method', () => {
      inspect(new SupershitRouter('', {
        noServer: true
      })).hasMethod('join')
    })

    it('has a route method', () => {
      inspect(new SupershitRouter('', {
        noServer: true
      })).hasMethod('route')
    })
  })

  describe('join()', () => {
    it('should join a API path', () => {
      const a = '/api'
      const b = '/foo/bar'

      const api = new SupershitRouter();

      inspect(api.join(a, b)).isEql('/api/foo/bar')
    })

    it('should join three snippets', () => {
      const a = '/'
      const b = 'api'
      const c = '/foo/bar'

      const api = new SupershitRouter();

      inspect(api.join(a, b, c)).isEql('/api/foo/bar')
    })

    it('should handle double slashes', () => {
      const a = '/'
      const b = '/api/'
      const c = '/foo/bar/'

      const api = new SupershitRouter();

      inspect(api.join(a, b, c)).isEql('/api/foo/bar')
    })

    it('should keep placeholders', () => {
      const a = '/api'
      const b = '/hello/:name'

      const api = new SupershitRouter();

      inspect(api.join(a, b)).isEql('/api/hello/:name')
    })
  })
})
