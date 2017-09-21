'use strict'

const APIError = require('./APIError')

/**
 * Internal Server Error error class
 *
 * Creates a 500 Internal Server Error error
 *
 * @class InternalServerError
 * @extends Error
 */
class InternalServerError extends APIError {
  constructor () {
    super('Internal Server Error')
    this.status = 500
  }
}

module.exports = InternalServerError
