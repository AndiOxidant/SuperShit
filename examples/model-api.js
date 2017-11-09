const supershit = require('../')
const api = supershit.api('/api')

const Model = supershit.model('hello', {
  schema: {
    message: { type: 'str', min: 3, max: 255 },
    type: { type: 'string' }
  },
  defaults: {
    message: 'Hello World!',
    type: 'greeting'
  }
})

api.route('/hello', {
  allow: 'READ',
  model: Model
})
