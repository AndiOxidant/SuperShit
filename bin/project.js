const supershit = require('../src/SuperShit')
const ProjectManager = require('../src/utils/ProjectManager')
const colorfy = require('colorfy')

supershit.cmd('project', (cmd) => {
  if (cmd.args.length === 0) {
    throw new Error('Wrong number of arguments! Project name missing. `supershit project <name>`')
  }

  const projectName = cmd.args[0]
  const projectDir = ProjectManager.getProjectDir(projectName)

  const cf = colorfy()
  cf.txt('Create new SuperShit project in folder').grey(projectDir).print()

  ProjectManager.createProject(projectName)
})
