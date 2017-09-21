'use strict'

const APIError = require('./APIError')

/**
 * Request Timeout error class
 *
 * Creates a 408 Request Timeout error
 *
 * @class RequestTimeout
 * @extends Error
 */
class RequestTimeout extends APIError {
  constructor () {
    super('Request Timeout')
    this.status = 408
  }
}

module.exports = RequestTimeout
