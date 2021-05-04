<p align="center">
  <a href="https://fingerprintjs.com">
    <img src="resources/logo.svg" alt="FingerprintJS" width="312px" />
  </a>
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/@fpjs-incubator/botd">
    <img src="https://img.shields.io/npm/v/@fpjs-incubator/botd.svg" alt="Current NPM version">
  </a>
  <a href="https://www.npmjs.com/package/@fpjs-incubator/botd">
    <img src="https://img.shields.io/npm/dm/@fpjs-incubator/botd.svg" alt="Monthly downloads from NPM">
  </a>
  <a href="https://www.jsdelivr.com/package/npm/@fpjs-incubator/botd">
    <img src="https://img.shields.io/jsdelivr/npm/hm/@fpjs-incubator/botd.svg" alt="Monthly downloads from jsDelivr">
  </a>
</p>

FingerprintJS BotD is a browser library for detecting automation tools and browsers running using virtual machines.

## Quick start

### Install from CDN

```html
  <script>
  function initFpJSBotd() {
    // Initialize an agent at application startup.
    const botdPromise = FPJSBotDetect.load({ token: "<token>" })
    // Get the bot detection result when you need it.
    botdPromise
      .then(botd => botd.get())
      .then(result => {
        console.log(result);
      });
  }
</script>
<script async src="https://unpkg.com/@fpjs-incubator/botd-agent@0/dist/botd.umd.min.js" onload="initFpJSBotd()"></script

```
### Alternatively you can install from NPM to use with Webpack/Rollup/Browserify
```bash
npm i @fpjs-incubator/botd-agent
# or
yarn add @fpjs-incubator/botd-agent
```

```js
import FPJSBotDetect from '@fpjs-incubator/botd-agent';
(async () => {
  // Initialize an agent at application startup.
  const botdPromise = FPJSBotDetect.load({ token: "" })
  // Get the bot detection result when you need it.
  const botd = await botdPromise
  const result = await botd.get();
  console.log(result);
})();
```

## API

### Sync mode

#### `FpJSBotDetect.load({ token: string, endpoint?: string, async?: boolean}): Promise<BotDetector>`

Builds an instance of BotDetector. We recommend calling it as soon as possible.
`token` is a unique identifier required to access the API.

`endpoint` used for development, production endpoint is used by default.

`async` flag used to select the operating mode. By default, it has value `false`.

#### `botd.get({ tag: object }): Promise<object>`

Gets the result of bot detection.
`tag` is custom object to store to database.

#### `botd.poll(): Promise<Record<string, unknown>>`

Unused in sync mode

### Async mode

#### `FpJSBotDetect.load({ token: string, endpoint?: string, async?: boolean}): Promise<BotDetector>`

Same as in sync mode, but async flag should have value `true`.

#### `botd.get({ tag: object }): Promise<object>`

In async mode it gets request identifier and stores it in cookie.

`tag` is custom object to store to database.

#### `botd.poll(): Promise<Record<string, unknown>>`

Gets the result of bot detection.

### Response:

```json
{
    "bot": {
        "status": "Ok",
        "probability": 0,
        "type": "",
        "browser_spoofing": {
            "status": "Ok",
            "probability": 0
        },
        "search": {
            "status": "Ok",
            "probability": 0,
            "type": ""
        }
    },
    "vm": {
        "status": "Ok",
        "probability": 0,
        "type": ""
    }
}
```
#### `bot.status`
Possible values of `bot.status` field = [“ok” | “undefined” | “not_enough_info”]

#### `bot.probability`
Possible values = [0.0 .. 1.0 | -1.0 in case of “undefined”, “not_enough_info” statuses]

#### `bot.type`
Possible values = [“phantomjs”, “chrome_headless” … or empty string]

#### `bot.browser_spoofing`
Check user browser for spoofing parameters (e.x. User-agent is chrome-windows but other signals say that user’s OS is macOS)

`bot.browser_spoofing.status` - possible values = [“ok” | “undefined” | “not_enough_info”]

`bot.browser_spoofing.probability` - possible values = [0.0 .. 1.0 | -1.0 in case of “undefined”, “not_enough_info” statuses]

#### `bot.search`
Check if user is search bot of some famous search engine like Google

`bot.search.status` - possible values = [“ok” | “undefined” | “not_enough_info”]

`bot.search.probability` - possible values = [0.0 .. 1.0 | -1.0 in case of “undefined”, “not_enough_info” statuses]

`bot.search.type` - possible values = [“google”, “yandex” … or empty string]

#### `vm.status`
Possible values of `vm.status` field = [“ok” | “undefined” | “not_enough_info”]

#### `vm.probability`
Possible values = [0.0 .. 1.0 | -1.0 in case of “undefined”, “not_enough_info” statuses]

#### `vm.type`
Possible values = [“vmware”, “parallels” … or empty string]

### Error occurred:
```json
{
    "error": {
        "code": 401,
        "description": "token is invalid"
    }
}
```
#### `error.code` - Error code
#### `error.description` - Error description
