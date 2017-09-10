'use strict'

const path = require('path')

const inspect = require('inspect.js')
const sinon = require('sinon')

inspect.useSinon(sinon)

const SupershitCommander = require('../../../src/core/SupershitCommander')

describe('SupershitCommander', () => {
  describe('class', () => {
    it('is an instance of SupershitCommander', () => {
      const cmd = new SupershitCommander()
      inspect(cmd).isInstanceOf(SupershitCommander)
    })

    it('has a workingDir property', () => {
      const cmd = new SupershitCommander()
      inspect(cmd).hasKey('workingDir')
    })

    it('sets a custom working dir', () => {
      const cmd = new SupershitCommander({
        workingDir: '/foo/bla'
      })

      inspect(cmd.workingDir).isEql('/foo/bla')
    })

    it('has a action method', () => {
      const cmd = new SupershitCommander()
      inspect(cmd).hasMethod('action')
    })

    it('has a cmd method', () => {
      const cmd = new SupershitCommander()
      inspect(cmd).hasMethod('cmd')
    })

    it('has a option method', () => {
      const cmd = new SupershitCommander()
      inspect(cmd).hasMethod('option')
    })

    it('has a version method', () => {
      const cmd = new SupershitCommander()
      inspect(cmd).hasMethod('version')
    })
  })

  describe('action()', () => {
    it('register an action method', () => {
      const cmd = new SupershitCommander()
      const fn = sinon.stub()
      cmd.action(fn)

      inspect(cmd.actionFn).isEqual(fn)
    })

    it('returns this value', () => {
      const cmd = new SupershitCommander()
      const fn = sinon.stub()
      inspect(cmd.action(fn)).isEqual(cmd)
    })
  })

  describe('cmd()', () => {
    it('register a single command', () => {
      const cmd = new SupershitCommander()
      cmd.cmd('foo')

      inspect(cmd.command).isEql('foo')
    })

    it('register a command with one argument', () => {
      const cmd = new SupershitCommander()
      cmd.cmd('foo <bar>')

      inspect(cmd.command).isEql('foo')
      inspect(cmd.argsStr).isEql('<bar>')
    })

    it('register a command with multiple arguments', () => {
      const cmd = new SupershitCommander()
      cmd.cmd('foo <bar> [bla...]')

      inspect(cmd.command).isEql('foo')
      inspect(cmd.argsStr).isEql('<bar>')
    })

    it('returns this value', () => {
      const cmd = new SupershitCommander()
      inspect(cmd.cmd('buymeabeer')).isEqual(cmd)
    })
  })

  describe('option()', () => {
    it('register a command line option', () => {
      const cmd = new SupershitCommander()
      cmd.option('-b, --beer', 'Set my favorite beer')
      cmd.option('-s, --size', 'Set the beer size, defaults to 1 liter')

      inspect(cmd.options).isEql([
        ['-b, --beer', 'Set my favorite beer'],
        ['-s, --size', 'Set the beer size, defaults to 1 liter']
      ])
    })

    it('returns this value', () => {
      const cmd = new SupershitCommander()
      inspect(cmd.option('-f, --foo', 'I am superfoo')).isEqual(cmd)
    })
  })

  describe('argument()', () => {
    it('registers a command line argument', () => {
      const cmd = new SupershitCommander()
      cmd.argument('[beer]', 'Set my favorite beer')

      inspect(cmd.args).isEql([
        ['[beer]', 'Set my favorite beer']
      ])
    })

    it('returns this value', () => {
      const cmd = new SupershitCommander()
      inspect(cmd.argument('<foo>', 'I am superfoo')).isEqual(cmd)
    })
  })

  describe('version()', () => {
    it('define an app version', () => {
      const cmd = new SupershitCommander()
      cmd.version('1.3.28')

      inspect(cmd.appVersion).isEql('1.3.28')
    })

    it('returns this value', () => {
      const cmd = new SupershitCommander()
      inspect(cmd.version('-f, --foo', 'I am superfoo')).isEqual(cmd)
    })
  })

  describe('exec()', () => {
    let origArgv

    beforeEach(() => {
      // backup orig argv
      origArgv = process.argv
      process.argv = [
        process.env._,
        path.join(__dirname, 'bin/hello')
      ]
    })

    afterEach(() => {
      // restore orig argv
      process.argv = origArgv
    })

    it('executes a command', () => {
      const cmd = new SupershitCommander()
      const actionStub = sinon.stub()

      cmd
        .cmd('hello')
        .action(actionStub)

      cmd.exec()
      inspect(actionStub).wasCalledOnce()
      inspect(actionStub).wasCalledWith({
        color: true,
        help: false
      })
    })

    it('executes a command with args', () => {
      const cmd = new SupershitCommander()
      const actionStub = sinon.stub()

      cmd
        .cmd('hello <str>')
        .action(actionStub)

      process.argv.push('Hello World!')
      cmd.exec()
      inspect(actionStub).wasCalledOnce()
      inspect(actionStub).wasCalledWith({
        color: true,
        help: false
      }, 'Hello World!')
    })

    it('executes a command with args and options', () => {
      const cmd = new SupershitCommander()
      const actionStub = sinon.stub()

      cmd
        .cmd('hello <str>')
        .option('-c, --no-color', 'Disable CLI colors')
        .action(actionStub)

      process.argv.push('-c')
      process.argv.push('Hello World!')
      cmd.exec()

      inspect(actionStub).wasCalledOnce()
      inspect(actionStub).wasCalledWith({
        color: false,
        help: false
      }, 'Hello World!')
    })
  })
})
