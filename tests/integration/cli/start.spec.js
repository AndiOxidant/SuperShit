const path = require('path')

const inspect = require('inspect.js')
const sinon = require('sinon')
inspect.useSinon(sinon)

const shellInspect = require('shell-inspect')
const CMD = path.join(__dirname, '../../../bin/supershit')

describe('CLI', () => {
  describe('start command', () => {
    it('should start an app', () => {
      return shellInspect
        .cwd(path.join(__dirname, '../../fixtures/'))
        .cmd(`${CMD} start`)
        .test((ctx) => {
          // console.log(ctx.text)
          inspect(ctx.exitCode).isEql(0)
          // inspect(ctx.text).doesContain('Usage: supershit')
        })
    })
  })

  describe('status command', () => {
    it('should show a status view', () => {
      return shellInspect
        .cwd(path.join(__dirname, '../../fixtures/'))
        .cmd(`${CMD} status`)
        .test((ctx) => {
          // console.log(ctx.text)
          inspect(ctx.exitCode).isEql(0)
        })
    })
  })

  describe('restart command', () => {
    it('should restart an app', () => {
      return shellInspect
        .cwd(path.join(__dirname, '../../fixtures/'))
        .cmd(`${CMD} restart`)
        .test((ctx) => {
          // console.log(ctx.text)
          inspect(ctx.exitCode).isEql(0)
        })
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
