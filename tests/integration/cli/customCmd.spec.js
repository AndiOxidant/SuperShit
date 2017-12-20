const path = require('path')

const inspect = require('inspect.js')
const shellInspect = require('shell-inspect')

const CMD = path.join(__dirname, '../../../bin/supershit')

const PROJECT_DIR = path.join(__dirname, '../../fixtures/')

describe('CLI', () => {
  describe('custom command', () => {
    it('should output hello world', () => {
      return shellInspect
        .cmd(`${CMD} hello`)
        .cwd(PROJECT_DIR)
        .test((ctx) => {
          inspect(ctx.exitCode).isEql(0)
          inspect(ctx.text).isEql('Hello World!\n')
        })
    })
  })
})
