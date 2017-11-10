const inspect = require('inspect.js')
const sinon = require('sinon')
inspect.useSinon(sinon)

const SupershitModel = require('../../../src/core/SupershitModel')

describe('SupershitModel', () => {
  describe('class', () => {
    it('instanziates an SupershitModel class', () => {
      const model = new SupershitModel('test')
      inspect(model).isObject()
      inspect(model.name).isEql('testModel')
      inspect(model).hasMethod('get')
      inspect(model).hasMethod('set')
    })
  })
})
