# Botd JavaScript API
_Botd also has a [server-side API](server_api.md). The responses in both JS and server APIs are identical._

## `Botd.load`

```js
Botd.load({ token: string,
  mode?: "requestId" | "allData",
  endpoint?: string}): Promise<BotDetector>
```

Builds an instance of `BotDetector`. We recommend calling it as early as possible,
ideally during application startup. It returns a promise which you can chain on to call `BotDetector` methods later.

`token` is your free account token required to access the server-side bot detection API.
This is a required parameter.

`mode`: Two modes are supported: `requestId` (default) and `allData`.

When `requestId` mode is used, only `requestId` field is returned back to the browser.
It's a safe way to detect a bot server-side without leaking results to the browser.
This mode is recommended for production usage.

When `allData` mode is used, all data from the bot detection result is returned back to the browser.
This mode is not recommended for production, but can be used during development and testing.


`endpoint` You don't need to use it, unless you use a subdomain integration.

## `BotDetector.get`

```js
botDetector.get({ tag?: object }): Promise<Record<string, unknown>>
```

Performs bot detection. Internally it will make a network request to our server-side bot detection API
and return back the `requestId` which you can use later to retrieve bot detection results (or `allData` if you configured it this way).

Note that the `requestId` will implicitly be stored in a cookie for future convenience.

**`tag`** is an optional metadata object that you can associate with each bot detection event.

The response object format is described [here](server_api.md#response-body).


## `BotDetector.poll`

```js
botDetector.poll(delayMs = 50, attempts = 3): Promise<Record<string, unknown>>
```
Will retrieve an existing bot detection result by `requestId`.
Internally works by calling the  `/results` endpoint in the [server API](server_api.md#get-results).

If the bot detection result is not ready yet (in case you call `poll` immediately after `get` and the result is being calculated), 
the method will make several `attempts` with a specified `delayMs`.

You can override two parameters:

`delayMs` - number of milliseconds to wait after each attempt (default value is `50` ms).

`attempts` - number of tries to get the results (default value is `3`).

Note that `poll` is purely a client-side method for retrieving the detection results.
It works by passing the `requestId`, previously stored in cookies as an implicit parameter.

For server-side retrieval, use our server API instead.

## Error handling:

You should always call both `load` and `get` with a `.catch` function where you should handle possible errors.

```js
//example
botdPromise
  .then(botd => botd.get())
  .then(result => {
    console.log(result);
  })
  .catch(err => console.error(err))
```

### Error format

You can get this information in [Server botd API](server_api.md#error-format).
