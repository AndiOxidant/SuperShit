const path = require('path')

const inspect = require('inspect.js')
const sinon = require('sinon')
inspect.useSinon(sinon)

const shellInspect = require('shell-inspect')
const CMD = path.join(__dirname, '../../../bin/supershit')
const WORKING_DIR = path.join(__dirname, '../../fixtures/')
const LOGFILE = path.join(WORKING_DIR, 'logs/test.log')

describe('CLI', () => {
  before(() => {
    inspect.removeFile(LOGFILE)
  })

  describe('start command', () => {
    it('should start an app', () => {
      return shellInspect
        .cwd(WORKING_DIR)
        .cmd(`${CMD} start`)
        .test((ctx) => {
          inspect(ctx.exitCode).isEql(0)
        })
    })

    it('should have started 4 instances', function () {
      this.retries(1000)
      inspect(LOGFILE).isFile()
      inspect(inspect.readFile(LOGFILE)).isEql(':T:T:T:T')
    })
  })

  describe('status command', () => {
    it('should show a status view', () => {
      return shellInspect
        .cwd(WORKING_DIR)
        .cmd(`${CMD} status`)
        .test((ctx) => {
          inspect(ctx.exitCode).isEql(0)
        })
    })
  })

  describe('restart command', () => {
    it('should restart an app', () => {
      return shellInspect
        .cwd(WORKING_DIR)
        .cmd(`${CMD} restart`)
        .test((ctx) => {
          // console.log(ctx.text)
          inspect(ctx.exitCode).isEql(0)
        })
    })

    it('should have started 4 instances', function () {
      this.retries(100)
      inspect(LOGFILE).isFile()
      inspect(inspect.readFile(LOGFILE)).isEql(':T:T:T:T:T:T:T:T')
    })
  })

  describe('stop command', () => {
    it('should stop an app', () => {
      return shellInspect
        .cmd(`${CMD} stop`)
        .test((ctx) => {
          // console.log(ctx.text)
          inspect(ctx.exitCode).isEql(0)
          // inspect(ctx.text).doesContain('Usage: supershit')
        })
    })
  })
})
