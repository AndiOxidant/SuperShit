'use strict'

const path = require('path')

const inspect = require('inspect.js')

const NPMUpdate = require('../../../src/utils/NPMUpdate')

describe('NPMUpdate', () => {
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
  })

  afterEach(() => {
    inspect.removeDir(projectDir)
  })

  describe('check', () => {
    it('returns an updatable npm packages', () => {
      const npmCheck = NPMUpdate.check(projectDir)
      inspect(npmCheck).isPromise()
      return npmCheck.then((updateable) => {
        inspect(updateable).isEql({
          coreio: '~0.5.0',
          firetpl: '~0.6.2'
        })
      })
    })
  })

  describe('update', () => {
    it('updates a package.json\'s dependencies', () => {
      const npmUpdate = NPMUpdate.update(projectDir)

      inspect(npmUpdate).isPromise()
      return npmUpdate.then(() => {
        const json = inspect.readJSON(path.join(projectDir, 'package.json'))
        inspect(json).hasProps({
          dependencies: {
            coreio: '~0.5.0',
            firetpl: '~0.6.2'
          }
        })
      })
    })
  })
})
