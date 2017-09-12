const XQCore = require('xqcore')

class NodeParser {
  loadNodes () {
    const req = new XQCore.Request()
    return req.getJSON('http://localhost:7448/api/nodes')
  }

  parse () {
    this.loadNodes().then((nodeConf) => {
      console.log('PARSE NODES', nodeConf)
    }).catch(console.error)
  }
}

module.exports = NodeParser
