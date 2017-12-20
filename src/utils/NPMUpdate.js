'use strict'

const path = require('path')
const ncu = require('npm-check-updates')
const async = require('co')
const SuperFS = require('superfs')
const CLITools = require('./CLITools')

class NPMUpdate {
  static check (projectDir) {
    return ncu.run({
      packageFile: path.join(projectDir, 'package.json'),
      update: true,
      silent: true
    })
  }

  static update (projectDir) {
    return async(function * () {
      const pkgFile = path.join(projectDir, 'package.json')
      const updateable = yield NPMUpdate.check(projectDir)
      const fl = SuperFS.file(pkgFile)
      const pkg = yield fl.readJSON()
      yield fl.writeJSON(Object.assign(pkg, {
        dependencies: updateable
      }))

      const npmContext = yield CLITools.exec('npm install', {
        cwd: projectDir
      })

      if (npmContext.exitCode !== 0) {
        throw new Error('Installing dependencies failed!', npmContext.stderr)
      }

      return {
        npmCheck: updateable,
        npmInstall: npmContext
      }
    })
  }
}

module.exports = NPMUpdate
