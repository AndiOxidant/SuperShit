module.exports = (supershit) => {
  return supershit
    .cmd('hello')
    .action((ctx) => {
      console.log('Hello World!')
    })
}
