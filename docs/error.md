# How to work with errors

## Error handling in API

You should always call both `load` and `detect` with a `.catch` function where you should handle possible errors, e.g.

```ts
load()
    .then((botd) => botd.detect())
    .then((result) => console.log(result))
    .catch((error) => console.error(error)) // <==== Add this
```
