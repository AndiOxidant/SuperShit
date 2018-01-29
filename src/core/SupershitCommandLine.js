const path = require('path')
const superimport = require('superimport')

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
      console.error(`No ${cmdName} task was defined!`, err.stack)
      process.exit(1)
    }

    return Promise.resolve(command)
  }

  import (cmdName) {
    const cmdModule = superimport(`${cmdName}.js`, this.cmdPaths)
    const supershit = require('../../')
    return cmdModule(supershit)
  }
}

module.exports = SupershitCommandLine
