const path = require('path')
const inspect = require('inspect.js')
const sinon = require('sinon')
inspect.useSinon(sinon)

const SupershitCommand = require('../../../src/core/SupershitCommand')
const SupershitCommandLine = require('../../../src/core/SupershitCommandLine')

describe.only('SupershitCommandLine', () => {
  describe('instance', () => {
    it('creates an instance of SupershitCommandLine', () => {
      inspect(SupershitCommandLine).isClass()
      const cmdln = new SupershitCommandLine()
      inspect(cmdln).isObject()
    })
  })

  describe('import()', () => {
    it('Import `hello` cmd from cmd dirs', () => {
      const cmdDirs = [ path.join(__dirname, '../../fixtures/bin/') ]
      const cmdln = new SupershitCommandLine(cmdDirs)
      const res = cmdln.import('hello')
      inspect(res).isObject()
      inspect(res).isInstanceOf(SupershitCommand)
    })
  })

  describe('parse()', () => {
    it('parses a command', () => {
      const cmdDirs = [ path.join(__dirname, '../../fixtures/bin/') ]
      const cmdln = new SupershitCommandLine(cmdDirs)

      const argv = [
        '/usr/bin/node',
        'test.js',
        'hello'
      ]

      const res = cmdln.parse(argv)
      inspect(res).isPromise()

      return res.then((cmd) => {
        inspect(cmd).isObject()
        inspect(cmd).isInstanceOf(SupershitCommand)
      })
    })
  })
})
