# botd API

### Botd has a server-side API. List of available operations [there](server_api.md).

## `Botd.load`

```js
Botd.load({ token: string,
  mode?: "requestId" | "allData",
  endpoint?: string}): Promise<BotDetector>
```

Builds an instance of BotDetector. We recommend calling it as early as possible,
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
botd.get({ tag?: object }): Promise<Record<string, unknown>>
```

Performs bot detection. Internally it will make a network request to our bot-detection API
and return back the `requestId`, which you can use later to retrieve bot detection results
using method `BotDetector.poll`. Also, the `requestId` will be set into cookie, so you don't need to think how
to store and pass this value for future requests.

`tag` is an optional metadata object that you can associate with each bot detection `get` call.


## BotDetector.get response format

Internally the method makes a request to `/detect` endpoint in [Server botd API](server_api.md#response-body).

## `BotDetector.poll`

```js
botd.poll(delayMs = 50, attempts = 3): Promise<Record<string, unknown>>
```

Internally the method tries to get bot detection report by `/results` endpoint in [Server botd API](server_api.md#get-results).
If the report is not ready yet, the method will ask for result several times with delay after each attempt.
You can provide two parameters:

`delayMs` - number of milliseconds to wait after each attempt (default value is `50` ms).

`attempts` - number of tries to get the report (default value is `3`).

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
