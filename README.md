<p align="center">
  <a href="https://fingerprintjs.com">
    <img src="https://raw.githubusercontent.com/fingerprintjs/botd/main/resources/logo.svg" alt="FingerprintJS" width="312px" />
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

### 🔩 [Try Demo](https://fingerprintjs.github.io/BotD/) - see the live demo running in your browser

BotD runs in the [browser](#install-from-cdn); additionally you can harden it by using our open source cloud integrations.

### Cloud Integrations ☁️

* [CloudFlare](https://github.com/fingerprintjs/botd-integrations/tree/main/cloudflare) - runs in CloudFlare workers for increased accuracy and security.
* [Fastly](https://github.com/fingerprintjs/botd-integrations/tree/main/fastly/wasm) - runs in Fastly Compute@Edge high-performance WASM edge
* [Next.js/Vercel](https://github.com/vercel/examples/tree/main/edge-functions/bot-protection-botd)<sup>3rd party</sup> - runs as a Next.js edge middleware

## Install from CDN

```html
<script>
function initBotd() {
  // Initialize an agent at application startup.
  const botdPromise = Botd.load({
      token: "<token>",
      mode: "allData"
  });
  // Get the bot detection result when you need it.
  botdPromise
      .then(botd => botd.detect())
      .then(result => {
        console.log(result);
      });
}
</script>
<script async
        src="https://cdn.jsdelivr.net/npm/@fpjs-incubator/botd-agent@0/dist/botd.min.js"
        onload="initBotd()">
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
const botdPromise = Botd.load({
    token: "<token>",
    mode: "allData"
});

(async () => {
  // Get the bot detection result when you need it.
  const botd = await botdPromise
  const result = await botd.detect();
  console.log(result);
})();
```
[Run this code](https://stackblitz.com/edit/botd-npm?devtoolsheight=100&file=index.js)

### 📕 [Full documentation](docs/api.md)

## Authorization

A **free token** is required to connect to our bot detection API.

_To get your token, please ping us on [Discord](https://discord.com/invite/P6Ya76HkbF) or email us at botd@fingerprintjs.com_
_(just type `token` in the email subject, no need to compose a body)_
<br/>
_The free token is limited to 1M API calls per month and 3 calls per second while in beta._

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
- #### [JavaScript API](docs/api.md)
- #### [Server-Side API](docs/server_api.md)
- #### [Response Format](docs/response.md)
- #### [Error Handling](docs/response.md)
- #### [FAQ](https://github.com/fingerprintjs/botd/wiki/FAQ)

### Contributing

See the [contributing guidelines](contributing.md) to learn how to start a playground, test, and build.

### License

[MIT](LICENSE)

<p align="center">
© 2021 FingerprintJS, Inc
</p>
