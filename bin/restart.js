'use strict'

const path = require('path')
const pm2 = require('pm2')
const CLITools = require('../src/utils/CLITools')

module.exports = (supershit) => {
  return supershit
    .cmd('stop')
    .description('Stopss a running supershit app')
    .action((ctx) => {
      pm2.connect((err) => {
        if (err) {
          console.error(err)
          process.exit(1)
        }

        pm2.restart(path.join(process.cwd(), 'app/app.js'), (err, apps) => {
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
