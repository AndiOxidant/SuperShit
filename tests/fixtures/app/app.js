const fs = require('fs')
fs.appendFileSync('logs/test.log', ':T')
setTimeout(() => exit(0), 30000)
