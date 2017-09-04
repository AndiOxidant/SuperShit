'use strict';

const supershit = require('../src/Supershit')
const ProjectManager = require('../src/utils/ProjectManager')
const colorfy = require('colorfy')

supershit
.cmd('project [name] [projectDir]')
// .usage('[name] [projectDir]')
// .option('-v', 'Verbose mode')
.action((projectName, projectDir) => {
  console.log('###', this)
  // if (cmd.args.length === 0) {
    // throw new Error('Wrong number of arguments! Project name missing. `supershit project <name>`')
  // }

  // const projectName = ProjectManager.getProjectName(cmd.args[0])
  // const projectDir = ProjectManager.getProjectDir(cmd.args[0], cmd.args[1])

  const cf = colorfy()
  cf.txt('Create new Supershit project').lime(projectName).txt('in dir').grey(projectDir).print()

  ProjectManager.createProject(projectName, projectDir).then((task) => {
    for (const fl of task.copiedFiles) {
      const name = fl.isDir ? `${fl.relative}/` : fl.relative
      const type = fl.isDir ? 'dir ' : 'file'
      cf.txt(` create ${type}`).grey(name).nl()
    }

    cf.green('DONE').print()
  })
})
