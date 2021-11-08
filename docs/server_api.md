# Server BotD API

> NOTE
>
> The safest way to work with BotD is to load agent in [`requestId` mode](response.md#mode-is-requestid) and request detection results from server-side using [`/results` endpoint](#get-results).

### Production endpoint https://botd.fpapi.io/api/v1

## GET `/results`
You can use method `/results` then to get full detection report by `requestId`.

### Query parameters

`id` - `requestId`.

Or you can pass `requestId` through `botd-request-id` variable in cookie.

### API token

Instructions on how to get a token can be found [here](README.md#authorization).
There are two options of how to pass your API token:
1) `Auth-Token` header (preflight requests will be sent)
2) `token` query string parameter.

### Example

```shell
curl --request GET 'https://botd.fpapi.io/api/v1/results?id=<YOUR_REQUEST_ID>&token=<YOUR_TOKEN>'
```

### Response

> NOTE
>
> The responses in [JavaScript API](api.md) in `allData` mode and [Server API](server_api.md) are identical.

Response format can be found [here](docs/response.md#mode-is-alldata).

### Errors

Error format can be found [here](docs/error.md#error-format).
