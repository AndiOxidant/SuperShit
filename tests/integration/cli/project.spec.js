const path = require('path')

const inspect = require('inspect.js')
const sinon = require('sinon')
inspect.useSinon(sinon)

const SuperFS = require('superfs')

const shellInspect = require('shell-inspect')
const CMD = path.join(__dirname, '../../../bin/supershit')

const PROJECT_DIR = path.join(__dirname, '../../tmp/')

describe('CLI', () => {
  before((done) => {
    SuperFS.deleteDir(PROJECT_DIR).then(() => done()).catch(() => {
      done()
    })
  })

  describe('project command', () => {
    it('should output a project page', () => {
      return shellInspect
        .cmd(`${CMD} project test ${PROJECT_DIR}`)
        .test((ctx) => {
          inspect(ctx.exitCode).isEql(0)
          inspect(ctx.text).doesContain('DONE')
        })
    })

    it('should write a package.json file', () => {
      const pkgFile = path.join(`${PROJECT_DIR}`, 'package.json')
      inspect(pkgFile).isFile()

      const pkg = require(pkgFile)
      inspect(pkg).hasProps({
        name: 'test'
      })
    })

    const FILES = [
      'app/app.js',
      'web/web.js'
    ]

    FILES.forEach((file) => {
      it(`should create a ${file} file`, () => {
        inspect(path.join(PROJECT_DIR, file)).isFile()
      })
    })

    it('should not overwrite existing files', () => {
      return shellInspect
        .cmd(`${CMD} project foo ${PROJECT_DIR}`)
        .test((ctx) => {
          inspect(ctx.exitCode).isEql(0)
          inspect(ctx.text).doesContain('DONE')

          const pkgFile = path.join(`${PROJECT_DIR}`, 'package.json')
          inspect(pkgFile).isFile()

          const pkg = require(pkgFile)
          inspect(pkg).hasProps({
            name: 'test'
          })
        })
    })

    it('should overwrite existing files if -o flag was set', () => {
      return shellInspect
        .cmd(`${CMD} project -o foo ${PROJECT_DIR}`)
        .test((ctx) => {
          inspect(ctx.exitCode).isEql(0)
          inspect(ctx.text).doesContain('DONE')

          const pkgFile = path.join(`${PROJECT_DIR}`, 'package.json')
          inspect(pkgFile).isFile()
          inspect(pkgFile).fileContains('"name": "foo"')
        })
    })
  })
})
