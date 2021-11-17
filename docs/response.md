## BotD Response

The structure of the response depends on the chosen `mode` and if the server returned an [error](error.md).

### `mode` is `requestId`:

```json
{
    "requestId": "<requestId>"
}
```
`requestId` is request identifier, e.g. **`01F9XY24VDZ9F4HHR4FSCRYTSH`**

### `mode` is `allData`:

```json
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
    },
    "requestId": "<requestId>",
    "ip": "<ipAddress>",
    "tag": "<tag>"
}
```
`bot.automationTool` contains results of detecting possible browser automation tools.
- `automationTool.status` - possible values = `"processed" | "error" | "notEnoughData"`
- `automationTool.probability` - if `automationTool.status` is `processed` possible values = `0.0 - 1.0`, otherwise the field will not be present
- `automationTool.type` - optional field, possible values = `"phantomjs" | "headlessChrome" | ...`

`bot.browserSpoofing` contains results of detecting possible browser spoofing.
For example user agent string says it's Chrome on Windows, but other signals tell it is
Safari on macOS.
- `browserSpoofing.status` - possible values = `"processed" | "error" | "notEnoughData"`
- `browserSpoofing.probability` - if `browserSpoofing.status` is `processed` possible values = `0.0 - 1.0`, otherwise the field will not be present
- `browserSpoofing.type` - optional field, possible values = `"userAgent" | "os" | ...`

`bot.searchEngine` contains results of detecting a legitimate search engine, e.g. Google or Bing.
- `searchEngine.status` - possible values = `"processed" | "error" | "notEnoughData"`
- `searchEngine.probability` - if `searchEngine.status` is `processed` possible values = `0.0 - 1.0`, otherwise the field will not be present
- `searchEngine.type` - optional field, possible values = `"google" | "bing" | ... `

`vm` object contains results of detecting a virtual machine.
- `vm.status` - possible values = `"processed" | "error" | "notEnoughData"`
- `vm.probability` - if `status` is `processed` possible values = `0.0 - 1.0`, otherwise the field will not be present
- `vm.type` - optional field, possible values = `"vmware" | "parallels" | "virtualBox" | ... `

`requestId` is request identifier, e.g. **`01F9XY24VDZ9F4HHR4FSCRYTSH`**

`ip` is a client ip address, e.x. **`82.200.40.10`**

`tag` string contains information associated with the request. It's set up by BotD user
