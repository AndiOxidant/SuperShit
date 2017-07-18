'use strict';

const Commander = require('commander').Command;

class SupershitCommander extends Commander {
  constructor(name, conf) {
    super(name);
    this.conf = Object.assign({
      workingDir: process.cwd()
    }, conf);
  }

  then(fn) {
    // let promise = new Promise((resolve, reject) => {
      let args = Array.prototype.slice.call(process.argv);
      let cmdName = process.argv[2] || 'default';
      if (!/^-/.test(cmdName)) {
        args.splice(2, 1);
      }
      args = this.parse(args);
      // resolve(program);
    // });

    return Promise.resolve({
      args: args.args || [],
      options: this.getOptions()
    }).then(fn.bind(this));
  }

  getOptions() {
    let options = {};
    for (let opt of this.options) {
      let name = opt.long.substr(2);
      if (this.hasOwnProperty(name)) {
        options[name] = this[name];
      }
      else {
        options[name] = opt.bool ? false : null
      }
    }
    return options;
  }
}

module.exports = SupershitCommander;
