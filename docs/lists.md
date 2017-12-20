Lists
=====

Lists are collections of models.

Creating a list by using the list factory method.

```js
import supershit from 'supershit'

const MyModel = supershit.model('mymodel', {
  schema: {
    name: { type: 'str' }
  }
})

const MyList = supershit.list('mylist', {
  model: MyModel
})

const list = new MyList()

// add a list item
myList.push({
  name: 'Apple'
})

// get a list item
myList.toArray()
```

Create list by using SupershitList class:


```js
import { SupershitList } from 'supershit'

class MyList extends SupershitList {
  constructor(data) {
    super('mylist', data)

    this.model = MyModel
  }
}

const myList = new MyList({
  foo: 'Foo',
  bar: 'Bar'
})

// get all list items
myList.toArray()
```

## List API

The list API returns all list items

```js
const myList = new MyList({
  name: 'Apple'
})

const api = supershit.api('/api')
api.route('/foo', {
  list: myList
})
```

It registers a GET route under path `/api/foo`.
A call to it returns the list.

Curl: `curl -X GET http://localhost:7448/api/foo -H "accept: application/json"`

```http
HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 49

[
  {
    name: 'Apple'
  },
  {
    name: 'Banana'
  },
  {
    name: 'Coconut'
  }
]
```
