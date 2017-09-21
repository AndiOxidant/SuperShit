'use strict'

const APIError = require('./APIError')

/**
 * Unauthorized error class
 *
 * Creates a 401 Unauthorized error
 *
 * @class Unauthorized
 * @extends Error
 */
class Unauthorized extends APIError {
  constructor () {
    super('Unauthorized')
    this.status = 401
  }
}

module.exports = Unauthorized
