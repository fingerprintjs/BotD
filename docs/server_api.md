# Server BotD API

> ### NOTE
> The secure way to use BotD is to provide your `publicKey` to the browser agent when making bot detection and then
> getting the detection results on the server using the [`/verify` endpoint](#get-verify).

### Production endpoint https://botd.fpapi.io/api/v1

## POST `/verify`
Use POST on `/verify` to get the bot detection results by `requestId`.

> ### NOTE
> BotD results for the `requestId` are stored for 30 days.

### POST body parameters

- `requestId` - request id which is provided by the BotD Browser API.
- `secretKey` - your secret key.

### Example

```sh
curl --request POST 'https://botd.fpapi.io/api/v1/verify \
--data '{"requestId": "<CLIENT_REQUEST_ID", "secretKey": "<YOUR_SECRET>"}'
```

### Response (success scenario)

```json
{
    "success": true,
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
    },
    "requestId": "<requestId>",
    "ip": "<ipAddress>",
    "tag": "<tag>"
}
```
`bot.automationTool` contains results of detecting possible browser automation tools.
- `automationTool.status` - possible values = `"processed" | "error" | "notEnoughData"`.
- `automationTool.probability` - if `automationTool.status` is `processed` possible values = `0.0 - 1.0`, otherwise the field will not be present.
- `automationTool.type` - optional field, possible values = `"phantomjs" | "headlessChrome" | ...`.

`bot.browserSpoofing` contains results of detecting possible browser spoofing.
For example user agent string says it's Chrome on Windows, but other signals tell it is
Safari on macOS.
- `browserSpoofing.status` - possible values = `"processed" | "error" | "notEnoughData"`.
- `browserSpoofing.probability` - if `browserSpoofing.status` is `processed` possible values = `0.0 - 1.0`, otherwise the field will not be present.
- `browserSpoofing.type` - optional field, possible values = `"userAgent" | "os" | ...`.

`bot.searchEngine` contains results of detecting a legitimate search engine, e.g. Google or Bing.
- `searchEngine.status` - possible values = `"processed" | "error" | "notEnoughData"`.
- `searchEngine.probability` - if `searchEngine.status` is `processed` possible values = `0.0 - 1.0`, otherwise the field will not be present.
- `searchEngine.type` - optional field, possible values = `"google" | "bing" | ... `.

`vm` object contains results of detecting a virtual machine.
- `vm.status` - possible values = `"processed" | "error" | "notEnoughData"`.
- `vm.probability` - if `status` is `processed` possible values = `0.0 - 1.0`, otherwise the field will not be present.
- `vm.type` - optional field, possible values = `"vmware" | "parallels" | "virtualBox" | ... `.

`requestId` - request identifier, e.g. **`01F9XY24VDZ9F4HHR4FSCRYTSH`**. Used to verify bot detection requests on the server.

`ip` - client ip address, e.g. **`82.200.40.10`**.

`tag` - string containing information associated with each request. Should be provided by BotD users in the browser API.

### Errors

Error format can be found [here](error.md#error-format).
