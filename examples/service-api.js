const supershit = require('../')
supershit.config({
  api: {
    errorLevel: 'info',
    pretty: true,
    parseTime: true
  },
  log: {
    level: 'info'
  },
  debug: 'info'
})
const api = supershit.api('/api')

const storage = new Map()
const MapService = supershit.service('mapservice', {
  insert (data) {
    const id = storage.size
    console.log('SET', id, data)
    data.id = id
    storage.set(id, data)
    return Promise.resolve({
      id
    })
  },
  update (id, data) {
    storage.set(id, data)
    console.log('CHANGE', id, data)
    return Promise.resolve({
      id
    })
  },
  findOne (query) {
    const id = parseInt(query.id, 10)
    const item = storage.get(id)
    console.log('GET', query, item)
    return Promise.resolve(item)
  },
  find () {
    const items = []

    storage.forEach((val) => {
      items.push(val)
    })

    return Promise.resolve(items)
  }
})

const FruitsModel = supershit.model('fruits', {
  service: MapService,
  schema: {
    name: { type: 'string', min: 3, max: 255 }
  }
})

const FruitsList = supershit.list('fruits', {
  service: MapService,
  model: FruitsModel
})

api.route('/fruits', {
  allow: ['CRUD'],
  model: FruitsModel,
  list: FruitsList
})
