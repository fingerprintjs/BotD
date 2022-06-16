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

## BotD <small>_(currently in beta)_</small>

```diff
# Before

- 40% of your website traffic is from bots
- They're taking over accounts, scraping prices and ruining your website reputation

# After

+ BotD is a browser library for JavaScript bot detection
+ Easily add ability to detect automation tools, browser spoofing and virtual machines
+ Requires adding only 3 lines of JavaScript on your website
```

### 🔩 [Try Demo](https://fingerprint.com/products/bot-detection/) - see the live demo running in your browser

BotD runs in the [browser](#install-from-cdn); additionally you can harden it by using our open source cloud integrations.

### Cloud Integrations ☁️

* [CloudFlare](https://github.com/fingerprintjs/botd-integrations/tree/main/cloudflare) - runs in CloudFlare workers for increased accuracy and security.
* [Fastly](https://github.com/fingerprintjs/botd-integrations/tree/main/fastly/wasm) - runs in Fastly Compute@Edge high-performance WASM edge
* [Next.js/Vercel](https://github.com/vercel/examples/tree/main/edge-functions/bot-protection-botd)<sup>3rd party</sup> - runs as a Next.js edge middleware

## Install from CDN

```html
<script>
    // Initialize an agent at application startup.
    const botdPromise = import('https://openfpcdn.io/botd/v0.1')
        .then( Botd => Botd.load({ publicKey: '<your-public-key>' }))
    // Get the bot detection result when you need it.
    // Result will contain the `requestId` property, that you can securely verify on the server.
    botdPromise
        .then(botd => botd.detect())
        .then(result => console.log(result))
        .catch(error => console.error(error))
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
import Botd from '@fpjs-incubator/botd-agent';

// Initialize an agent at application startup.
const botdPromise = Botd.load({ publicKey: '<your-public-key>' });

(async () => {
  // Get the bot detection result when you need it.
  // Result will contain the `requestId` property, that you can securely verify on the server.
  const botd = await botdPromise;
  const result = await botd.detect();
  console.log(result);
})();
```
[Run this code](https://stackblitz.com/edit/botd-npm?devtoolsheight=100&file=index.js)

### 📕 [Full documentation](docs/api.md)

## Authentication

You need a pair of keys to use BotD:
- `publicKey` for making bot detection requests from browser. This key can be used publicly on your websites.
- `secretKey` for verifying bot detection requests on the server. This key must be kept secret.

_Please use [the following form](https://fingerprint.com/botd#generateKeySection) on our [BotD product page](https://fingerprint.com/products/bot-detection/) to generate your keys._
<br/>

### **Request Limit**
_The free keys are limited to 3M API calls per month and 10 calls per second while in beta._

## Supported detection scenarios

### **Automation Tools & Frameworks**

- Headless Browsers ([Chrome](https://www.google.com/chrome/), [Firefox](https://www.mozilla.org/en-US/firefox/new/))
- [SeleniumHQ/selenium](https://github.com/SeleniumHQ/selenium) is an umbrella project encapsulating a variety of tools and libraries enabling web browser automation.
- [microsoft/playwright](https://github.com/microsoft/playwright) is a Node.js library to automate Chromium, Firefox and WebKit with a single API.
- [ariya/phantomjs](https://github.com/ariya/phantomjs)  is a headless WebKit scriptable with JavaScript.
- [segmentio/nightmare](https://github.com/segmentio/nightmare) is a high-level browser automation library.
- [electron/electron](https://github.com/electron/electron) framework lets you write cross-platform desktop applications using JavaScript, HTML and CSS.
- [geb/geb](https://github.com/geb/geb) (pronounced “jeb”) is a browser automation solution.
- [macbre/phantomas](https://github.com/macbre/phantomas) Headless Chromium-based modular web performance metrics collector.
- [casperjs/casperjs](https://github.com/casperjs/casperjs) is a navigation scripting & testing utility for PhantomJS and SlimerJS.
- [laurentj/slimerjs](https://github.com/laurentj/slimerjs) is a scriptable browser.

### **Stealth plugins**

- [berstend/puppeteer-extra/packages/puppeteer-extra-plugin-stealth](https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth) a plugin for puppeteer-extra to prevent detection.
- [microlinkhq/browserless](https://github.com/microlinkhq/browserless) is an efficient driver for controlling headless browsers built on top of [puppeteer](https://github.com/puppeteer/puppeteer) developed for scenarios where performance matters.
- [ultrafunkamsterdam/undetected-chromedriver](https://github.com/ultrafunkamsterdam/undetected-chromedriver) Optimized Selenium Chromedriver patch which does not trigger anti-bot services.
- [MeiK2333/pyppeteer_stealth](https://github.com/MeiK2333/pyppeteer_stealth) is a stealth plugin for [pyppeteer](https://github.com/miyakogi/pyppeteer)

### **Vulnerability scanners**

- [beefproject/beef](https://github.com/beefproject/beef) is short for The Browser Exploitation Framework. It is a penetration testing tool that focuses on the web browser.
- [ajinabraham/OWASP-Xenotix-XSS-Exploit-Framework](https://github.com/ajinabraham/OWASP-Xenotix-XSS-Exploit-Framework) is an advanced Cross Site Scripting (XSS) vulnerability detection and exploitation framework.
- [Netflix-Skunkworks/sleepy-puppy](https://github.com/Netflix-Skunkworks/sleepy-puppy) is a cross-site scripting (XSS) payload management framework which simplifies the ability to capture, manage, and track XSS propagation over long periods of time.
- [echo-devim/xbackdoor](https://github.com/echo-devim/xbackdoor) is a tool to take advantage of a persistent XSS vulnerability.

### **Browser spoofing**

Browser spoofing - is a technique that helps users fake that they are using a different browser configuration by changing the browsers features.

The BotD helps to detect the following types of spoofing:
- User Agent spoofing
- Operating System spoofing
- Hardware spoofing
- etc.

### **VM detection**

The BotD helps to detect if the browser is running inside one of the popular virtual machines, like VirtualBox, VmWare, Parallels, Hyper-V, etc.

### **Search bots**
Google Bot, Bing Bot, Baidu Spider, Yahoo Bot, Alexa Bot, Apple Bot, Facebook Bot, Twitter Bot, Pinterest Bot,
DuckDuckGo Bot, Coccoc Bot, Yandex Bot, Telegram Bot, Kiwi Status Spider, Naver Spider, Sputnik Bot, Petal Bot,
Aspiegel Bot, Seznam Bot, Sogou Bot, DuckDuckGo Bot, Rackspace Bot, Pingdom Bot, WebPageTest.org crawlers,
StatusCakeBot, Nutch-based Bot, Genieo Web filter, etc.

<small><i>Many more tools and configurations are supported</i></small>

### Documentation links:
- #### [Browser API](docs/api.md)
- #### [Server API](docs/server_api.md)
- #### [Error Handling](docs/error.md)
- #### [FAQ](https://github.com/fingerprintjs/botd/wiki/FAQ)

### Contributing

See the [contributing guidelines](contributing.md) to learn how to start a playground, test, and build.

### License

[MIT](LICENSE)

<p align="center">
© 2022 FingerprintJS, Inc
</p>
