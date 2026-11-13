param(
    [Parameter(Mandatory = $true)]
    [string]$AppRoot
)

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'preflight.ps1')

$resolvedAppRoot = Get-DevinPatchAppRoot -RequestedAppRoot $AppRoot -Required
$stateRoot = Join-Path $env:APPDATA 'DevinZhCnLocalization'
$manifestPath = Join-Path $stateRoot 'manifest.json'
if (-not (Test-Path -LiteralPath $manifestPath -PathType Leaf)) {
    throw 'Install the Chinese patch first, then enable automatic restoration.'
}

$manifest = Get-Content -LiteralPath $manifestPath -Raw | ConvertFrom-Json
$package = Get-Content -LiteralPath (Join-Path $resolvedAppRoot 'package.json') -Raw | ConvertFrom-Json
$product = Get-Content -LiteralPath (Join-Path $resolvedAppRoot 'product.json') -Raw | ConvertFrom-Json
$supported = Get-Content -LiteralPath (Join-Path $PSScriptRoot 'supported-build.json') -Raw | ConvertFrom-Json
$manifestRoot = [IO.Path]::GetFullPath([string]$manifest.appRoot)
if (-not [string]::Equals($manifestRoot, $resolvedAppRoot, [StringComparison]::OrdinalIgnoreCase)) {
    throw 'The patch record points to a different Devin installation.'
}
if ($package.version -ne $supported.packageVersion -or $product.windsurfVersion -ne $supported.desktopVersion -or $product.commit -ne $supported.commit) {
    throw 'This Devin build is not the build verified by the current project version.'
}
if ($manifest.appVersion -eq $package.version -and $manifest.desktopVersion -eq $product.windsurfVersion -and $manifest.appCommit -eq $product.commit) {
    $localizerPath = Join-Path $resolvedAppRoot $manifest.localizer.rel
    if (-not (Test-Path -LiteralPath $localizerPath -PathType Leaf)) {
        throw 'The installed localization file is missing. Reapply the patch before enabling automatic restoration.'
    }
    $localizerHash = (Get-FileHash -LiteralPath $localizerPath -Algorithm SHA256).Hash.ToLowerInvariant()
    if ($localizerHash -ne ([string]$manifest.localizer.sha256).ToLowerInvariant()) {
        throw 'The installed localization file does not match its patch record.'
    }
}

$helperRoot = Join-Path $stateRoot 'auto-restore'
$taskUserSid = [Security.Principal.WindowsIdentity]::GetCurrent().User.Value
$taskSuffix = $taskUserSid -replace '[^A-Za-z0-9_-]', '_'
$taskName = "DevinZhCnLocalizationAutoRestore-$taskSuffix"
$stopPath = Join-Path $helperRoot 'stop.request'
$existingTask = Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue

if ($existingTask -and $existingTask.State -in @('Running', 'Queued')) {
    New-Item -ItemType Directory -Path $helperRoot -Force | Out-Null
    Set-Content -LiteralPath $stopPath -Value 'stop' -Encoding ASCII
    $deadline = [DateTime]::UtcNow.AddSeconds(60)
    do {
        Start-Sleep -Milliseconds 500
        $existingTask = Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue
    } while ($existingTask -and $existingTask.State -in @('Running', 'Queued') -and [DateTime]::UtcNow -lt $deadline)
    if ($existingTask -and $existingTask.State -in @('Running', 'Queued')) {
        throw 'The existing restoration task did not stop safely within 60 seconds. No helper files were changed; try again shortly.'
    }
}

try {
    New-Item -ItemType Directory -Path $helperRoot -Force | Out-Null
    $filesToCopy = @(
        'deploy.ps1',
        'deploy.mjs',
        'preflight.ps1',
        'supported-build.json',
        'devin-zh-cn-localizer.js',
        'watch-auto-restore.ps1'
    )
    foreach ($name in $filesToCopy) {
        Copy-Item -LiteralPath (Join-Path $PSScriptRoot $name) -Destination (Join-Path $helperRoot $name) -Force
    }

    $config = [ordered]@{
        appRoot = $resolvedAppRoot
        installedAt = [DateTime]::UtcNow.ToString('o')
    }
    $config | ConvertTo-Json | Set-Content -LiteralPath (Join-Path $helperRoot 'config.json') -Encoding UTF8

    $userId = if ($env:USERDOMAIN) { "$env:USERDOMAIN\$env:USERNAME" } else { $env:USERNAME }
    $powershellExe = (Get-Command 'powershell.exe' -ErrorAction Stop).Source
    $watchScript = Join-Path $helperRoot 'watch-auto-restore.ps1'
    $arguments = "-NoLogo -NoProfile -NonInteractive -ExecutionPolicy Bypass -WindowStyle Hidden -File `"$watchScript`""
    $action = New-ScheduledTaskAction -Execute $powershellExe -Argument $arguments -WorkingDirectory $helperRoot
    $trigger = New-ScheduledTaskTrigger -AtLogOn -User $userId
    $settings = New-ScheduledTaskSettingsSet -ExecutionTimeLimit ([TimeSpan]::Zero) -MultipleInstances IgnoreNew -StartWhenAvailable -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries
    $principal = New-ScheduledTaskPrincipal -UserId $userId -LogonType Interactive -RunLevel Limited
    Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $trigger -Settings $settings -Principal $principal -Description 'Safely restore the Devin Chinese patch after a verified update.' -Force | Out-Null
    Remove-Item -LiteralPath $stopPath -Force -ErrorAction SilentlyContinue
    Start-ScheduledTask -TaskName $taskName
}
catch {
    Remove-Item -LiteralPath $stopPath -Force -ErrorAction SilentlyContinue
    if ($existingTask) {
        try { Start-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue } catch {}
    }
    throw
}

Write-Output 'Automatic restoration is enabled for this Devin installation.'
Write-Output 'The background task never closes or restarts Devin and only patches builds listed in supported-build.json.'
Write-Output "To disable it later, run: .\remove-auto-restore.ps1"
