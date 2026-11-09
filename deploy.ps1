param(
    [string]$AppRoot = $env:DEVIN_APP_ROOT
)

$ErrorActionPreference = 'Stop'
if ($AppRoot) {
    $env:DEVIN_APP_ROOT = (Resolve-Path -LiteralPath $AppRoot).ProviderPath
}
if (-not $env:DEVIN_APP_ROOT) {
    throw 'Pass the Devin resources/app folder with -AppRoot.'
}

$entry = Join-Path $PSScriptRoot 'deploy.mjs'
& node $entry
if ($LASTEXITCODE -ne 0) {
    throw 'The Devin Chinese localization patch could not be applied.'
}
