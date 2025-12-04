# Start all servers script (opens in new windows)
Write-Host "Starting ETF Pulse servers..." -ForegroundColor Cyan

$scriptPath = $PSScriptRoot

# Find conda Python path
$condaPython = "$env:USERPROFILE\miniconda3\envs\volumequant\python.exe"
if (-not (Test-Path $condaPython)) {
    $condaPython = "$env:USERPROFILE\anaconda3\envs\volumequant\python.exe"
}

# Start backend server in new window
$backendCmd = "cd '$scriptPath\app'; & '$condaPython' main.py"
Start-Process powershell -ArgumentList "-NoExit", "-Command", $backendCmd

# Wait a bit
Start-Sleep -Seconds 2

# Start frontend server in new window
$frontendCmd = "cd '$scriptPath\frontend'; npm run dev"
Start-Process powershell -ArgumentList "-NoExit", "-Command", $frontendCmd

Write-Host "Backend and frontend servers started in new windows!" -ForegroundColor Green
Write-Host ""
Write-Host "Access URLs:" -ForegroundColor Yellow
Write-Host "  Backend API: http://localhost:8002" -ForegroundColor White
Write-Host "  Frontend:    http://localhost:5173" -ForegroundColor White
Write-Host ""
Write-Host "Press Ctrl+C in each window to stop the servers." -ForegroundColor Gray

