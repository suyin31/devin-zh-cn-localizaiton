function Get-DevinPatchAppRoot {
    [CmdletBinding()]
    param(
        [string]$RequestedAppRoot,
        [switch]$Required
    )

    $candidate = $RequestedAppRoot
    if (-not $candidate) {
        $stateBase = if ($env:APPDATA) { $env:APPDATA } elseif ($env:USERPROFILE) { $env:USERPROFILE } else { $PSScriptRoot }
        $manifestPath = Join-Path $stateBase 'DevinZhCnLocalization\manifest.json'
        if (Test-Path -LiteralPath $manifestPath) {
            $manifest = Get-Content -LiteralPath $manifestPath -Raw | ConvertFrom-Json
            $candidate = $manifest.appRoot
        }
    }

    if (-not $candidate) {
        if ($Required) { throw 'Pass the Devin resources/app folder with -AppRoot.' }
        return $null
    }

    return (Resolve-Path -LiteralPath $candidate -ErrorAction Stop).ProviderPath
}

function Assert-DevinClosed {
    [CmdletBinding()]
    param([Parameter(Mandatory)][string]$AppRoot)

    $resolvedRoot = (Resolve-Path -LiteralPath $AppRoot -ErrorAction Stop).ProviderPath
    $installRoot = Split-Path -Parent (Split-Path -Parent $resolvedRoot)
    $expectedExe = [IO.Path]::GetFullPath((Join-Path $installRoot 'Devin.exe'))
    if (-not (Test-Path -LiteralPath $expectedExe -PathType Leaf)) {
        throw "The expected Devin executable was not found at '$expectedExe'. Check that -AppRoot points to resources/app."
    }
    $processes = @(Get-Process -Name Devin -ErrorAction SilentlyContinue)

    foreach ($process in $processes) {
        $runningExe = $null
        try { $runningExe = $process.Path } catch {}
        if (-not $runningExe) {
            throw "Cannot verify the path of Devin process $($process.Id). Close Devin before changing its files."
        }
        $runningExe = [IO.Path]::GetFullPath($runningExe)
        if ([string]::Equals($runningExe, $expectedExe, [StringComparison]::OrdinalIgnoreCase)) {
            throw "Devin is running from '$expectedExe'. Close it before installing, refreshing, or restoring the patch."
        }
    }
}
