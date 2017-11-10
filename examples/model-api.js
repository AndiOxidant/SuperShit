const supershit = require('../')
const api = supershit.api('/api')

const Model = supershit.model('hello', {
  schema: {
    id: { type: 'num' },
    message: { type: 'str', min: 3, max: 255 },
    type: { type: 'string' }
  }
})

const model = new Model({
  message: 'Hello World!',
  type: 'greeting'
})

api.route('/hello', {
  model,
  static: true
})
