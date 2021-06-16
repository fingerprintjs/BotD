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

## 🌱 botd
<small><i>currently in beta - API may change</i></small>

**botd** is a browser library for bot detection (detecting automation tools, browser spoofing and virtual machines).

### [Try Demo](https://fingerprintjs.github.io/botd/)

### Install from CDN

```html
<script>
function initBotd() {
  // Initialize an agent at application startup.
  const botdPromise = Botd.load({ token: "<token>", mode: "allData" })
  // Get the bot detection result when you need it.
  botdPromise
      .then(botd => botd.get())
      .then(result => {
        console.log(result);
      });
}
</script>
<script async
        src="https://unpkg.com/@fpjs-incubator/botd-agent@0/dist/botd.umd.min.js"
        onload="initBotd()">
</script>
```

### Alternatively you can install from NPM to use with Webpack/Rollup/Browserify

```bash
npm i @fpjs-incubator/botd-agent
# or
yarn add @fpjs-incubator/botd-agent
```

```js
import Botd from '@fpjs-incubator/botd-agent';

;(async () => {
  // Initialize an agent at application startup.
  const botdPromise = Botd.load({ token: "<token>", mode: "allData" })
  // Get the bot detection result when you need it.
  const botd = await botdPromise
  const result = await botd.get();
  console.log(result);
})();
```
A **free token** is required to connect to our bot detection API.

_To get your token, please email us at botd@fingerprintjs.com_
_(just type `token` in the email subject, no need to compose a body)_
<br/>
_The free token is limited to 1M API calls per month while in beta._

### Supported detection scenarios

<table>
<tr>
  <th>Automation Tools & Frameworks</th>
</tr>
<tr>
  <td>Chrome Headless</td>
</tr>
<tr>
  <td>Playwright</td>
</tr>
<tr>
  <td>PhantomJS</td>
</tr>
<tr>
  <th>Browser spoofing</th>
</tr>
<tr>
  <td>User Agent spoofing</td>
</tr>
<tr>
  <td>OS spoofing</td>
</tr>
<tr>
  <th>VM detection</th>
</tr>
<tr>
  <td>VirtualBox</td>
</tr>
<tr>
  <td>VmWare</td>
</tr>
<tr>
  <td>Parallels</td>
</tr>
<tr>
  <th>Search bots</th>
</tr>
<tr>
  <td>Google Bot</td>
</tr>
<tr>
  <td>Bing Bot</td>
</tr>
</table>
<small><i>Many more tools and configurations are supported</i></small>

### [Full API documentation](docs/api.md)

<p align="center">
© 2021 FingerprintJS, Inc
</p>
