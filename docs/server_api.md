# Server BotD API

> ### NOTE
>
> The most secure way to get bot detection results is by loading the browser agent in [`requestId` mode](response.md#browser-api-mode-is-requestid),
> calling [`detect`](api.md#botdetectordetect) in the browser and then getting the detection results on the server using [`/results` endpoint](#get-results).

### Production endpoint https://botd.fpapi.io/api/v1

## GET `/results`
Use GET on `/results` to get bot detection results by `requestId`.

### Query parameters

`id` - `requestId`.

Alternatively you can pass the `requestId` as a `botd-request-id` cookie value.

> ### NOTE
> BotD results for the `requestId` is stored for 30 days

### API token

Instructions on how to get your token can be found [here](/README.md#authentication).
There are two options of how to pass your API token:
1) `Auth-Token` header (recommended).
2) `token` query string parameter.

### Example

```sh
curl --request GET 'https://botd.fpapi.io/api/v1/results?id=<YOUR_REQUEST_ID>&token=<YOUR_TOKEN>'
```

### Response

> #### NOTE
>
> The response format in [Browser API](api.md) in `allData` mode and [Server API](server_api.md) is identical.

Response format can be found [here](response.md#browser-api-mode-is-alldata-or-when-using-the-server-api).

### Errors

Error format can be found [here](error.md#error-format).
