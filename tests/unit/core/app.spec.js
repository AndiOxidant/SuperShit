'use strict';

const inspect = require('inspect.js')
const apiInspect = require('api-inspect')
const sinon = require('sinon')
inspect.useSinon(sinon)

const supershit = require('../../../src/app');
const SupershitConfig = require('../../../src/core/SupershitConfig')
const SupershitRouter = require('../../../src/core/SupershitRouter');

describe('Supershit', () => {
  describe('api', () => {
    let sandbox
    let api

    beforeEach(() => {
      sandbox = sinon.sandbox.create()

      api = supershit.api('/foo', {
        noServer: true
      })

      apiInspect.setApi(api.Router.app)
    })

    afterEach(() => {
      sandbox.restore()
    });

    it('registers a supershit api', () => {
      const stub = sandbox.stub(SupershitRouter.prototype, 'route')
      const callObj = {
        get() {}
      }

      api.route('/bar', callObj)

      inspect(stub).wasCalledOnce()
      inspect(stub).wasCalledWith('/bar', callObj)
      inspect(api.mount).isEql('/foo')
    })

    it('registers a /foo/bar GET endpoint of type json', () => {
      api.route('/bar', {
        get() {
          return {
            bla: 'blub'
          }
        }
      })

      return apiInspect.get('/foo/bar').test((ctx) => {
        ctx.statusCode(200)
        ctx.contentType('application/json')
        ctx.responseTime(50)
        inspect(ctx.body).isEql({
          bla: 'blub'
        })
      })
    })

    it('registers a /foo/bar POST endpoint of type json', () => {
      api.route('/bar', {
        post() {
          return {
            bla: 'blub'
          }
        }
      })

      return apiInspect.post('/foo/bar', {}).test((ctx) => {
        ctx.statusCode(200)
        ctx.contentType('application/json')
        ctx.responseTime(50)
        inspect(ctx.body).isEql({
          bla: 'blub'
        })
      })
    })

    it('registers a /foo/bar PUT endpoint of type json', () => {
      api.route('/bar', {
        put() {
          return {
            bla: 'blub'
          }
        }
      })

      return apiInspect.put('/foo/bar', {}).test((ctx) => {
        ctx.statusCode(200)
        ctx.contentType('application/json')
        ctx.responseTime(50)
        inspect(ctx.body).isEql({
          bla: 'blub'
        })
      })
    })

    it('registers a /foo/bar PATCH endpoint of type json', () => {
      api.route('/bar', {
        patch() {
          return {
            bla: 'blub'
          }
        }
      })

      return apiInspect.patch('/foo/bar', {}).test((ctx) => {
        ctx.statusCode(200)
        ctx.contentType('application/json')
        ctx.responseTime(50)
        inspect(ctx.body).isEql({
          bla: 'blub'
        })
      })
    })

    it('registers a /foo/bar DELETE endpoint of type json', () => {
      api.route('/bar', {
        delete() {
          return {
            bla: 'blub'
          }
        }
      })

      return apiInspect.delete('/foo/bar').test((ctx) => {
        ctx.statusCode(200)
        ctx.contentType('application/json')
        ctx.responseTime(50)
        inspect(ctx.body).isEql({
          bla: 'blub'
        })
      })
    })
  })

  describe('app', () => {
    it('registers a supershit app', () => {

    })
  })

  describe.only('config', () => {
    it('load configs from a config file', () => {
      const config = supershit.config()
      inspect(config).isInstanceOf(SupershitConfig)
    })

    it('load configs gets cached', () => {
      const config1 = supershit.config()
      const config2 = supershit.config()
      inspect(config1).isEqual(config2)
    })

    it('overwrites default config', () => {
      supershit.resetConfig()
      const config = supershit.config({
        pingRoute: {
          enabled: false
        }
      })

      inspect(config.pingRoute).isEql({
        enabled: false,
        status: 204,
        message: ''
      })
    })

    it('re-overwrites default config', () => {
      supershit.resetConfig()
      const config = supershit.config({
        pingRoute: {
          enabled: false
        }
      })

      const config2 = supershit.config({
        pingRoute: {
          enabled: true,
          status: 200
        }
      })

      // both got changed

      inspect(config.pingRoute).isEql({
        enabled: true,
        status: 200,
        message: ''
      })

      inspect(config2.pingRoute).isEql({
        enabled: true,
        status: 200,
        message: ''
      })
    })

    it('unset a config block', () => {
      supershit.resetConfig()
      const config = supershit.config({
        pingRoute: null
      })

      inspect(config.pingRoute).isNull()

      const config2 = supershit.config()
      inspect(config2.pingRoute).isNull()
    })

    it('reenable an unset config block', () => {
      supershit.resetConfig()
      const config = supershit.config({
        pingRoute: null
      })

      inspect(config.pingRoute).isNull()

      const config2 = supershit.config({
        pingRoute: {
          enabled: true,
          status: 200,
          message: ''
        }
      })

      inspect(config2.pingRoute).isEql({
        enabled: true,
        status: 200,
        message: ''
      })
    })
  })
})
