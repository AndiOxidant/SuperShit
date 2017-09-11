'use strict'

const pm2 = require('pm2')
const CLITools = require('../src/utils/CLITools')

module.exports = (supershit) => {
  return supershit
    .cmd('status')
    .description('Shows app status')
    .action(() => {
      pm2.connect((err) => {
        if (err) {
          console.error(err)
          process.exit(1)
        }

        pm2.list()
        pm2.list((err, list) => {
          CLITools.printPM2Status(list)
          pm2.disconnect()
          if (err) {
            throw err
          }
        })
      })
    })
}
