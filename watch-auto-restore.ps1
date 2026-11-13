$ErrorActionPreference = 'Stop'
$stateRoot = Join-Path $env:APPDATA 'DevinZhCnLocalization'
$helperRoot = Join-Path $stateRoot 'auto-restore'
$configPath = Join-Path $helperRoot 'config.json'
$logPath = Join-Path $helperRoot 'auto-restore.log'
$config = Get-Content -LiteralPath $configPath -Raw | ConvertFrom-Json
$appRoot = [IO.Path]::GetFullPath([string]$config.appRoot)
$installRoot = Split-Path -Parent (Split-Path -Parent $appRoot)
$expectedExe = [IO.Path]::GetFullPath((Join-Path $installRoot 'Devin.exe'))
$stopPath = Join-Path $helperRoot 'stop.request'
$lastMessage = ''
$stableBuildKey = ''
$stableSince = $null

function Write-AutoRestoreLog([string]$Message) {
    Add-Content -LiteralPath $logPath -Value ('[{0}] {1}' -f [DateTime]::Now.ToString('yyyy-MM-dd HH:mm:ss'), $Message) -Encoding UTF8
}

function Test-TargetDevinRunning {
    $rows = @(Get-CimInstance Win32_Process -Filter "name = 'Devin.exe'" -ErrorAction Stop)
    foreach ($row in $rows) {
        if (-not $row.ExecutablePath) { return $true }
        try { $runningPath = [IO.Path]::GetFullPath($row.ExecutablePath) }
        catch { return $true }
        if ([string]::Equals($runningPath, $expectedExe, [StringComparison]::OrdinalIgnoreCase)) { return $true }
    }
    return $false
}

function Test-SupportedBuildFilesReady($AppRoot, $Product) {
    $targets = @(
        @{ Path = 'out/vs/workbench/windsurf-chat-client/index.js'; Key = 'vs/workbench/windsurf-chat-client/index.js' },
        @{ Path = 'out/vs/sessions/sessions.desktop.main.js'; Key = 'vs/sessions/sessions.desktop.main.js' },
        @{ Path = 'out/vs/code/electron-browser/workbench/workbench.html'; Key = 'vs/code/electron-browser/workbench/workbench.html' }
    )
    if (-not $Product.checksums) { return $false }
    foreach ($target in $targets) {
        $checksumProperty = $Product.checksums.PSObject.Properties[$target.Key]
        if (-not $checksumProperty) { return $false }
        $expected = [string]$checksumProperty.Value
        if (-not $expected) { return $false }
        $path = Join-Path $AppRoot ($target.Path -replace '/', [IO.Path]::DirectorySeparatorChar)
        try { $bytes = [IO.File]::ReadAllBytes($path) }
        catch { return $false }
        $sha = [Security.Cryptography.SHA256]::Create()
        try { $actual = [Convert]::ToBase64String($sha.ComputeHash($bytes)).TrimEnd('=') }
        finally { $sha.Dispose() }
        if ($actual -cne $expected) { return $false }
    }
    return $true
}

while ($true) {
    try {
        if (Test-Path -LiteralPath $stopPath -PathType Leaf) {
            Write-AutoRestoreLog 'The restoration task received a safe stop request and exited.'
            break
        }
        if (-not (Test-Path -LiteralPath $appRoot -PathType Container)) {
            $stableBuildKey = ''
            $stableSince = $null
            if ($lastMessage -ne 'missing-install') {
                Write-AutoRestoreLog 'The configured Devin installation was not found; waiting without changing files.'
                $lastMessage = 'missing-install'
            }
            Start-Sleep -Seconds 10
            continue
        }
        $manifestPath = Join-Path $stateRoot 'manifest.json'
        if (-not (Test-Path -LiteralPath $manifestPath -PathType Leaf)) {
            $stableBuildKey = ''
            $stableSince = $null
            if ($lastMessage -ne 'missing-manifest') {
                Write-AutoRestoreLog 'No localization manifest is present; automatic restoration is idle.'
                $lastMessage = 'missing-manifest'
            }
            Start-Sleep -Seconds 10
            continue
        }

        $manifest = Get-Content -LiteralPath $manifestPath -Raw | ConvertFrom-Json
        $supported = Get-Content -LiteralPath (Join-Path $helperRoot 'supported-build.json') -Raw | ConvertFrom-Json
        $package = Get-Content -LiteralPath (Join-Path $appRoot 'package.json') -Raw | ConvertFrom-Json
        $product = Get-Content -LiteralPath (Join-Path $appRoot 'product.json') -Raw | ConvertFrom-Json
        $currentKey = '{0}|{1}|{2}' -f $package.version, $product.windsurfVersion, $product.commit
        $manifestKey = '{0}|{1}|{2}' -f $manifest.appVersion, $manifest.desktopVersion, $manifest.appCommit

        if ($currentKey -eq $manifestKey) {
            $lastMessage = ''
            $stableBuildKey = ''
            $stableSince = $null
            Start-Sleep -Seconds 5
            continue
        }
        if ($package.version -ne $supported.packageVersion -or $product.windsurfVersion -ne $supported.desktopVersion -or $product.commit -ne $supported.commit) {
            $stableBuildKey = ''
            $stableSince = $null
            $messageKey = "unsupported|$currentKey"
            if ($lastMessage -ne $messageKey) {
                Write-AutoRestoreLog "Devin build $currentKey is not verified by this copy of the project; it was left untouched. Update the helper after the project supports that build."
                $lastMessage = $messageKey
            }
            Start-Sleep -Seconds 10
            continue
        }
        if (-not (Test-SupportedBuildFilesReady -AppRoot $appRoot -Product $product)) {
            $stableBuildKey = ''
            $stableSince = $null
            $messageKey = "incomplete|$currentKey"
            if ($lastMessage -ne $messageKey) {
                Write-AutoRestoreLog 'The supported build is present, but its protected files do not yet match Devin recorded checksums; waiting for the update to finish.'
                $lastMessage = $messageKey
            }
            Start-Sleep -Seconds 5
            continue
        }
        if ($stableBuildKey -ne $currentKey) {
            $stableBuildKey = $currentKey
            $stableSince = [DateTime]::UtcNow
            $lastMessage = ''
        }
        if (([DateTime]::UtcNow - $stableSince).TotalSeconds -lt 30) {
            Start-Sleep -Seconds 5
            continue
        }
        if (Test-TargetDevinRunning) {
            $messageKey = "running|$currentKey"
            if ($lastMessage -ne $messageKey) {
                Write-AutoRestoreLog 'A supported update was detected. Devin is still running; restoration will wait until it is closed normally.'
                $lastMessage = $messageKey
            }
            Start-Sleep -Seconds 5
            continue
        }

        Write-AutoRestoreLog "Applying the verified Chinese patch to Devin $($product.windsurfVersion)."
        $deployOutput = @(& (Join-Path $helperRoot 'deploy.ps1') -AppRoot $appRoot 2>&1)
        foreach ($line in $deployOutput) { Write-AutoRestoreLog ([string]$line) }
        Write-AutoRestoreLog 'Patch restoration completed. Devin was not launched or restarted.'
        $lastMessage = ''
    }
    catch {
        $messageKey = [string]$_.Exception.Message
        if ($lastMessage -ne "error|$messageKey") {
            Write-AutoRestoreLog "Restoration attempt stopped safely: $messageKey"
            $lastMessage = "error|$messageKey"
        }
    }
    Start-Sleep -Seconds 5
}
