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

## 🤖 Upgrade to Fingerprint Bot Detection to detect sophisticated bots with confidence.

[Fingerprint Bot Detection API](https://fingerprint.com/try/bot-detection/) is a professional bot detection API service that processes all information server-side and transmits it securely to your servers.

Fingerprint Bot Detection API provides both browser and server-side APIs that make the process of bot detection fast and secure. When using the Bot Detection, use the browser JavaScript SDK to detect browser automation tools and server-side Automation Intelligence API to detect more bot bot types, such as AI agents, AI assistants, and AI/LLM crawlers.

The commercial product combines vast amounts of auxiliary data that bots expose (network properties, browser overrides) to be able to reliably deduplicate real users from automated software, resulting in the detection of popular AI tools, browser automation tools, their derivatives and plugins.

A big advantage of the paid product is that it's able to distinguish good bots from bad ones that allow you to block malicious traffic without blocking search engine crawlers, monitoring workers, etc.

<p align="center">
  <a href="https://fingerprint.com/try/bot-detection">
    <img width="700" alt="image" src="https://github.com/user-attachments/assets/20112051-8f03-4ace-a806-570d77acace1" />
  </a>
</p>

Full product comparison:

<table>
  <thead>
    <tr>
      <th></th>
      <th align="center">Open Source Library</th>
      <th align="center">Bot Detection API</th>
    </tr>
  </thead>
  <tbody>
    <tr><td colspan="3"><h4>Core Features</h4></td></tr>
    <tr><td>100% open source</td><td align="center">yes</td><td align="center">no</td></tr>
    <tr><td><b>AI Agent Detection</b><br/><i>OpenAI, Manus, AWS AgentCore</i></td><td align="center">–</td><td align="center">✓</td></tr>
    <tr><td><b>AI Assistant Detection</b><br/><i>ChatGPT, Anthropic, Google Gemini</i></td><td align="center">–</td><td align="center">✓</td></tr>
    <tr><td><b>Web Bot Auth support</b><br/><i>Detect verified, signed, and spoofed identities</i></td><td align="center">–</td><td align="center">✓</td></tr>
    <tr><td><b>Search Engine detection</b><br/><i>Google, Bing, DuckDuckGo</i></td><td align="center">–</td><td align="center">✓</td></tr>
    <tr><td><b>Anti Detect Browser detection</b><br/><i>AdsPower, Dolphin Anty, Kameleo</i></td><td align="center">–</td><td align="center">✓</td></tr>
    <tr><td>Browser Automation Tools detection</td><td align="center">partial</td><td align="center">full</td></tr>
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
    <tr><td><b>Requires JavaScript</b><br/><i>Requires a JavaScript library to detect bots</i></td><td align="center">yes</td><td align="center">no</td></tr>
    <tr><td><b>Server-side accuracy increase</b><br/><i>based on additional server-side data, such as TLS crypto support, ipv4/v6 data and others</i></td><td align="center">–</td><td align="center">✓</td></tr>
    <tr><td><b>Query API</b><br/><i>build flexible workflows</i></td><td align="center">–</td><td align="center">✓</td></tr>
    <!-- -->
    <tr><td colspan="3"><h4>Operations</h4></td></tr>
    <tr><td><b>Data security</b></td><td align="center">Your infrastructure</td><td align="center">Encrypted at rest</td></tr>
    <tr><td><b>Storage</b></td><td align="center">Your infrastructure</td><td align="center">Unlimited up to 1 yr</td></tr>
    <tr><td><b>Regions</b></td><td align="center">Your infrastructure</td><td align="center">Hosting in US, EU and Mumbai</td></tr>
    <tr><td><b>Compliance</b></td><td align="center">Your infrastructure</td><td align="center">GDPR, CCPA compliant<sup>1</sup></td></tr>
    <tr><td><b>SLA</b></td><td align="center">No SLA</td><td align="center">99.9% Uptime</td></tr>
    <tr><td><b>Support</b></td><td align="center">GitHub community</td><td align="center">Support team via email, chat, and call-back within 1 business day</td></tr>

  </tbody>
</table>


<sub>1. Fingerprint Pro is GDPR and CCPA compliant as the data processor. You still need to be compliant as the data controller and use the bot detection for fraud prevention under legitimate interest or ask for user consent.</sub>

Bot detection API result example:

```js
{
  "bot": "bad",
  "bot_type": "headless_chrome",
  "bot_info": {
    "category": "browser_automation",
    "provider": "chromium/chromium",
    "name": "ChromeHeadless",
    "identity": "unknown",
    "confidence": "medium"
  }
}
```

🍿 [Live demo](https://demo.fingerprint.com/playground)

📕 [Fingerprint Bot Detection API Docs]([https://docs.fingerprint.com](https://docs.fingerprint.com/docs/bot-detection/overview))


## Contributing

See the [Contribution guidelines](contributing.md) to learn how to contribute to the project or run the project locally.
Please read it carefully before making a pull request.

## Other open-source products by Fingerprint on GitHub!
-   [FingerprintJS -- browser fingerprinting library that queries browser attributes and computes a hashed visitor identifier from them](https://github.com/fingerprintjs/fingerprintjs)
-   [Fingerprint Android -- Android identification and fingerprinting in native apps](https://github.com/fingerprintjs/fingerprintjs-android)
-   [Fingerprint iOS -- iOS identification and fingerprinting in native apps](https://github.com/fingerprintjs/fingerprintjs-ios)

### License

[MIT](LICENSE)

<p align="center">
© 2026 FingerprintJS, Inc
</p>
