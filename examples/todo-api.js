const supershit = require('../')

const api = supershit.api('/api')

api.route('/hello', {
  get (ctx) {
    const name = ctx.query.name
    return { message: `Hello ${name}!` }
  }
})
