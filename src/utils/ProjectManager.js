'use strict'

const path = require('path')
const co = require('co')

const SuperFS = require('superfs')
// const createModule = require('../modules/createModule');

class ProjectManager {
  static getProjectName (projectName) {
    if (!projectName) {
      console.log()
      return path.basename(process.cwd())
    }

    if (/^\.{1,2}($|\/)/.test(projectName)) {
      return path.basename(path.join(process.cwd(), projectName))
    }

    if (!/^[a-zA-Z0-9_.-]+$/.test(projectName)) {
      throw new Error('Invalid project name! Only a-z A-Z 0-9 _ . - are allowed in project names.')
    }

    return projectName
  }

  static getProjectDir (projectName, projectDir) {
    if (/^\.{1,2}($|\/)/.test(projectName) && !projectDir) {
      return path.resolve(process.cwd(), projectName)
    }

    return path.resolve(process.cwd(), projectDir || projectName)
  }

  static createProject (projectName, projectDir, opt) {
    return co(function * () {
      const srcDir = path.join(__dirname, '../../drafts/project/')
      const destDir = ProjectManager.getProjectDir(projectDir)

      const copiedFiles = yield SuperFS.copyDir(srcDir, destDir, {
        recursive: true,
        overwrite: opt.overwrite
      })

      for (const fl of copiedFiles) {
        if (fl.name === 'package.json') {
          // Write packege.json
          const pkg = yield fl.readJSON()

          pkg.name = projectName

          const dest = path.join(projectDir, 'package.json')
          yield SuperFS.writeFile(dest, JSON.stringify(pkg, null, '  '))
        }
      }

      return {
        copiedFiles
      }
    })
  }
}

module.exports = ProjectManager
