# Basic OAuth Client

You dont need a whole library for OAuth.

No typescript due to minimalism. Check this doc for structures, or just read the code.

## Client Credentials

Example usage
```
node ./getAccessToken.js
```
Arguments:
- `-v` or `--verbose` for verbose logging
- `-nc` or `--no-cache` to disable caching and only log token to console
- `name` or `--name` to fetch a specific config as defined in an array

## Sample Config File (UIUC Tenant)
`config.json`
```json
{
  "oAuthConfig": {
    "name": "archibus",
    "clientId": "",
    "clientSecret": "",
    "accessTokenUri": "https://login.microsoftonline.com/44467e6f-462c-4ea2-823f-7800de5434e3/oauth2/v2.0/token",
    "resource": "https://graph.microsoft.com"
  },
}
```
Optional:
- `name` - used in the program if using multiple configs
- `scope` - takes precedence over `scopes`. Defaults to `.default`.
- `scopes` - array of scopes
- `resource`

Needed for autorization token flow:
- `redirectUri`
- `authorizationUri`

#### Extra options example:
```json
{
  "oAuthConfig": {
    (...),
    "redirectUri": "http://localhost:3000/exampleCallback",
    "authorizationUri": "https://login.microsoftonline.com/44467e6f-462c-4ea2-823f-7800de5434e3/oauth2/v2.0/authorize",
    "scope": "openid profile email offline_access",
  },
  "oAuthConfigs": []
}
```
