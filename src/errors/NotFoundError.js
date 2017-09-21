'use strict'

const APIError = require('./APIError')

/**
 * Not Found error class
 *
 * Creates a 404 Not Found error
 *
 * @class NotFoundError
 * @extends Error
 */
class NotFoundError extends APIError {
  constructor () {
    super('Not Found')
    this.status = 404
  }
}

module.exports = NotFoundError
