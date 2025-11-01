<p align="center">
  <a href="https://fingerprint.com">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/fingerprintjs/botd/dev/resources/logo_light.svg" />
      <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/fingerprintjs/botd/dev/resources/logo_dark.svg" />
      <img src="https://raw.githubusercontent.com/fingerprintjs/botd/dev/resources/logo_dark.svg" alt="FingerprintJS logo" width="312px" />
    </picture>
  </a>
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/@fingerprintjs/botd">
    <img src="https://img.shields.io/npm/v/@fingerprintjs/botd.svg" alt="Current NPM version">
  </a>
   <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/:license-mit-blue.svg?style=flat"/>
  </a>
  <a href="https://discord.gg/39EpE2neBg">
    <img src="https://img.shields.io/discord/852099967190433792?style=logo&label=Discord&logo=Discord&logoColor=white" alt="Discord server">
  </a>
  <a href="https://github.com/fingerprintjs/BotD/blob/main/docs/api.md">
    <img src="https://img.shields.io/badge/-Documentation-green" alt="BotD documentation">
  </a>
</p>

## BotD

BotD is an open source library that we created to make it easy for  every developer to detect basic bots in their web apps.

It is available under a permissive MIT license and will always be free for developers and commercial use.

## 🚧 Maintenance Status

We keep the open-source BotD package healthy with timely critical fixes and regressions addressed as fast as possible. That said, the near-term roadmap is stability-only, so new features are unlikely to land soon. Please plan accordingly if you depend on upcoming enhancements.

For more demanding applications we created a professional API-based bot detection software that is called [Fingerprint Pro Bot Detection](https://fingerprint.com/products/bot-detection/).

[⚡ View Our Demo](https://fingerprintjs.github.io/BotD)

## Quick start

### CDN

```html
<script>
    // Initialize an agent at application startup, once per page/app.
    const botdPromise = import('https://openfpcdn.io/botd/v2').then((Botd) => Botd.load())
    // Get detection results when you need them.
    botdPromise
        .then((botd) => botd.detect())
        .then((result) => console.log(result))
        .catch((error) => console.error(error))
</script>
```

[Run this code](https://stackblitz.com/edit/botd-v2-cdn?devtoolsheight=100&file=index.html)

### NPM

```bash
npm i @fingerprintjs/botd
# or
yarn add @fingerprintjs/botd
```

```js
import { load } from '@fingerprintjs/botd'

// Initialize an agent at application startup, once per page/app.
const botdPromise = load()
// Get detection results when you need them.
botdPromise
    .then((botd) => botd.detect())
    .then((result) => console.log(result))
    .catch((error) => console.error(error))
```

[Run this code](https://stackblitz.com/edit/botd-v2-npm?devtoolsheight=100&file=index.js)

📕 [Full documentation](docs/api.md)

## 🤖 Upgrade to Fingerprint Pro Bot Detection to detect sophisticated bots with confidence.

[Fingerprint Pro Bot Detection](https://fingerprint.com/products/bot-detection/) is a professional bot detection service that processes all information server-side and transmits it securely to your servers using server-to-server APIs.

Fingerprint Pro Bot Detection provides both browser and server-side APIs that make the process of bot detection fast and secure. When using the Pro Bot Detection, use the browser JavaScript SDK to obtain the requestID value and then verify this value using our server API.

The Pro product combines vast amounts of auxiliary data that bots leak (cursor movements, network overrides, browser changes and more) to be able to reliably deduplicate real users from automated software, resulting in the detection of popular automation tools, their derivatives and plugins.

A big advantage of the Pro detection is that it's able to distinguish good bots from bad ones that allow you to block malicious traffic without blocking search engine crawlers, monitoring workers, etc.

<p align="center">
  <a href="https://fingerprint.com/products/bot-detection/">
    <img src="https://raw.githubusercontent.com/fingerprintjs/botd/dev/resources/pro_botd_screenshot.png" alt="Pro BotD screenshot" width="700px" />
  </a>
</p>

Full product comparison:

<table>
  <thead>
    <tr>
      <th></th>
      <th align="center">Open Source</th>
      <th align="center">Pro</th>
    </tr>
  </thead>
  <tbody>
    <tr><td colspan="3"><h4>Core Features</h4></td></tr>
    <tr><td>100% open source</td><td align="center">yes</td><td align="center">no<sup>1</sup></td></tr>
    <!-- <tr><td>Accuracy</td><td align="center">up to 60%</td><td align="center"><b>99.5%</b></td></tr> -->
    <tr><td><b>Search engine detection</b><br/><i>works in all modern browsers - see our full list of <a href="https://dev.fingerprint.com/docs/browser-support/" target="_blank">browsers supported</a></i></td><td align="center">–</td><td align="center">✓</td></tr>
    <tr><td>Automation web services detection</td><td align="center">–</td><td align="center">✓</td></tr>
    <tr><td>Automation browser extensions detection</td><td align="center">–</td><td align="center">✓</td></tr>
    <tr><td colspan="3"><h4>Detectable automation tools & frameworks</h4></td></tr>
    <tr><td>Headless Browsers (<a href="https://www.google.com/chrome">Chrome</a>, <a href="https://www.mozilla.org/en-US/firefox/new/">Firefox</a>)</td><td align="center">✓</td><td align="center">✓</td></tr>
    <tr><td><b><a href="https://github.com/SeleniumHQ/selenium">seleniumHQ/selenium</a></b><br/><i>umbrella project encapsulating a variety of tools and libraries enabling web browser automation</i></td><td align="center">✓</td><td align="center">✓</td></tr>
    <tr><td><b><a href="https://github.com/microsoft/playwright">microsoft/playwright</a></b><br/><i>Node.js library to automate Chromium, Firefox and WebKit with a single API</i></td><td align="center">✓</td><td align="center">✓</td></tr>
    <tr><td><b><a href="https://github.com/ariya/phantomjs">ariya/phantomjs</a></b><br/><i>headless WebKit scriptable with JavaScript</i></td><td align="center">✓</td><td align="center">✓</td></tr>
    <tr><td><b><a href="https://github.com/segmentio/nightmare">segmentio/nightmare</a></b><br/><i>high-level browser automation library</i></td><td align="center">✓</td><td align="center">✓</td></tr>
    <tr><td><b><a href="https://github.com/electron/electron">electron/electron</a></b><br/><i>framework lets you write cross-platform desktop applications using JavaScript, HTML and CSS</i></td><td align="center">✓</td><td align="center">✓</td></tr>
    <tr><td><b><a href="https://github.com/laurentj/slimerjs">laurentj/slimerjs</a></b><br/><i>scriptable browser</i></td><td align="center">✓</td><td align="center">✓</td></tr>
    <!-- -->
    <tr><td colspan="3"><h4>Detectable stealth plugins</h4></td></tr>
    <tr><td><b><a href="https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth">berstend/puppeteer-extra/packages/puppeteer-extra-plugin-stealth</a></b><br/><i>plugin for puppeteer-extra to prevent detection.</i></td><td align="center">-</td><td align="center">✓</td></tr>
    <tr><td><b><a href="https://github.com/microlinkhq/browserless">microlinkhq/browserless</a></b><br/><i>efficient driver for controlling headless browsers built on top of <a href="https://github.com/puppeteer/puppeteer">puppeteer</a> developed for scenarios where performance matters</i></td><td align="center">-</td><td align="center">✓</td></tr>
    <tr><td><b><a href="https://github.com/ultrafunkamsterdam/undetected-chromedriver">ultrafunkamsterdam/undetected-chromedriver</a></b><br/><i>optimized Selenium Chromedriver patch which does not trigger anti-bot services</i></td><td align="center">-</td><td align="center">✓</td></tr>
    <tr><td><b><a href="https://github.com/MeiK2333/pyppeteer_stealth">MeiK2333/pyppeteer_stealth</a></b><br/><i>stealth plugin for <a href="https://github.com/miyakogi/pyppeteer">pyppeteer</a></i></td><td align="center">-</td><td align="center">✓</td></tr>
    <!-- <tr><td><a href="______">______</a><br/><i>____________</i></td><td align="center">✓</td><td align="center">✓</td></tr> -->
    <!-- -->
    <tr><td colspan="3"><h4>Additional Features</h4></td></tr>
    <tr><td><b>Server-side accuracy increase</b><br/><i>based on additional server-side data, such as TLS crypto support, ipv4/v6 data and others</i></td><td align="center">–</td><td align="center">✓</td></tr>
    <tr><td><b>Query API</b><br/><i>build flexible workflows</i></td><td align="center">–</td><td align="center">✓</td></tr>
    <!-- -->
    <tr><td colspan="3"><h4>Operations</h4></td></tr>
    <tr><td><b>Data security</b></td><td align="center">Your infrastructure</td><td align="center">Encrypted at rest</td></tr>
    <tr><td><b>Storage</b></td><td align="center">Your infrastructure</td><td align="center">Unlimited up to 1 yr</td></tr>
    <tr><td><b>Regions</b></td><td align="center">Your infrastructure</td><td align="center">Hosting in US, EU and Mumbai</td></tr>
    <tr><td><b>Compliance</b></td><td align="center">Your infrastructure</td><td align="center">GDPR, CCPA compliant<sup>2</sup></td></tr>
    <tr><td><b>SLA</b></td><td align="center">No SLA</td><td align="center">99.9% Uptime</td></tr>
    <tr><td><b>Support</b></td><td align="center">GitHub community</td><td align="center">Support team via email, chat, and call-back within 1 business day</td></tr>

  </tbody>
</table>

<sub>1. Pro uses the open source BotD library as well as proprietary technology for increased accuracy and result stability.</sub>

<sub>2. Fingerprint Pro is GDPR and CCPA compliant as the data processor. You still need to be compliant as the data controller and use the bot detection for fraud prevention under legitimate interest or ask for user consent.</sub>

Pro result example:

```js
{
    "bot": {
        "result": "bad"
        "type": "selenium"
    }
}
```

🍿 [Live demo](https://fingerprint.com/products/bot-detection/)

📕 [Fingerprint Pro documentation](https://dev.fingerprint.com)

## Migrating from <code>v0</code>

-   [Migration guide](docs/migration/v0_v2.md)
-   [V0 documentation](https://github.com/fingerprintjs/BotD/tree/v0)

## Migrating from <code>v1</code>

-   [Migration guide](docs/migration/v1_v2.md)
-   [V1 documentation](https://github.com/fingerprintjs/BotD/tree/v1)

## Supported browsers

The library supports all popular browsers.
See more details and learn how to run the library in old browsers in the [browser support guide](docs/browser_support.md).

## Where to get support

Thanks to our [series B funding](https://fingerprint.com/blog/series-b/), we are happy to provide technical support for our open-source BotD library. We recommend using GitHub [Issues](https://github.com/fingerprintjs/BotD/issues) to submit bugs or [Discussions](https://github.com/fingerprintjs/BotD/discussions) to ask questions.
Using issues and discussions publicly will help the open-source community and other users with similar issues.
However, if you require private support, please email us at [oss-support@fingerprint.com](mailto:oss-support@fingerprint.com).

## Contributing

See the [Contribution guidelines](contributing.md) to learn how to contribute to the project or run the project locally.
Please read it carefully before making a pull request.

## Other products by Fingerprint on GitHub!
-   [FingerprintJS -- browser fingerprinting library that queries browser attributes and computes a hashed visitor identifier from them](https://github.com/fingerprintjs/fingerprintjs)
-   [Fingerprint Android -- Android identification and fingerprinting in native apps](https://github.com/fingerprintjs/fingerprintjs-android)
-   [Fingerprint iOS -- iOS identification and fingerprinting in native apps](https://github.com/fingerprintjs/fingerprintjs-ios)

### License

[MIT](LICENSE)

<p align="center">
© 2025 FingerprintJS, Inc
</p>
