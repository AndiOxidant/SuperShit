'use strict'

const ProjectManager = require('../src/utils/ProjectManager')
const NPMUpdate = require('../src/utils/NPMUpdate')
const colorfy = require('colorfy')
const async = require('co')

module.exports = (supershit) => {
  return supershit
    .cmd('project [name] [projectDir]')
    .description('Create a Supershit project')
    .option('-o, --overwrite', 'Overwrite existing files')
    .action((ctx, projectName, projectDir) => {
      projectDir = ProjectManager.getProjectDir(projectName, projectDir)
      projectName = ProjectManager.getProjectName(projectName)

      const cf = colorfy()
      cf.txt('Create new Supershit project').lime(projectName).txt('in dir').grey(projectDir).print()

      return async(function * () {
        const task = yield ProjectManager.createProject(projectName, projectDir, {
          overwrite: ctx.overwrite
        })

        for (const fl of task.copiedFiles) {
          const name = fl.isDir ? `${fl.relative}/` : fl.relative
          const type = fl.isDir ? 'dir ' : 'file'
          cf.txt(` create ${type}`).grey(name).nl()

          if (fl.fileExists) {
            cf.orange(fl.fileOverwritten ? '(replaced)' : '(skipped)')
          }
        }

        const { npmInstall, npmCheck } = yield NPMUpdate.update(projectDir)
        cf.grey(npmCheck)
        cf.grey(npmInstall.stdout)

        cf.green('DONE').print()

        return null
      })
    })
}
