const superprompt = require('superprompt')

class CommandContext {
  constructor (opts) {
    Object.assign(this, opts)
    this.questions = []
  }

  /**
   * Asks a question on the commandline
   *
   * @method  ask
   * @param   {obj} question Superprompt question object
   * @returns {obj} Returns this value
   * @chainable
   *
   * @example
   * .ask({
   *   name: 'name',
   *   type: 'str',
   *   question: 'Whats your name'
   * })
   *
   * @see https://www.npmjs.com/package/superprompt
   */
  ask (question) {
    this.questions.push(question)
    return this
  }

  prompt () {
    return superprompt(this.questions)
  }
}

module.exports = CommandContext
