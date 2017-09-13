const inspect = require('inspect.js')
const apiInspect = require('api-inspect')
const sinon = require('sinon')
inspect.useSinon(sinon)

const SupershitRouter = require('../../../src/core/SupershitRouter')
const fakeConfig = require('../../utils/fakeConfig')
const pingRoute = require('../../../src/routes/ping')

describe('/ping', () => {
  let api
  let fakeShit

  beforeEach(() => {
    api = new SupershitRouter('', {
      noServer: true
    })

    apiInspect.setApi(api.Router.app)

    fakeShit = {
      api () {
        return api
      },
      config () {
        return fakeConfig.get()
      }
    }
  })

  afterEach(() => {
    api.resetRoutes()
  })

  describe('route enabled', () => {
    it('sends a 204 http status', () => {
      pingRoute(fakeShit)
      return apiInspect.get('/ping').test((ctx) => {
        ctx.statusCode(204)
        ctx.responseTime(50)
        inspect(ctx.text).isEqual('')
      })
    })

    it('sends a 200 http status', () => {
      fakeConfig.set({
        pingRoute: {
          status: 200,
          message: 'OK'
        }
      })

      pingRoute(fakeShit)
      return apiInspect.get('/ping').test((ctx) => {
        ctx.statusCode(200)
        ctx.contentType('text/plain')
        ctx.responseTime(50)
        inspect(ctx.text).isEqual('OK')
      })
    })

    it('sends a 200 http status', () => {
      fakeConfig.set({
        pingRoute: {
          status: 200,
          message: { status: 'success' }
        }
      })

      pingRoute(fakeShit)
      return apiInspect.get('/ping').test((ctx) => {
        ctx.statusCode(200)
        ctx.contentType('application/json')
        ctx.responseTime(50)
        inspect(ctx.body).isEql({ status: 'success' })
      })
    })

    it('sends a 404 http status', () => {
      fakeConfig.set({
        pingRoute: {
          enabled: false
        }
      })

      pingRoute(fakeShit)
      return apiInspect.get('/ping').test((ctx) => {
        ctx.statusCode(404)
      })
    })
  })
})
