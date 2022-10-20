# Migrating BotD v0 to v1

This guide shows how to migrate your code from BotD version 0 to version 1.

The API has changed, and **you need to update your code**.

In the new version, we have implemented detection logic on the client side, meaning we don't make requests to our servers. Also you don't need to generate any API keys anymore.

## CDN

```diff
<script>
    // Initialize an agent at application startup.
-   const botdPromise = import('https://openfpcdn.io/botd/v0.1').then((Botd) =>
-       Botd.load({ publicKey: '<your-public-key>' }),
-   )
+   const botdPromise = import('https://openfpcdn.io/botd/v1').then((Botd) =>
+       Botd.load(),
+   )
    // Get the bot detection result when you need it.
-   // Result will contain the `requestId` property, that you can securely verify on the server.
    botdPromise
        .then((botd) => botd.detect())
        .then((result) => console.log(result))
        .catch((error) => console.error(error))
</script>
```

## NPM

```diff
- import Botd from '@fpjs-incubator/botd-agent';
+ import Botd from '@fingerprintjs/botd';

// Initialize an agent at application startup.
- const botdPromise = Botd.load({ publicKey: '<your-public-key>' });
+ const botdPromise = Botd.load();

(async () => {
  // Get the bot detection result when you need it.
- // Result will contain the `requestId` property, that you can securely verify on the server.
  const botd = await botdPromise;
  const result = await botd.detect();
  console.log(result);
})();
```

The new response is now an object containing property "bot" indicating whether the user is a bot or not. And if "bot" is `true`, then we additionaly provide a property "botKind" as described in our [API docs](docs/api.md).

```json
{
    "bot": "<boolean>",
    "botKind": "<BotKind | undefined>"
}
```
