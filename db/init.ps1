$SqliteExe = "C:\Program Files\sqlite\sqlite3.exe"

# initialize db from schema file
& $SqliteExe $PSScriptRoot\SimpleSiteCache.db ".read schema.sql"