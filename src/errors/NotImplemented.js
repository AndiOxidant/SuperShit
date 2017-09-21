'use strict'

const APIError = require('./APIError')

/**
 * Not Implemented error class
 *
 * Creates a 501 Not Implemented error
 *
 * @class NotImplemented
 * @extends Error
 */
class NotImplemented extends APIError {
  constructor () {
    super('Not Implemented')
    this.status = 501
  }
}

module.exports = NotImplemented
