# BotD API Reference

## [Migration guide](docs/migration-guide.md) from `0.1`

## Installation

### Browser ECMAScript module

```html
<script>
    // Initialize the agent at application startup.
    const botdPromise = import('https://openfpcdn.io/botd/v1').then((Botd) => Botd.load())
    botdPromise
        .then((botd) => botd.detect())
        .then((result) => console.log(result))
        .catch((error) => console.error(error))
</script>
```

[Run this code](https://stackblitz.com/edit/botd-cdn?devtoolsheight=100&file=index.html)

For browsers that don't support [import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
see the [browser support guide](browser_support.md#import-support).

### Webpack/Rollup/NPM/Yarn

```bash
# Install the package first:
npm i @fpjs-incubator/botd-agent
# or
yarn add @fpjs-incubator/botd-agent
```

```js
import { load } from '@fpjs-incubator/botd-agent'

// Initialize an agent at application startup.
load()
    .then((botd) => botd.detect())
    .then((result) => console.log(result))
    .catch((error) => console.error(error))
```

[Run this code](https://stackblitz.com/edit/botd-cdn?devtoolsheight=100&file=index.html)

**When you run BotD installed with NPM or Yarn, the library will send AJAX requests to FingerprintJS servers to collect usage statistics.**
When the `load` function runs, there is a 0.1% chance of sending a request.
The requests are sent at most once a week from one browser instance (unless the browser cache was cleared).
A request includes the following information:

-   The library version
-   The HTTP headers that the client sends, including the origin and the referrer of the page where the library runs
-   The IP of the client

You can turn off these requests by using the `monitoring` option:

```diff
const botdPromise = BotD.load({
+ monitoring: false
})
```

💡 Scripts downloaded from our CDN (https://openfpcdn.io) have monitoring disabled by default.

### CommonJS syntax:

```js
const { load } = require('@fpjs-incubator/botd-agent')

// Initialize an agent at application startup.
load()
    .then((botd) => botd.detect())
    .then((result) => console.log(result))
    .catch((error) => console.error(error))
```

## API

#### `BotD.load({ monitoring?: boolean }): Promise<BotDetector>`

Builds an instance of `BotDetector`. We recommend calling it as early as possible,
ideally during application startup. It returns a promise which you can chain on to call `BotDetector` methods later.

### `botDetector.detect(): Promise<BotDetectionResult>`

Performs bot detection. Returns an object that contains information if it's a bot and it's name.

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
