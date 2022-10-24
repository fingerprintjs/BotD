# Browser support

The library supports all popular browsers.
We use the following command to determine which browsers to support:

```bash
npx browserslist "cover 96% in us, not IE < 11"
```

At the moment, these browsers are:

-   **Internet Explorer** 11 ([see the section below](#old-browsers-requirements))
-   **Edge** 93+
-   **Chrome** 49+
-   **Firefox** 52+
-   **Desktop Safari** 12.1+
-   **Mobile Safari** 10.3+
-   **Samsung Internet** 14.0+
-   **Android Browser** 4.4+ ([see the section below](#old-browsers-requirements))

Other browsers will probably also work, but we don't guarantee it.

## Old browsers requirements

### `import()` support

If you use the "Browser ECMAScript module" installation methods, you may have an error.
Old browsers don't support [import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import).
Replace it with a `<script>` tag:

```diff
+ // Note that we use iife.min.js with older browsers
+ <script src="https://openfpcdn.io/botd/v1/iife.min.js"></script>
  <script>
-   const botdPromise = import('https://openfpcdn.io/botd/v1')
-     .then(BotD => BotD.load())
+   var botdPromise = BotD.load()

    // ...
  </script>
```

### Polyfills

Very old browsers like Internet Explorer 11 and Android Browser 4.4
require a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) polyfill to work.
Add a Promise polyfill before loading the BotD agent.
Examples for various installation methods:

#### Webpack/Rollup/NPM/Yarn

```bash
# Install the polyfill package first:
npm i promise-polyfill
# or
yarn add promise-polyfill
```

```diff
+ import 'promise-polyfill/src/polyfill'
  import BotD from '@fingerprintjs/botd'

  // ...
```

#### UMD

```diff
  require(
    [
      'https://openfpcdn.io/botd/v1/umd.min.js',
+     'https://cdn.jsdelivr.net/npm/promise-polyfill@8/dist/polyfill.min.js',
    ],
    function (BotD) {
      // ...
    }
  )
```

#### CommonJS syntax:

```diff
+ require('promise-polyfill/src/polyfill')
  const BotD = require('@fingerprintjs/botd')

  // ...
```

### Code syntax

Old browsers like IE11 don't support `const`, `let` and arrow functions (`=>`).
Use `var` and the classic function syntax instead:

```diff
- const botdPromise = BotD.load()
+ var botdPromise = BotD.load()

  botdPromise
-   .then(fp => fp.detect())
+   .then(function (fp) { return fp.detect() })
-   .then(result => {
+   .then(function (result) {
      // Handle the result
    })
```
