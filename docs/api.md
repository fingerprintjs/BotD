# BotD Browser API
_BotD also has a [Server API](server_api.md)._

## `Botd.load`

```ts
Botd.load(options: InitOptions): Promise<BotDetector>
```

Builds an instance of `BotDetector`. We recommend calling it as early as possible,
ideally during application startup. It returns a promise which you can chain on to call `BotDetector` methods later.

### `InitOptions`
The `InitOptions` object has the following properties:

- `publicKey: string` (_required_) - A free account publicKey required to make the bot detection.
Instructions on how to get a token can be found [here](/README.md#authentication).

- `mode: string` - There are two modes supported:
  - `requestId` (_default_)
  - `integration` (only for [botd-integrations](https://github.com/fingerprintjs/botd-integrations))

## `BotDetector.detect`

```ts
botDetector.detect(options: DetectOptions): Promise<BotdResponse>
```

Performs bot detection. Internally it will make a network request to our server-side bot detection API
and return the `requestId` which you can use later to retrieve bot detection results.

> ### NOTE
>
> The `requestId` will implicitly be stored in a cookie (`botd-request-id`) for future convenience


### `DetectOptions`

The `DetectOptions` object has a single parameter `tag` with type `string`:

-   `tag` (_optional_) is a metadata string that you can associate with each bot detection event.

### `BotdResponse`

```json
{
    "requestId": "<requestId>" // request identifier, e.g. 01F9XY24VDZ9F4HHR4FSCRYTSH
}
```

For errors see [error docs](error.md).
