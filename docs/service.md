Service
=======

A service is a data collector for a list or a model. Its job is to get data from a database, file system, REST API or any other place and gives it to a list or a model.

A service has a set of methods. A connected Model or List use it to get or set data.

Method | Description | Returns
-------|-------------|--------
save | Insert or Update a dataset | Promise
insert | Insert a data set | Promise
update | Update a data set | Promise
fetch | Read a dataset | Promise
find | Search for multiple datasets | Promise
findOne | Searchs exactly for one dataset | Promise
delete | Remove a dataset | Promise

This example shows a simple storage service.

```js
const storage = new Map()
const MapService = supershit.service('myservice', {
  insert(data) {
    const id = storage.size
    storage.set(id, data)
    return Promise.resolve({
      id
    })
  },
  update(data) {
    const id = data.id
    storage.set(id, data)
    return Promise.resolve({
      id
    })
  },
  findOne(query) {
    const id = query.id
    const item = storage.get(id)
    return Promise.resolve(item)
  }
})

// connect Service with a model
const MyModel = supershit.model('mymodel', {
  service: MapService
})

// create a model instance
const model = new MyModel()

// Insert an item
const newId = await model.set({
  name: 'Apple',
  type: 'fruit'
})

// newId === 1

// Create a Model
const model = new MyModel()
const data = await model.fetch({
  id: newId
})

// data === {
//   id: 1,
//   name: 'Apple',
//   type: 'fruit'
// }
```

**Insert data:**  
```shell
curl -X POST http://localhost:7448/api/fruits \
 -H "accept: application/json" \
 -H "content-type: application/json" \
 -d '{ "name": "Apple", "type": "fruit" }'
```
