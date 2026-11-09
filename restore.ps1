param(
    [string]$AppRoot = $env:DEVIN_APP_ROOT
)

$ErrorActionPreference = 'Stop'
if ($AppRoot) {
    $env:DEVIN_APP_ROOT = (Resolve-Path -LiteralPath $AppRoot).ProviderPath
}

$entry = Join-Path $PSScriptRoot 'restore.mjs'
& node $entry
if ($LASTEXITCODE -ne 0) {
    throw 'The Devin Chinese localization patch could not be restored.'
}
