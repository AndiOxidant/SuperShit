const SuperShitCommander = require('./SuperShitCommander')

class SuperShit {
  static app() {

  }

  /**
   * Register new cli command
   * @param  {string} name Command name
   * @return {object}      Returns a SuperShitCommander object
   */
  static cmd(name, fn) {
    const cmd = new SuperShitCommander();
    cmd.command(name || 'default');
    return cmd.then(fn).catch((err) => {
      console.error(err) // eslint-disable-line no-console
      process.exit(1)
    })
  }
}

module.exports = SuperShit
