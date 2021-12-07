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
> Successful server API response has status code `200 Ok`

The description of the server API error will be contained in the response body.
The error format can be found [below](error.md#error-format)

## Error format

The error message has the following structure:

```json
{
  "error": {
    "code": "publicKeyInvalid",
    "message": "publicKey not found"
  }
}
```

`code` - [error code](error.md#possible-error-codes), e.g. `publicKeyInvalid`.

`message` - error description.

## Possible error codes

| Error code            | HTTP Status Code          | Description                                         |
| --------------------- | ------------------------- | --------------------------------------------------- |
| publicKeyRequired     | 401 Unauthorized          | PublicKey specified incorrectly          |
| publicKeyInvalid      | 401 Unauthorized          | PublicKey not found                      |
| secretKeyRequired     | 401 Unauthorized          | SecretKey specified incorrectly          |
| secretKeyInvalid      | 401 Unauthorized          | SecretKey not found                      |
| requestCannotBeParsed | 400 Bad request           | Error during body parsing                |
| badRequest            | 400 Bad request           | Error in the request, details in message |
| tooManyRequests       | 429 Too many request      | [Request limit](/README.md#request-limit) exceeded               |
| botdApiFailed         | 500 Internal Server Error | Other errors                             |
