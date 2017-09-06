'use strict';

const inspect = require('inspect.js');
const sinon = require('sinon');
inspect.useSinon(sinon);

const SupershitConfig = require('../../../src/core/SupershitConfig')

process.env.NODE_ENV = 'test'

describe('SupershitConfig', () => {
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
      conf.load('tests/fixtures/config/json')
      inspect(conf).hasProps({
        foo: 'bla',
        bar: 'blub',
        log: {
          level: 'sys'
        }
      })
    })

    it('loads a cson config', () => {
      const conf = new SupershitConfig()
      conf.load('tests/fixtures/config/cson')
      inspect(conf).hasProps({
        foo: 'bla',
        bar: 'blub',
        log: {
          level: 'sys'
        }
      })
    })

    it('loads a yml config', () => {
      const conf = new SupershitConfig()
      conf.load('tests/fixtures/config/yaml')
      inspect(conf).hasProps({
        foo: 'bla',
        bar: 'blub',
        log: {
          level: 'sys'
        }
      })
    })

    it('loads a json config, keeps custom conf', () => {
      const conf = new SupershitConfig({
        log: {
          level: 'error'
        }
      })

      conf.load('tests/fixtures/config/json')
      inspect(conf).hasProps({
        foo: 'bla',
        bar: 'blub',
        log: {
          level: 'error'
        }
      })
    })

    it('loads a cson config, keeps custom conf', () => {
      const conf = new SupershitConfig({
        log: {
          level: 'error'
        }
      })

      conf.load('tests/fixtures/config/cson')
      inspect(conf).hasProps({
        foo: 'bla',
        bar: 'blub',
        log: {
          level: 'error'
        }
      })
    })

    it('loads a yml config, keeps custom conf', () => {
      const conf = new SupershitConfig({
        log: {
          level: 'error'
        }
      })

      conf.load('tests/fixtures/config/yaml')
      inspect(conf).hasProps({
        foo: 'bla',
        bar: 'blub',
        log: {
          level: 'error'
        }
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
