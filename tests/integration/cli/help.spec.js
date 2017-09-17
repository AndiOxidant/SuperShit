const path = require('path')

const inspect = require('inspect.js')
const sinon = require('sinon')
inspect.useSinon(sinon)

const shellInspect = require('shell-inspect')
const CMD = path.join(__dirname, '../../../bin/supershit')

describe('CLI', () => {
  describe('help command', () => {
    it('should output a help page', () => {
      return shellInspect
        .cmd(`${CMD} help`)
        .test((ctx) => {
          inspect(ctx.exitCode).isEql(0)
          inspect(ctx.text).doesContain('Usage: supershit')
        })
    })
  })
})
