'use strict';

const path = require('path')

const supershit = require('../src/SuperShit')
const pm2 = require('pm2')

supershit.cmd('stop', () => {
  pm2.connect((err) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }

    pm2.delete(path.join(process.cwd(), 'app/app.js'), (err, apps) => {
      pm2.disconnect()
      if (err) {
        throw err
      }
    })
  })
})
