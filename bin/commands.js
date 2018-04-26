'use strict'

const path = require('path')
const colorfy = require('colorfy')
const superimport = require('superimport')

const pkg = require('../package.json')

function printModule (mod, indention, verbose) {
  const cf = colorfy()
    .yellow(mod.command)
    .txt(' '.repeat(indention - mod.command.length))
    .lgrey(mod.desc)

  if (verbose) {
    cf
      .nl()
      .txt(' '.repeat(indention))
      .azure(' module:')
      .llgrey(mod.filename)
  }

  cf.print()
}

function printFooter () {
  colorfy()
    .nl(2)
    .txt('Powered by Supershit')
    .lime(`v${pkg.version}`)
    .nl()
    .print()
}

module.exports = (supershit) => {
  return supershit
    .cmd('help')
    .description('Supershit help')
    .option('-v, --verbose', 'Show more details')
    .action((ctx) => {
      try {
        const cmdPaths = [
          path.join(process.cwd(), 'bin'),
          path.join(__dirname)
        ]

        let cmdModules = []
        cmdPaths.forEach((cmdPath) => {
          const modules = superimport.importAll(cmdPath, {
            silent: true
          })
          if (modules) {
            for (const moduleFn of modules) {
              const mod = moduleFn(supershit)
              if (!mod || !mod.command) continue
              if (cmdModules.some((existing) => existing.command === mod.command)) continue
              mod.filename = moduleFn.filename
              cmdModules.push(mod)
            }
          }
        })

        let indention = 0
        cmdModules
          .map((mod) => {
            indention = Math.max(indention, mod.command.length + 2)
            return mod
          })
          .forEach((mod) => printModule(mod, indention, ctx.verbose))

        printFooter()
      } catch (err) {
        console.error(`Could not output help page!`, err)
        process.exit(1)
      }
    })
}
