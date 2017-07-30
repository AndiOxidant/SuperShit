var XQCore = require('xqcore')
var NodeParser = require('./utils/NodeParser')

document.addEventListener('DOMContentLoaded', function() {
  var nodeParser = new NodeParser()
  nodeParser.parse()
})
