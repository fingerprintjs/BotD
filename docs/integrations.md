# How to create own integration using BotD

## Code examples

* [CloudFlare](https://github.com/fingerprintjs/botd-integrations/tree/main/cloudflare) integration using CloudFlare Workers.
* Fastly's [Compute@Edge](https://github.com/fingerprintjs/botd-integrations/tree/main/fastly/wasm) integration.
* [Next.js](https://github.com/vercel/examples/tree/main/edge-functions/bot-protection-botd) edge middleware integration.

## Workflow

## Snippet for injection

```html
<script>
    function getResults(){
      Botd.load({
        token: "<YOUR_TOKEN>",
        endpoint: "<BOTD_ENDPOINT>",
        mode: "integration"
      }).then(botDetector => botDetector.detect())
</script>
<script src="<PATH_TO_BOTD>" onload="getResults()"></script>
```

## Edge Detect

## Results in header
