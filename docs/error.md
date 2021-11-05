## How to work with errors

### Error handling

You should always call both `load` and `detect` with a `.catch` function where you should handle possible errors, e.x.:
```ts
botdPromise
  .then(botd => botd.detect())
  .then(result => {
    console.log(result);
  })
  .catch(err => console.error(err))
```

### Error format

Sometimes the server or BotD agent may respond with an error, e.x. when no token specified.
The error message has the following structure:

```json
{
  "error": {
    "code": "TokenNotFound",
    "message": "token not found"
  }
}
```

`code` - error code, e.x. `"TokenNotFound"`.

`message` - error description.
