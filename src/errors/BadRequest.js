'use strict'

const APIError = require('./APIError')

/**
 * Bad Request error class
 *
 * Creates a 400 Bad Request error
 *
 * @class BadRequest
 * @extends Error
 */
class BadRequest extends APIError {
  constructor () {
    super('Bad Request')
    this.status = 400
  }
}

module.exports = BadRequest
