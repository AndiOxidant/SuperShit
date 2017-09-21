'use strict'

const APIError = require('./APIError')

/**
 * Not Acceptable error class
 *
 * Creates a 406 Not Acceptable error
 *
 * @class NotAcceptableError
 * @extends Error
 */
class NotAcceptableError extends APIError {
  constructor () {
    super('Not Acceptable')
    this.status = 406
  }
}

module.exports = NotAcceptableError
