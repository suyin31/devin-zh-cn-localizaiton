param(
    [string]$AppRoot = $env:DEVIN_APP_ROOT
)

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'preflight.ps1')
$env:DEVIN_APP_ROOT = Get-DevinPatchAppRoot -RequestedAppRoot $AppRoot -Required
Assert-DevinClosed -AppRoot $env:DEVIN_APP_ROOT

$entry = Join-Path $PSScriptRoot 'deploy.mjs'
& node $entry
if ($LASTEXITCODE -ne 0) {
    throw 'The Devin Chinese localization patch could not be applied.'
}
