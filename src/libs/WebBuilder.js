'use strict'

const path = require('path')

const Superjoin = require('superjoin')

class WebBuilder {
  static buildJS () {
    const superjoin = new Superjoin({
      workingDir: path.join(__dirname, '../../web/'),
      main: 'web.js',
      outfile: null
    })

    return superjoin.build().then(() => {
      return superjoin.bundle
    })
  }
}

module.exports = WebBuilder
