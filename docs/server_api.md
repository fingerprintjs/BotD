# Server BotD API

### Production endpoint `https://botd.fpapi.io/api/v1`

## API token

Instructions on how to get a token can be found [here](README.md#authorization).
There are two options of how to pass your API token:
1) `Auth-Token` header (preflight requests will be sent)
2) `token` query string parameter.

## GET `/results`
You can use method `/results` then to get full detection report by `requestId`.

### Query parameters

`id` - `requestId`.

Or you can pass `requestId` through `botd-request-id` variable in cookie.

### [Response](docs/api.md#mode-is-alldata) and [Error](docs/api.md#error-format) format
