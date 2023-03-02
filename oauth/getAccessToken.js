const config = require('./config.json');

// TODO: parse by name
const oAuthConfig = config.oAuthConfig || config.oAuthConfigs[0];
const fetch = require('node-fetch');
const fs = require('fs');

// == Program config options ==
const isVerbose = process.argv[2] === '-v' || process.argv[2] === '--verbose';
const noCache = process.argv[2] === '-nc' || process.argv[2] === '--no-cache';

const clientCredentials = {
    client_id: oAuthConfig.clientId,
    client_secret: oAuthConfig.clientSecret,
    grant_type: oAuthConfig.grant_type || 'client_credentials',
    scope: oAuthConfig.scope || 'https://graph.microsoft.com/.default',
};

// Build request body (needs to be encoded)
const requestBody = Object.keys(clientCredentials)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(clientCredentials[key])}`)
    .join('&');

// Build request options
const requestOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: requestBody,
};

// Build url
const url = new URL(oAuthConfig.accessTokenUri);
url.search = new URLSearchParams(requestOptions.body);

async function getTokenData() {
    const response = await fetch(url, requestOptions);
    let data = await response?.text();
    try {
      data = JSON.parse(data);
    } catch (e) {
      console.log(e);
    }
    isVerbose && console.log(data);
    return data;
}

(
  async () => {
    const response = await getTokenData();

    // Cache token or log to console
    noCache ? fs.writeFileSync('access_token.json', response?.access_token || '')
      : console.log(response?.access_token);

    if (isVerbose) {
      console.log(`[DEBUG] Raw access token (JWT)${oAuthConfig.name ? ` for ${oAuthConfig.name}` : ''}`);
      console.log(response);

      console.log('[DEBUG] Parsed access token (JWT)');
      // Require is down here because file reads are expensive
      try {
        console.log(require('./debugTools.js')?.decodeToken(response?.access_token));
      } catch (e) {
        console.log('Unable to decode token');
      }
    }
  }
)();