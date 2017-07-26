const supershit = require('../src/SuperShit')
const ProjectManager = require('../src/utils/ProjectManager')
const colorfy = require('colorfy')

supershit.cmd('project', (cmd) => {
  if (cmd.args.length === 0) {
    throw new Error('Wrong number of arguments! Project name missing. `supershit project <name>`')
  }

  const projectName = ProjectManager.getProjectName(cmd.args[0])
  const projectDir = ProjectManager.getProjectDir(cmd.args[0], cmd.args[1])

  const cf = colorfy()
  cf.txt('Create new SuperShit project').lime(projectName).txt('in dir').grey(projectDir).print()

  ProjectManager.createProject(projectName, projectDir)
})
