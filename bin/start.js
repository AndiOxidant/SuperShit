'use strict'

const path = require('path')
const pm2 = require('pm2')
const CLITools = require('../src/utils/CLITools')

/**
 * Starts the app
 *
 * @cmd start
 * @example shell
 * supershit start
 */
module.exports = (supershit) => {
  return supershit
    .cmd('start')
    .description('Starts a supershit app')
    .option('-i, --instances <number>', 'Start [number] instances')
    .action((ctx) => {
      pm2.connect((err) => {
        if (err) {
          console.error(err)
          process.exit(1)
        }

        pm2.start({
          script: path.join(process.cwd(), 'app/app.js'),
          exec_mode: 'cluster',
          instances: ctx.instances || 4,
          max_memory_restart: '100M'
        }, (err, apps) => {
          pm2.list((err, list) => {
            if (err) {
              throw err
            }

            pm2.disconnect()
            CLITools.printPM2Status(list)
          })

          if (err) {
            throw err
          }
        })
      })
    })
}
