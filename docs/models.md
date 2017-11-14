Models
======

Models are data containers. It contains a set of data and handles the data integrity.

Creating a model by using the model factory method.

```js
import supershit from 'supershit'

const MyModel = supershit.model('mymodel', {
  schema: {
    foo: { type: 'str', required: true },
    bar: { type: 'str' }
  }
})

const myModel = new MyModel({
  foo: 'Foo',
  bar: 'Bar'
})

// get all model data
myModel.get()
```

(Unimplemented) create model by using SupershitModel class:


```js
import { SupershitModel } from 'supershit'

class MyModel extends SupershitModel {
  constructor(data) {
    super('mymodel', data)

    this.schema = {
      foo: { type: 'str', required: true },
      bar: { type: 'str' }
    }
  }
}

const myModel = new MyModel({
  foo: 'Foo',
  bar: 'Bar'
})

// get all model data
myModel.get()
```

## Model API

Models are data containers, lets use it to create a API with it.

```js
const myModel = new MyModel({
  message: 'Hello World!',
  type: 'greeting'
})

const api = supershit.api('/api')
api.route('/foo', {
  model: myModel,
  static: true
})
```

The example registers a static GET route under path `/api/foo`.
A call to it returns the model.

Curl: `curl -X GET http://localhost:7448/api/foo -H "accept: application/json"`

```http
HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 49

{
  message: 'Hello World!',
  type: 'greeting'
}
```

### Create read update and delete data

Lets create a API enpoint to deal with fruits.

```js
const storage = new Map()

const FruitsModel = supershit.model('hello', {
  schema: {
    id: { type: 'string', required: true },
    name: { type: 'string', min: 3, max: 255, required: true },
    type: { type: 'string', default: 'fruit' }
  },

  save () {
    console.log('SAVE')
    const id = this.get('id')
    console.log('ID', id)
    storage.set(id, this)
    return Promise.resolve({
      id
    })
  }

  fetch (id) {
    Promise.resolve(storage.get(id))
  }
})

api.route('/fruits', {
  model: FruitsModel,
  allow: ['CRUD']
})
```

**Insert data:**  
```shell
curl -X POST http://localhost:7448/api/fruits \
 -H "accept: application/json" \
 -H "content-type: application/json" \
 -d '{ "id": "apple", "name": "Apple", "type": "fruit" }'
```


**Read data:**  
```shell
curl -X GET http://localhost:7448/api/fruits/apple \
 -H "accept: application/json" \
```
