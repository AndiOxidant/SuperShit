'use strict'

const APIError = require('./APIError')

/**
 * Service Unavailable error class
 *
 * Creates a 503 Service Unavailable error
 *
 * @class ServiceUnavailable
 * @extends Error
 */
class ServiceUnavailable extends APIError {
  constructor () {
    super('Service Unavailable')
    this.status = 503
  }
}

module.exports = ServiceUnavailable
