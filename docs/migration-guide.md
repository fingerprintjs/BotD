# 📙 BotD API Migration Guide

The API has changed, and **you need to update your code**.

In the new version, we have implemented detection logic on the client side, meaning we don't make requests to our servers. Also you don't need to generate any API keys anymore.

## Previous `0.1`

```ts
const botdPromise = import('https://openfpcdn.io/botd/v0.1').then((Botd) =>
    Botd.load({ publicKey: '<your-public-key>' }),
)
botdPromise
    .then((botd) => botd.detect())
    .then((result) => console.log(result))
    .catch((error) => console.error(error))
```

## Current

```ts
import { load } from '@fpjs-incubator/botd-agent'

load()
    .then((botd) => botd.detect())
    .then((result) => console.log(result))
    .catch((error) => console.error(error))
```

The new response is now an object containing property "bot" indicating whether the user is a bot or not. And if "bot" is `true`, then we additionaly provide a property "botKind" as described in our [API docs](docs/api.md).

```json
{
    "bot": "<boolean>",
    "botKind": "<BotKind | undefined>"
}
```
