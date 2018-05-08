const path = require('path')
const superimport = require('superimport')
const colorfy = require('colorfy')

class SupershitCommandLine {
  constructor (cmdPaths) {
    this.cmdPaths = cmdPaths || [
      path.join(process.cwd(), 'bin')
    ]
  }

  parse (argv) {
    const cmdName = argv[2] || 'help'
    let command

    try {
      command = this.import(cmdName)
      if (!command) {
        throw new Error('Supershit comand script does not return a SupershitCommand object!')
      }

      const actionCall = command.exec(argv)
      if (actionCall && typeof actionCall.then === 'function' && typeof actionCall.catch === 'function') {
        actionCall.then((ctx) => {
          // process.exit(0)
        }).catch((callErr) => {
          console.error(`Error on cmd call!`, callErr.stack || callErr)
          process.exit(1)
        })
      }
    } catch (err) {
      if (cmdName === 'help') {
        this.renderCommands(argv)
      } else {
        console.error(`No ${cmdName} task was defined!`, err.stack)
      }
      process.exit(1)
    }

    return Promise.resolve(command)
  }

  import (cmdName) {
    const cmdModule = superimport(`${cmdName}.js`, this.cmdPaths)
    const supershit = require('../../')
    return cmdModule(supershit)
  }

  load (instance) {
    try {
      const cmdModules = superimport.importAll(this.cmdPaths)
      this.modules = cmdModules.map((cmd) => {
        return cmd(instance)
      })
    } catch (err) {
      if (err.code === 'ENOENT') {
        return []
      }

      throw err
    }
  }

  renderCommands () {
    let longest = 0
    const commands = this.modules.map((m) => {
      longest = Math.max(longest, m.command.length)
      return {
        command: m.command,
        description: m.desc
      }
    })

    const cf = colorfy()
    cf.txt('Commands:').nl()
    commands.forEach((c) => {
      cf
        .yellow(c.command)
        .txt(' '.repeat(longest - c.command.length + 2))
        .lgrey(c.description)
        .nl()
    })

    cf.print()
  }
}

module.exports = SupershitCommandLine
