# botd API

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
***
### `mode` is `allData`:

```js
{
    "status": "processed",
    "bot": {
        "automationTool": {
            "status": "processed",
            "probability": 0,
            "type": "<type>"
        },
        "browserSpoofing": {
            "status": "processed",
            "probability": 0,
            "type": "<type>"
        },
        "searchEngine": {
            "status": "processed",
            "probability": 0,
            "type": "<type>"
        }
    },
    "vm": {
        "status": "processed",
        "probability": 0,
        "type": "<type>"
    }
}
```

### `status`

If something goes wrong internally `status` will be `error` and no other information will be provided in the response.
Otherwise, the value will be `processed`.

### `bot.automationTool`

Results of detecting possible browser automation tools.

`automationTool.status` - possible values = `"processed" | "error" | "notEnoughData"`

`automationTool.probability` - if `automationTool.status` is `processed` possible values = `0.0 - 1.0`, otherwise the field won't be presented

`automationTool.type` - optional field, possible values = `"phantomjs" | "chromeHeadless" | ...`

### `bot.browserSpoofing`

Results of detecting possible browser spoofing.
For example user agent string says it's Chrome on Windows, but other signals tell it is
Safari on MacOS.

`browserSpoofing.status` - possible values = `"processed" | "error" | "notEnoughData"`

`browserSpoofing.probability` - if `browserSpoofing.status` is `processed` possible values = `0.0 - 1.0`, otherwise the field won't be presented

`browserSpoofing.type` - optional field, possible values = `"userAgent" | "os" | ...`

### `bot.searchEngine`

Results of detecting a legitimate search engine, e.g. Google or Bing.

`searchEngine.status` - possible values = `"processed" | "error" | "notEnoughData"`

`searchEngine.probability` - if `searchEngine.status` is `processed` possible values = `0.0 - 1.0`, otherwise the field won't be presented

`searchEngine.type` - optional field, possible values = `"google" | "bing" | ... `

### `vm`

Results of detecting a virtual machine.

`status` - possible values = `"processed" | "error" | "notEnoughData"`

`probability` - if `status` is `processed` possible values = `0.0 - 1.0`, otherwise the field won't be presented

`type` - optional field, possible values = `"vmware" | "parallels" | "virtualBox" | ... `

***
### `mode` is `requestId`:

```js
{
    "requestId": "<requestId>"
}
```

You can use method `BotDetector.poll` then to get full detection report by `requestId`.

## `BotDetector.poll`

```js
botd.poll(): Promise<Record<string, unknown>>
```

The response will be the same as `BotDetector.get` has for `mode = "allData"`.
The only one difference is that it's possible to receive `status = "inProgress"` if detection report is not ready yet.
In this case try to call the method one more time after small period of time.
Anyway, this case should be rare because calculation is fast enough.

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

```js
{
  "code": "TokenNotFound",
  "message": "token not found"
}
```

#### `code` - Error code, possible values = `"Failed", "TokenRequired", "TokenNotFound", "RequestCannotBeParsed"`

#### `message` - Error description
