# BotD API Reference

## [Migration guide](docs/migration-guide.md) from `0.1`

## Installation

### Browser ECMAScript module

```html
<script>
    // Initialize the agent at application startup.
    const botdPromise = import('https://openfpcdn.io/botd/v1').then((Botd) => Botd.load())
    // Get detection results when you need them.
    botdPromise
        .then((botd) => botd.detect())
        .then((result) => console.log(result))
        .catch((error) => console.error(error))
</script>
```

[Run this code](https://stackblitz.com/edit/botd-cdn-tkdie9?devtoolsheight=100&file=index.html)

For browsers that don't support [import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
see the [browser support guide](browser_support.md#import-support).

### Webpack/Rollup/NPM/Yarn

```bash
# Install the package first:
npm i @fingerprintjs/botd
# or
yarn add @fingerprintjs/botd
```

```js
import { load } from '@fingerprintjs/botd'

// Initialize an agent at application startup.
load()
    .then((botd) => botd.detect())
    .then((result) => console.log(result))
    .catch((error) => console.error(error))
```

[Run this code](https://stackblitz.com/edit/botd-cdn-jwtcvu?devtoolsheight=100&file=index.js)

**When you run BotD installed with NPM or Yarn, the library will send AJAX requests to FingerprintJS servers to collect usage statistics.**
When the `load` function runs, there is a 0.1% chance of sending a request.
The requests are sent at most once a week from one browser instance (unless the browser cache was cleared).
A request includes the following information:

-   The library version
-   The HTTP headers that the client sends, including the origin and the referrer of the page where the library runs
-   The IP of the client

### CommonJS syntax:

```js
const { load } = require('@fingerprintjs/botd')

// Initialize an agent at application startup.
load()
    .then((botd) => botd.detect())
    .then((result) => console.log(result))
    .catch((error) => console.error(error))
```

## API

#### `BotD.load(): Promise<BotDetector>`

Builds an instance of `BotDetector`. We recommend calling it as early as possible,
ideally during application startup. It returns a promise which you can chain on to call `BotDetector` methods later.

> It's needed only once per page/app. Then you can get detection results when you need them.

#### `botDetector.collect(): Promise<AbstractSourceDict>`

Performs data collection. Returns a promise which resolves to a dictionary of collected sources.

> You should not call this method directly if you called `BotD.load` previously.

#### `botDetector.detect(): Promise<BotDetectionResult>`

Performs bot detection. Returns an object that contains information if it's a bot and it's name.

> If you used `BotD.load` previously, you can call this method directly, otherwise you should call `botDetector.collect` first.

```ts
type BotDetectionResult =
    | {
          bot: true
          botKind: BotKind
      }
    | {
          bot: false
      }
```

```ts
enum BotKind {
    Unknown = 'unknown',
    HeadlessChrome = 'headless_chrome',
    PhantomJS = 'phantomjs',
    Nightmare = 'nightmare',
    Selenium = 'selenium',
    Electron = 'electron',
    NodeJS = 'nodejs',
    Rhino = 'rhino',
    CouchJS = 'couchjs',
    Sequentum = 'sequentum',
    SlimerJS = 'slimerjs',
    CefSharp = 'cefsharp',
}
```

## Error handling

You should always call both `load` and `detect` with a `.catch` function where you should handle possible errors, e.g.

```ts
load()
    .then((botd) => botd.detect())
    .then((result) => console.log(result))
    .catch((error) => console.error(error)) // <==== Add this
```
