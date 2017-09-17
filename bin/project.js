'use strict'

const ProjectManager = require('../src/utils/ProjectManager')
const colorfy = require('colorfy')

module.exports = (supershit) => {
  return supershit
    .cmd('project [name] [projectDir]')
    .option('-o, --overwrite', 'Overwrite existing files')
    .action((ctx, projectName, projectDir) => {
      projectName = ProjectManager.getProjectName(projectName)
      projectDir = ProjectManager.getProjectDir(projectName, projectDir)

      const cf = colorfy()
      cf.txt('Create new Supershit project').lime(projectName).txt('in dir').grey(projectDir).print()

      ProjectManager.createProject(projectName, projectDir, {
        overwrite: ctx.overwrite
      }).then((task) => {
        for (const fl of task.copiedFiles) {
          const name = fl.isDir ? `${fl.relative}/` : fl.relative
          const type = fl.isDir ? 'dir ' : 'file'
          cf.txt(` create ${type}`).grey(name).nl()

          if (fl.fileExists) {
            cf.orange(fl.fileOverwritten ? '(replaced)' : '(skipped)')
          }
        }

        cf.green('DONE').print()
      })
    })
}
