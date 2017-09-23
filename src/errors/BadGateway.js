'use strict'

const APIError = require('./APIError')

/**
 * Bad Gateway error class
 *
 * Creates a 502 Bad Gateway error
 *
 * @class BadGateway
 * @extends Error
 */
class BadGateway extends APIError {
  constructor () {
    super('Bad Gateway')
    this.status = 502
  }
}

module.exports = BadGateway
