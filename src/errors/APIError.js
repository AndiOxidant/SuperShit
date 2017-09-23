'use strict'

/**
 * Generic API error class
 *
 * Generates a generic API error class
 *
 * @class APIError
 * @extends Error
 */
class APIError extends Error {
  constructor () {
    super()
    this.status = 500
  }

  toJSON () {
    return {
      status: this.status,
      error: this.name,
      message: this.message
    }
  }

  toString () {
    return `${this.status} ${this.name}\n\n${this.message}`
  }
}

module.exports = APIError
