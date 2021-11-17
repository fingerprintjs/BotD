# Server BotD API

> NOTE
>
> The safest way to get bot detection results is to load agent in [`requestId` mode](response.md#mode-is-requestid) and request detection results from the server using [`/results` endpoint](#get-results).

### Production endpoint https://botd.fpapi.io/api/v1

## GET `/results`
Use GET on `/results` to get bot detection detection results by `requestId`.

### Query parameters

`id` - `requestId`.

Or you can pass `requestId` as the `botd-request-id` cookie value.

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

> NOTE
>
> The responses in [JavaScript API](api.md) in `allData` mode and [Server API](server_api.md) are identical.

Response format can be found [here](response.md#mode-is-alldata).

### Errors

Error format can be found [here](error.md#error-format).
