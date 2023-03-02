# Web
## Run site with vanilla NodeJS
```
node ./index.js
```

## Run site with nodemon
If you dont want to restart the server every time you make a change.
```
nodemon ./index.js
```

Install globally with `npm install -g nodemon`

## Component Schemas
### `basicWebPage`
```json
{
  "title": "Basic Web Page",
  "subtitle": "A basic web page with a title and description.",
  "body": "object"
}
```
Out:
```
<head><title>${title}</title></head>
<body style='font-family: Arial, Helvetica, sans-serif;'>
  <div style="text-align: center;">
    <h1> ${title} </h1>
    <h4> ${subtitle} </h4>
    ${body || ''}
  </div>
</body>
```

<!--
# Run bundled site with nginx
```
.\nginx.exe -g "daemon off;"
```
-->