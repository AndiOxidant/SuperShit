'use strict';

const nodemon = require('nodemon')
const supershit = require('../')

supershit
  .cmd('dev')
  .description('Start app in dev mode, reloads app everytime when any source file changes')
  .option('-v, --verbose', 'Enable logging')
  .action((ctx) => {
    nodemon({
      script: 'app/app.js',
      ext: 'js json',
      ignore: ['logs/*', 'node_modules/*', 'web/*', 'public/*'],
      verbose: ctx.verbose
    })

    nodemon.on('start', function () {
      console.log('App has started');
    }).on('quit', function () {
      console.log('App has quit');
    }).on('restart', function (files) {
      console.log('App restarted due to: ', files);
    })
  })
  .exec()
