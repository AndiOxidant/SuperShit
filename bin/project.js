'use strict';

const supershit = require('../src/SuperShit')
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

  projectName = ProjectManager.getProjectName(projectName)
  projectDir = ProjectManager.getProjectDir(projectName, projectDir)

  const cf = colorfy()
  cf.txt('Create new SuperShit project').lime(projectName).txt('in dir').grey(projectDir).print()

  ProjectManager.createProject(projectName, projectDir).then((task) => {
    for (const fl of task.copiedFiles) {
      const name = fl.isDir ? `${fl.relative}/` : fl.relative
      const type = fl.isDir ? 'dir ' : 'file'
      cf.txt(` create ${type}`).grey(name).nl()
    }

    cf.green('DONE').print()
  })
})
