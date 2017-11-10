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
  foo: 'Foo',
  bar: 'Bar'
})

const api = supershit.api('/api')
api.route('/foo', {
  model: myModels
})
```

The example registers a GET route under path `/api/foo`.
A call to it returns the model data.

Try the curl: `curl -X GET http://localhost:7448/api/foo -H "accepts: application/json"`

```http

```
