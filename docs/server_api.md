# Server botd API

### Production endpoint `https://botd.fpapi.io/api/v1`

## POST `/detect`

### Request headers

```js
'Content-Type': 'application/json'
'Auth-Token': "<token>"
```

`Auth-Token` - client's token for accessing botd API.

### Request body

```js
{
    "mode": "<string>",
    "timestamp": <int64>,
    "performance": <int64>,
    "version": "<string>",
    "signals": {
        "s1": {
            "state": <int>,
            "value": <object>,
        },
        ...
    }
}
```

Receives all needed data from client and builds a report.

`mode` - two modes are supported: `requestId` and `allData`.

Other data are user properties to make an analysis.

### Response body

### `mode` is `allData`:

```json
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

```json
{
    "requestId": "<requestId>"
}
```

You can use method `/results` then to get full detection report by `requestId`.

## GET `/results`

### Request headers

```js
'Auth-Token': "<token>"
```

Or you can pass token through query parameters.

### Query parameters

`id` - request id.

`token` - authorization token if it was not provided through header `Auth-Token`.

### Response format

The response will be the same as `/detect` has for `mode = "allData"`.
The only one difference is that request `status` can be `inProgress` if bot detection report is not ready yet.

## Error format

```js
{
  "code": "TokenNotFound",
  "message": "token not found"
}
```

#### `code` - error code, possible values = `"Failed", "TokenRequired", "TokenNotFound", "RequestCannotBeParsed"`.

#### `message` - error description.
