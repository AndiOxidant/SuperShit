'use strict'

const APIError = require('./APIError')

/**
 * Gateway Timeout error class
 *
 * Creates a 502 Gateway Timeout error
 *
 * @class GatewayTimeout
 * @extends Error
 */
class GatewayTimeout extends APIError {
  constructor () {
    super('Gateway Timeout')
    this.status = 502
  }
}

module.exports = GatewayTimeout
