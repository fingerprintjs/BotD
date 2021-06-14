# botd API

## `Botd.load`

```js
Botd.load({ token: string, 
  mode?: "requestId" | "allData",
  endpoint?: string}): Promise<BotDetector>
```

_Builds an instance of BotDetector. We recommend calling it as early as possible, 
ideally during application startup. It returns a promise which you can chain on to call `BotDetector` methods later._

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
botd.get({ tag?: object }): Promise<object>`
```

Performs bot detection. Internally it will make an network request to our bot-detection API,
analyze all signals and return back the `requestId`, which you can use later to retrieve bot detection results.

`tag` is an optional metadata object that you can associate with each bot detection `get` call.


## BotDetector.get response format:

```js
{
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

### `bot.automationTool`

Results of detecting possible browser automation tools.

`automationTool.status` - possible values = `"processed" | "error" | "notEnoughData"`

`automationTool.probability` - possible values = `[0.0 .. 1.0 | -1.0 in case of "error" or  "notEnoughData" statuses]`.

`automationTool.type` - possible values are "phantomjs",  "chromeHeadless", or others.

### `bot.browserSpoofing`

Results of detecting possible browser spoofing.
For example user agent string says it's Chrome on Windows, but other signals tell it is 
Safari on MacOS.

`browserSpoofing.status` - possible values = `"processed" | "error" | "notEnoughData"`

`browserSpoofing.probability` - possible values = `[0.0 .. 1.0 | -1.0 in case of "error", "notEnoughData" statuses]`

`browserSpoofing.type` - possible values = `"userAgent" | "os" | ...`

### `bot.searchEngine`

Results of detecting a legitimate search engine, e.g. Google or Bing.

`searchEngine.status` - possible values = `"processed" | "error" | "notEnoughData"`

`searchEngine.probability` - possible values = `[0.0 .. 1.0 | -1.0 in case of "error", "notEnoughData" statuses]`

`searchEngine.type` - possible values = `"google"`, `"bing"` or others

### `vm`

Results of detecting a virtual machine.

`status` - possible values = `"processed" | "error" | "notEnoughData"`

`probability` - possible values = `[0.0 .. 1.0 | -1.0 in case of "error", "notEnoughData" statuses]`

`type` - possible values = `"vmware"`, `"parallels"`, `"virtualBox"` or others

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
  "code": 401,
  "description": "token is invalid"
}
```

#### `code` - Error code

#### `description` - Error description
