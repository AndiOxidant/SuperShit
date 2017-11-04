const supershit = require('../')
supershit.config({
  api: {
    errorLevel: 'info',
    pretty: true,
    parseTime: true
  }
})
const api = supershit.api('/api')

const storage = new Map()
const MapService = supershit.service('mapservice', {
  insert (data) {
    const id = storage.size
    storage.set(id, data)
    return Promise.resolve({
      id
    })
  },
  update (data) {
    const id = data.id
    storage.set(id, data)
    return Promise.resolve({
      id
    })
  },
  findOne (query) {
    const id = query.id
    const item = storage.get(id)
    return Promise.resolve(item)
  }
})

const FruitsModel = supershit.model('fruits', {
  service: MapService,
  schema: {
    name: { type: 'string', min: 3, max: 255 }
  }
})

api.route('/fruits', {
  allow: ['CRUD'],
  model: FruitsModel
})
