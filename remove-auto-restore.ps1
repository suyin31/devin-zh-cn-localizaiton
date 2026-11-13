$ErrorActionPreference = 'Stop'
$stateRoot = Join-Path $env:APPDATA 'DevinZhCnLocalization'
$helperRoot = Join-Path $stateRoot 'auto-restore'
$stateFull = [IO.Path]::GetFullPath($stateRoot).TrimEnd([IO.Path]::DirectorySeparatorChar, [IO.Path]::AltDirectorySeparatorChar)
$helperFull = [IO.Path]::GetFullPath($helperRoot).TrimEnd([IO.Path]::DirectorySeparatorChar, [IO.Path]::AltDirectorySeparatorChar)
$expectedPrefix = $stateFull + [IO.Path]::DirectorySeparatorChar
if (-not $helperFull.StartsWith($expectedPrefix, [StringComparison]::OrdinalIgnoreCase) -or
    -not [string]::Equals((Split-Path -Leaf $helperFull), 'auto-restore', [StringComparison]::OrdinalIgnoreCase)) {
    throw 'The automatic-restoration folder is outside the expected location; no files were deleted.'
}

$taskUserSid = [Security.Principal.WindowsIdentity]::GetCurrent().User.Value
$taskSuffix = $taskUserSid -replace '[^A-Za-z0-9_-]', '_'
$taskName = "DevinZhCnLocalizationAutoRestore-$taskSuffix"
$stopPath = Join-Path $helperRoot 'stop.request'
$task = Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue

if ($task -and $task.State -in @('Running', 'Queued')) {
    Set-Content -LiteralPath $stopPath -Value 'stop' -Encoding ASCII
    $deadline = [DateTime]::UtcNow.AddSeconds(60)
    do {
        Start-Sleep -Milliseconds 500
        $task = Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue
    } while ($task -and $task.State -in @('Running', 'Queued') -and [DateTime]::UtcNow -lt $deadline)
    if ($task -and $task.State -in @('Running', 'Queued')) {
        throw 'The restoration task did not stop safely within 60 seconds. It has not been removed; try again shortly.'
    }
}
if ($task) {
    Unregister-ScheduledTask -TaskName $taskName -Confirm:$false
}

if (Test-Path -LiteralPath $helperFull) {
    Remove-Item -LiteralPath $helperFull -Recurse -Force
}

Write-Output 'Automatic restoration has been removed. The Devin localization patch and its backups were left unchanged.'
