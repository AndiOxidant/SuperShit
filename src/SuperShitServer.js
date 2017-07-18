const ExpressServer = require('express-server');

class SupershitServer extends ExpressServer {
  constructor(conf) {
    super(conf);
  }

  then(fn) {
    const p =  new Promise((resolve, reject) => {
      this.start({}, () => {
        resolve();
      });
    });

    return p.then(fn.bind(this));
  }
}

module.exports = SupershitServer;
