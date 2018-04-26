module.exports = (supershit) => {
  return supershit
    .cmd('example')
    .action((cmd) => {
      console.log('Hello World')
    })
}
