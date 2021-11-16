# BotD JavaScript API
_BotD also has a [server-side API](server_api.md)._

## `Botd.load`

```ts
Botd.load(options: InitOptions): Promise<BotDetector>
```

Builds an instance of `BotDetector`. We recommend calling it as early as possible,
ideally during application startup. It returns a promise which you can chain on to call `BotDetector` methods later.

### `InitOptions`
The `InitOptions` object has the following properties:

- `token: string` (_required_) - A free account token required to access the bot detection API.
Instructions on how to get a token can be found [here](/README.md#authorization).

- `mode: string` - There are two modes supported:
  - `requestId` (_default_)
  - `allData`.

  When `requestId` mode is used, only `requestId` field is returned to the browser.
  It's a safe way to detect a bot server-side without leaking results to the browser.
  This mode is recommended for production usage.

  When `allData` mode is used, all data from the bot detection result is returned to the browser.
  This mode is not recommended for production, but can be used during development and testing.

## `BotDetector.detect`

```ts
botDetector.detect(options: DetectOptions): Promise<BotdResponse>
```

Performs bot detection. Internally it will make a network request to our server-side bot detection API
and return the `requestId` which you can use later to retrieve bot detection results (or `allData` if you configured it this way).

**Note:** the `requestId` will implicitly be stored in a cookie (`botd-request-id`) for future convenience.

### `DetectOptions`

The `DetectOptions` object has a single parameter `tag` with type `string`:

-   `tag` (_optional_) is a metadata string that you can associate with each bot detection event.

### `BotdResponse`

BotD response formats can be found [here](response.md).
