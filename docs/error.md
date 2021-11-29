# How to work with errors

## Error handling in Browser API

You should always call both `load` and `detect` with a `.catch` function where you should handle possible errors, e.g.
```ts
botdPromise
  .then(botd => botd.detect())
  .then(result => {
    console.log(result);
  })
  .catch(err => console.error(err))
```

## Error handling in Server API

> ### NOTE
> Server API response without error has status code `200 Ok`

The description of the server API error will be contained in the response body.
The error format can be found [below](error.md#error-format)

## Error format

The error message has the following structure:

```json
{
  "error": {
    "code": "tokenInvalid",
    "message": "token not found"
  }
}
```

`code` - [error code](error.md#possible-error-codes), e.g. `"tokenInvalid"`.

`message` - error description.

## Possible error codes

| Error code            | HTTP Status Code          | Description                                         |
| --------------------- | ------------------------- | --------------------------------------------------- |
| tokenRequired         | 401 Unauthorized          | Token specified incorrectly                         |
| tokenInvalid          | 401 Unauthorized          | Token not found                                     |
| requestCannotBeParsed | 422 Unprocessable Entity  | Error during body parsing                           |
| badRequest            | 400 Bad request           | Error in the request, details in message            |
| tooManyRequests       | 429 Too many request      | [Request limit](/README.md#request-limit) exceeded |
| botdApiFailed         | 500 Internal Server Error | Other errors                                        |
