'use strict'

const path = require('path')
const colorfy = require('colorfy')
const superimport = require('superimport')

const pkg = require('../package.json')

function printModule (mod, indention, verbose) {
  const cf = colorfy()
    .yellow(mod.command)
    .txt(' '.repeat(indention - mod.command.length))
    .lgrey(mod.description)

  if (verbose) {
    cf
      .nl()
      .txt(' '.repeat(indention))
      .azure(' module:')
      .llgrey(mod.filename)
  }

  cf.print()
}

function printHeader () {
  colorfy()
    .txt('                    ____                            _     _ _\n')
    .txt('   )\\    powerful  / ___| _   _ _ __   ___ _ __ ___| |__ (_) |_\n')
    .txt('  (__)    smooth   \\___ \\| | | | \'_ \\ / _ \\ \'__/ __| \'_ \\| | __|\n')
    .txt(' (____)    sexy     ___) | |_| | |_) |  __/ |  \\__ \\ | | | | |_\n')
    .txt('(______)           |____/ \\__,_| .__/ \\___|_|  |___/_| |_|_|\\__|\n')
    .txt('                               |_|')
    .nl()
    .nl()
    .txt('Usage: supershit')
    .grey('<command> [options] ')
    .nl(2)
    .txt('Commands:')
    .nl()
    .print()
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

        printHeader()

        let cmdModules = []
        cmdPaths.forEach((cmdPath) => {
          const modules = superimport.importAll(cmdPath)
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
