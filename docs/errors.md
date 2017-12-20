Errors
======

Supershit has error classes for the most common HTTP errors. Whenever an error gets thrown during an api call, the request gets respond with an error of type of the thrown error.

Usage
-----

```js
import NotFoundError from 'supershit/errors/NotFoundError'

// some fancy stuff
throw new NotFoundError()
```

A request gets respond with an 404 Not Found error

```http
HTTP/1.1 404 Not Found
Content-Length: 72
Content-Type: application/json
{
  "status": 404,
  "type": "NotFoundError",
  "message": "Not Found"
}
```

#### BadGatewayError

**Syntax:** new BadGatewayError(*str* message)

Creates a HTTP BadGateway error with status `502`

##### Arguments

*str* message `optional`

Set an error text

##### Example

```js
if (err) {
  throw new BadGatewayError(err.message)
}
```


#### BadRequestError

**Syntax:** new BadRequestError(*str* message)

Creates a HTTP BadRequest error with status `400`

##### Arguments

*str* message `optional`

Set an error text

##### Example

```js
if (err) {
  throw new BadRequestError(err.message)
}
```


#### ForbiddenError

**Syntax:** new ForbiddenError(*str* message)

Creates a HTTP Forbidden error with status `403`

##### Arguments

*str* message `optional`

Set an error text

##### Example

```js
if (err) {
  throw new ForbiddenError(err.message)
}
```


#### GatewayTimeoutError

**Syntax:** new GatewayTimeoutError(*str* message)

Creates a HTTP GatewayTimeout error with status `504`

##### Arguments

*str* message `optional`

Set an error text

##### Example

```js
if (err) {
  throw new GatewayTimeoutError(err.message)
}
```


#### InternalServerError

**Syntax:** new InternalServerError(*str* message)

Creates a HTTP InternalServer error with status `500`

##### Arguments

*str* message `optional`

Set an error text

##### Example

```js
if (err) {
  throw new InternalServerError(err.message)
}
```


#### NotAcceptableError

**Syntax:** new NotAcceptableError(*str* message)

Creates a HTTP NotAcceptable error with status `406`

##### Arguments

*str* message `optional`

Set an error text

##### Example

```js
if (err) {
  throw new NotAcceptableError(err.message)
}
```


#### NotFoundError

**Syntax:** new NotFoundError(*str* message)

Creates a HTTP NotFound error with status `404`

##### Arguments

*str* message `optional`

Set an error text

##### Example

```js
if (err) {
  throw new NotFoundError(err.message)
}
```


#### NotImplementedError

**Syntax:** new NotImplementedError(*str* message)

Creates a HTTP NotImplemented error with status `501`

##### Arguments

*str* message `optional`

Set an error text

##### Example

```js
if (err) {
  throw new NotImplementedError(err.message)
}
```


#### RequestTimeoutError

**Syntax:** new RequestTimeoutError(*str* message)

Creates a HTTP RequestTimeout error with status `408`

##### Arguments

*str* message `optional`

Set an error text

##### Example

```js
if (err) {
  throw new RequestTimeoutError(err.message)
}
```


#### ServiceUnavailableError

**Syntax:** new ServiceUnavailableError(*str* message)

Creates a HTTP ServiceUnavailable error with status `503`

##### Arguments

*str* message `optional`

Set an error text

##### Example

```js
if (err) {
  throw new ServiceUnavailableError(err.message)
}
```


#### UnauthorizedError

**Syntax:** new UnauthorizedError(*str* message)

Creates a HTTP Unauthorized error with status `401`

##### Arguments

*str* message `optional`

Set an error text

##### Example

```js
if (err) {
  throw new UnauthorizedError(err.message)
}
```
