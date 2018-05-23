'use strict'

module.exports = (supershit) => {
  return supershit
    .cmd('ask')
    .description('Prints "Your name" on the screen')
    .action(async (ctx) => {
      const res = await ctx
        .ask({ name: 'name', question: 'Whats your name:' })
        .prompt()

      console.log(`Hello ${res.name}!`)
    })
}
