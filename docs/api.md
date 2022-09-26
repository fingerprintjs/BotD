# BotD API

## [Migration guide](docs/migration-guide.md) from `0.1`

## method `Botd.load`

```ts
Botd.load(): Promise<BotDetector>
```

Builds an instance of `BotDetector`. We recommend calling it as early as possible,
ideally during application startup. It returns a promise which you can chain on to call `BotDetector` methods later.

## method `BotDetector.detect`

```ts
botDetector.detect(): Promise<BotDetectionResult>
```

Performs bot detection. Returns an object that contains information if it's a bot and it's name.

## interface `BotDetectionResult`

```json
{
    "bot": "<boolean>",
    "botKind": "<BotKind | undefined>"
}
```

## enum `BotKind`

```json
{
    "Unknown": "unknown",
    "HeadlessChrome": "headless_chrome",
    "PhantomJS": "phantomjs",
    "Nightmare": "nightmare",
    "Selenium": "selenium",
    "Electron": "electron",
    "NodeJS": "nodejs",
    "Rhino": "rhino",
    "CouchJS": "couchjs",
    "Sequentum": "sequentum",
    "SlimerJS": "slimerjs",
    "CefSharp": "cefsharp"
}
```

For errors see [error docs](error.md).
