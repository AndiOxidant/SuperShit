'use strict';

const inspect = require('inspect.js');
const sinon = require('sinon');
inspect.useSinon(sinon);

const SupershitConfig = require('../../../src/SupershitConfig')

process.env.NODE_ENV = 'test'

describe('SuperShitConfig', () => {
  describe('class', () => {
    it('should be a class', () => {
      inspect(SupershitConfig).isClass()
    })
  })

  describe('load', () => {
    it('has a load method', () => {
      const conf = new SupershitConfig()
      inspect(conf).hasMethod('load')
    })

    it('loads a json config', () => {
      const conf = new SupershitConfig()
      inspect(conf.load('tests/fixtures/config/json')).isEql({
        foo: 'bla',
        bar: 'blub'
      })
    })

    it('loads a cson config', () => {
      const conf = new SupershitConfig()
      inspect(conf.load('tests/fixtures/config/cson')).isEql({
        foo: 'bla',
        bar: 'blub'
      })
    })

    it('loads a yml config', () => {
      const conf = new SupershitConfig()
      inspect(conf.load('tests/fixtures/config/yaml')).isEql({
        foo: 'bla',
        bar: 'blub'
      })
    })
  })

  describe('Config object', () => {
    it('returns a configuration object', () => {
      const conf = new SupershitConfig()

      inspect(conf).hasProps({
        server: {
          port: 7448
        }
      })
    })

    it('overwrites config parameters', () => {
      const conf = new SupershitConfig({
        server: {
          port: 1234
        }
      })

      inspect(conf).hasProps({
        server: {
          port: 1234
        }
      })
    })

    it('extends config parameters', () => {
      const conf = new SupershitConfig({
        server: {
          host: 'http://test.io'
        }
      })

      inspect(conf).hasProps({
        server: {
          port: 7448,
          host: 'http://test.io'
        }
      })
    })
  })
})
