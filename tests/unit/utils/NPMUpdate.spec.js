'use strict'

const path = require('path')
const childProcess = require('child_process')

const inspect = require('inspect.js')
const sinon = require('sinon')
inspect.useSinon(sinon)

const NPMUpdate = require('../../../src/utils/NPMUpdate')
const ncu = require('npm-check-updates')

describe('NPMUpdate', () => {
  let sandbox
  let runStub
  let projectDir

  beforeEach(() => {
    projectDir = path.join(__dirname, '../../tmp/npm/')
    const pkgFile = path.join(projectDir, 'package.json')

    inspect.writeJSON(pkgFile, {
      name: 'npm-check-test',
      version: '0.0.1',
      dependencies: {
        coreio: '~0.0.1',
        firetpl: '~0.0.1'
      }
    })

    sandbox = sinon.createSandbox()
    runStub = sandbox.stub(ncu, 'run')
    runStub.returns(Promise.resolve({
      coreio: '~0.2.3',
      firetpl: '~0.6.2'
    }))
  })

  afterEach(() => {
    sandbox.restore()
    inspect.removeDir(projectDir)
  })

  describe('check', () => {
    it('returns an updatable npm packages', () => {
      const npmCheck = NPMUpdate.check(projectDir)
      inspect(npmCheck).isPromise()
      return npmCheck.then((updateable) => {
        inspect(runStub).wasCalledOnce()
        inspect(runStub).wasCalledWith({
          packageFile: path.join(projectDir, 'package.json'),
          update: true,
          silent: true
        })

        inspect(updateable).isEql({
          coreio: '~0.2.3',
          firetpl: '~0.6.2'
        })
      })
    })
  })

  describe('update', () => {
    let execStub
    let sandbox

    beforeEach(() => {
      sandbox = sinon.createSandbox()
      execStub = sandbox.stub(childProcess, 'exec')
      execStub.yieldsAsync(null, 'NPM UPDATE', '')
      execStub.returns({
        exitCode: 0
      })
    })

    afterEach(() => {
      sandbox.restore()
    })

    it('updates a package.json\'s dependencies', () => {
      const npmUpdate = NPMUpdate.update(projectDir)

      inspect(npmUpdate).isPromise()
      return npmUpdate.then(() => {
        const json = inspect.readJSON(path.join(projectDir, 'package.json'))
        inspect(json).hasProps({
          dependencies: {
            coreio: '~0.2.3',
            firetpl: '~0.6.2'
          }
        })
      })
    })
  })
})
