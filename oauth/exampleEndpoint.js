const config = require('./config.json');
const fetch = require('node-fetch');
const fs = require('fs');

// TODO: Filter by name instead of grabbing first item
const apiRequest = config.endpoints[0].request;

const accessToken = fs.readFileSync('./access_token.json', 'utf8');
const fileCookies = fs.readFileSync('./cookies.txt', 'utf8');

// SAML (Shibboleth) cookie
const cookieList = (apiRequest.cookies || [
  '_saml_sp=aHR0cHM6Ly9hcmNoaWJ1c2Rldi5mcy5pbGxpbm9pcy5lZHUvc2hpYmJvbGV0aA==',
  '_saml_idp=dXJuOm1hY2U6aW5jb21tb246dWl1Yy5lZHU=',
  '_redirect_user_id=urn:mace:incommon:uiuc.edu',
  // Example cookie; Note: grab this from the browser at https://archibusdev.fs.illinois.edu cookies: non-persistent cookie
  // Hack for user impersonation
  // '_shibsession_<id>=<value>'
]);

// == list + file ==
// const cookiesAsStr = cookieList.join('; ') + '; ' + (fileCookies || '');
// == only list ==
const cookiesAsStr = cookieList.join('; ');
// == only file ==
// const cookiesAsStr = fileCookies;

// if passed arg, print all cookies and terminate
if (process.argv[2] === 'cookie') {
  console.log(cookiesAsStr);
  return;
}

const body = {
  "tableName": "bl",
  "fieldNames": ["bl.bl_id", "bl.name"],
  "restriction": "bl.bl_id LIKE '002%'"
};
const bodyAsString = JSON.stringify(body);

const requestOptions = {
  method: apiRequest.method,
  headers: {
    Authorization: `Bearer ${accessToken}`,
    Cookie: cookiesAsStr,
    // 'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Type': 'application/json',
  },
  redirect: 'follow',
  body: bodyAsString
};


async function getData() {
  const url = apiRequest.url;
  const response = await fetch(url, requestOptions);
  let result = await response.text();
  try {
    result = JSON.parse(result);
  } catch (e) {
    console.log(e);
  }

  console.log(result);
}

(
  async () => {
    const response = await getData();
    console.log(response);
    // console.log(requestOptions.headers.Cookie);
  }
)();