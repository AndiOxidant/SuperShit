const supershit = require('../')

const api = supershit.api('/api')

api.route('/hello', {
  get() {
    return { message: 'Hello World!' }
  }
})

api.route('/hello/:name', {
  get(ctx) {
    const name = ctx.params.name
    return { message: `Hello ${name}!` }
  }
})
