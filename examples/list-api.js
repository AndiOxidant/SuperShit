const supershit = require('../')
supershit.config({
  api: {
    errorLevel: 'info',
    pretty: true,
    parseTime: true
  }
})
const api = supershit.api('/api')

const Model = supershit.model('fruit', {
  schema: {
    name: { type: 'string', min: 3, max: 255 },
    type: { type: 'string' }
  }
})

const List = supershit.list('fruits', {
  schema: {
    message: { type: 'string', min: 3, max: 255 },
    type: { type: 'string' }
  },
  model: Model
})

const list = new List()
list.push({
  name: 'Apple',
  type: 'fruit'
})

list.push({
  name: 'Banana',
  type: 'fruit'
})

list.push({
  name: 'Coconut',
  type: 'fruit'
})

api.route('/hello', {
  list,
  static: true
})

// CRUD example

const storage = new Map()

// const FruitsModel = supershit.model('hello', {
//   schema: {
//     id: { type: 'string', required: true },
//     name: { type: 'string', min: 3, max: 255, required: true },
//     type: { type: 'string', default: 'fruit' }
//   },
//
//   save () {
//     const id = this.get('id')
//     console.log('SET', id)
//     storage.set(id, this.get())
//     return Promise.resolve({
//       id
//     })
//   },
//
//   fetch (id) {
//     const data = storage.get(id)
//     console.log('GET', id, data)
//     this.set(data)
//     return Promise.resolve(data)
//   }
// })
//
// api.route('/fruits', {
//   model: FruitsModel,
//   allow: ['CRUD']
// })
