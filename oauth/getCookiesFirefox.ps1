$sqlite = "C:\Program Files\sqlite\sqlite3.exe"

pushd ($env:APPDATA + "\Mozilla\Firefox\Profiles\*.default-esr\")

# Get persistent cookies for discovery.illinois.edu (SAML/Shibboleth IDP preferences)
$shibIdpCookies = (& $sqlite cookies.sqlite "select name, value from moz_cookies where host like '%discovery.il%';" -separator "=")
$msLoginCookies = (& $sqlite cookies.sqlite "select name, value from moz_cookies where host like '%login.micro%';" -separator "=")

# join newlines
$cookiesAsString = [string]::join(";", $shibIdpCookies) + [string]::join(";", $msLoginCookies)

echo $cookiesAsString

popd

# Remove existing cookie file
Remove-Item -Path $PSScriptRoot\cookies.txt -Force -ErrorAction SilentlyContinue

# Cache cookie string to file
$cookiesAsString | Out-File -FilePath $PSScriptRoot\cookies.txt