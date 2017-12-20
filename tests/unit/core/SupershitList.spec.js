const inspect = require('inspect.js')
const sinon = require('sinon')
inspect.useSinon(sinon)

const SupershitList = require('../../../src/core/SupershitList')

describe('SupershitList', () => {
  describe('class', () => {
    it('instanziates an SupershitList class', () => {
      const list = new SupershitList('test')
      inspect(list).isObject()
      inspect(list.name).isEql('testList')
      inspect(list).hasMethod('push')
      inspect(list).hasMethod('shift')
    })
  })
})
