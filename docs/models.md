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
