<p align="center">
  <a href="https://fingerprint.com">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/fingerprintjs/botd/main/resources/fp_logo_white.svg">
      <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/fingerprintjs/botd/main/resources/fp_logo_blue.svg">
      <img alt="Fingerprint" width="312px" src="https://raw.githubusercontent.com/fingerprintjs/botd/main/resources/fp_logo_orange_blue.svg">
    </picture>
  </a>
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/@fpjs-incubator/botd-agent">
    <img src="https://img.shields.io/npm/v/@fpjs-incubator/botd-agent.svg" alt="Current NPM version">
  </a>
  <a href="https://www.npmjs.com/package/@fpjs-incubator/botd-agent">
    <img src="https://img.shields.io/npm/dm/@fpjs-incubator/botd-agent.svg" alt="Monthly downloads from NPM">
  </a>
  <a href="https://www.jsdelivr.com/package/npm/@fpjs-incubator/botd-agent">
    <img src="https://img.shields.io/jsdelivr/npm/hm/@fpjs-incubator/botd-agent.svg" alt="Monthly downloads from jsDelivr">
  </a>
</p>
<p align="center">
  <a href="https://discord.gg/P6Ya76HkbF">
    <img src="https://img.shields.io/discord/852099967190433792?style=for-the-badge&label=Discord&logo=Discord&logoColor=white" alt="Discord server">
  </a>
</p>

## BotD

```diff
# Before

- 40% of your website traffic is from bots
- They're taking over accounts, scraping prices and ruining your website reputation

# After

+ BotD is a browser library for JavaScript bot detection
+ Easily add ability to detect automation tools
+ Requires adding only a few lines of JavaScript on your website
```

#### 🔩 [Try Demo](https://fingerprintjs.github.io/BotD/) - see the live demo running in your browser

BotD runs in the [browser](#install); additionally you can harden it by using our open source cloud integrations.

## 🤖 **_Check for more advanced and accurate bot detection [here](https://fingerprint.com/products/bot-detection/)_**

## Install from CDN

```html
<script>
    // Initialize an agent at application startup.
    const botdPromise = import('https://openfpcdn.io/botd/v1').then((Botd) => Botd.load())

    botdPromise
        .then((botd) => botd.detect())
        .then((result) => console.log(result))
        .catch((error) => console.error(error))
</script>
```

[Run this code](https://stackblitz.com/edit/botd-cdn?devtoolsheight=100&file=index.html)

## Install from NPM to use with Webpack/Rollup/Browserify

```bash
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

### 📕 [Full documentation](docs/api.md)

### 📙 [Migration guide](docs/migration-guide.md) from `0.1`

<br />

### **Detectable Automation Tools & Frameworks**

-   Headless Browsers ([Chrome](https://www.google.com/chrome/), [Firefox](https://www.mozilla.org/en-US/firefox/new/))
-   [SeleniumHQ/selenium](https://github.com/SeleniumHQ/selenium) is an umbrella project encapsulating a variety of tools and libraries enabling web browser automation.
-   [microsoft/playwright](https://github.com/microsoft/playwright) is a Node.js library to automate Chromium, Firefox and WebKit with a single API.
-   [ariya/phantomjs](https://github.com/ariya/phantomjs) is a headless WebKit scriptable with JavaScript.
-   [segmentio/nightmare](https://github.com/segmentio/nightmare) is a high-level browser automation library.
-   [electron/electron](https://github.com/electron/electron) framework lets you write cross-platform desktop applications using JavaScript, HTML and CSS.
-   [laurentj/slimerjs](https://github.com/laurentj/slimerjs) is a scriptable browser.

### Documentation links:

-   #### [API Reference](docs/api.md)
-   #### [Browser Support](docs/browser_support.md)
-   #### [Migration Guide](docs/migration_guide.md)

### Contributing

See the [contributing guidelines](contributing.md) to learn how to start a playground, test, and build.

### License

[MIT](LICENSE)

<p align="center">
© 2022 FingerprintJS, Inc
</p>
