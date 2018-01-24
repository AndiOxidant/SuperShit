'use strict'

const path = require('path')
const Commander = require('commander').Command
const logtopus = require('logtopus')
const colorfy = require('colorfy')

const log = logtopus.getLogger('supershit')

class SupershitCommand {
  constructor (conf) {
    conf = conf || {}
    this.workingDir = conf.workingDir || process.cwd()
    this.options = []
    this.args = []

    if (conf.verbose) {
      log.setLevel('info')
    } else if (conf.debug) {
      log.setLevel('debug')
    }
  }

  action (fn) {
    this.actionFn = fn
    return this
  }

  cmd (command) {
    const c = command.split(' ')
    this.command = c[0]
    this.argsStr = c[1]
    return this
  }

  description (desc) {
    this.desc = desc
    return this
  }

  option (option, description) {
    this.options.push([option, description])
    return this
  }

  argument (argument, description) {
    this.args.push([argument, description])
    return this
  }

  version (version) {
    this.appVersion = version
    return this
  }

  exec (argv) {
    const command = new Commander()
    this.__command = command
    if (this.appVersion) {
      command.version(this.getAppVersion())
    }

    command.usage(this.argsStr ? `'[options]' ${this.argsStr}` : '[options]')
    for (const opt of this.options) {
      command.option(opt[0], opt[1], opt[2])
    }

    command.option('-c, --no-color', 'Disable CLI colors')
    command.option('-?, --help', 'Output the help page')
    command.parse(argv || process.argv)

    const ctx = Object.assign({

    }, this.getOptions(command))

    if (ctx.help) {
      this.printHelp(command, ctx)
      process.exit(0)
    }

    const args = [ctx].concat(command.args.slice(1))
    return this.actionFn.apply(this, args)
  }

  getOptions (command) {
    const options = {}
    for (const opt of command.options) {
      const name = opt.long.substr(2).replace(/^no-/, '')
      if (command.hasOwnProperty(name)) {
        options[name] = opt.bool ? true : command[name]
      } else {
        options[name] = opt.bool ? false : null
      }
    }
    return options
  }

  getAppVersion () {
    if (this.appVersion) {
      return this.appVersion
    }

    try {
      const pkg = require(path.join(this.workingDir, 'package.json'))
      return pkg.version
    } catch (err) {
      log.warn('Could not load version!', err)
      return 'unknown'
    }
  }

  printHelp (command, ctx) {
    const options = []

    const cf = colorfy().nl()

    if (this.desc) {
      cf.txt(this.desc).nl(2)
    }

    cf.txt('Usage:').llgrey(this.command).grey('[options]').lgrey(this.argsStr || '').nl(2)

    if (this.args.length) {
      let argsFill = 0
      for (let a of this.args) {
        argsFill = Math.max(argsFill, a[0])
      }

      cf.txt('Arguments:').nl(2)
      for (const a of this.args) {
        cf.grey(a[0]).txt(' '.repeat(argsFill - a[0].length + 2))
        cf.llgrey(a[1]).nl(2)
      }
    }

    let optionsFill = 0
    for (let opt of command.options) {
      if (opt.long === '--version') {
        opt.description = 'Output the version number'
      }

      const optionStr = `${opt.short} ${opt.long}`
      options.push([optionStr, opt.description])
      optionsFill = Math.max(optionsFill, optionStr.length)
    }

    cf.txt('Options:').nl(2)
    for (const o of options) {
      cf.grey(o[0]).txt(' '.repeat(optionsFill - o[0].length + 2))
      cf.llgrey(o[1]).nl()
    }

    cf.print(ctx.color)
  }
}

module.exports = SupershitCommand
