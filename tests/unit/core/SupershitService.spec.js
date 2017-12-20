const inspect = require('inspect.js')
const sinon = require('sinon')
inspect.useSinon(sinon)

const SupershitService = require('../../../src/core/SupershitService')

describe('SupershitService', () => {
  describe('class', () => {
    it('instanziates an SupershitService class', () => {
      const service = new SupershitService('test')
      inspect(service).isObject()
      inspect(service.name).isEql('test')
      inspect(service).hasMethod('findOne')
      inspect(service).hasMethod('save')
    })
  })
})
