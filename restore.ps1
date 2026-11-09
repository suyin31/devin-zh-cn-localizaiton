param(
    [string]$AppRoot = $env:DEVIN_APP_ROOT
)

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'preflight.ps1')
$resolvedAppRoot = Get-DevinPatchAppRoot -RequestedAppRoot $AppRoot
if ($resolvedAppRoot) {
    $env:DEVIN_APP_ROOT = $resolvedAppRoot
    Assert-DevinClosed -AppRoot $resolvedAppRoot
}

$entry = Join-Path $PSScriptRoot 'restore.mjs'
& node $entry
if ($LASTEXITCODE -ne 0) {
    throw 'The Devin Chinese localization patch could not be restored.'
}
