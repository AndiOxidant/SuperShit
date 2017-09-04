'use strict';

const nodemon = require('nodemon')
const supershit = require('../src/Supershit')

supershit.cmd('start', () => {
  nodemon({
    script: 'app/app.js',
    ext: 'js json',
    ignore: ['logs/*', 'node_modules/*', 'web/*', 'public/*'],
    verbose: true
  })

  nodemon.on('start', function () {
    console.log('App has started');
  }).on('quit', function () {
    console.log('App has quit');
  }).on('restart', function (files) {
    console.log('App restarted due to: ', files);
  })
})
