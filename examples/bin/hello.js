'use strict'

module.exports = (supershit) => {
  return supershit
    .cmd('hello')
    .description('Prints "Hello World" on the screen')
    .action((ctx) => {
      console.log('Hello World!')
    })
}
