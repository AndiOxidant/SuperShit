const supershit = require('../')
const log = supershit.logger()
log.setLevel('sys')

log.info('Hello World')
log.sys('App has been started at port', 7448)
log.error('App crashed!')
