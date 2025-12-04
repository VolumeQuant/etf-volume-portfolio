# Frontend server script
Write-Host "Starting ETF Pulse frontend server..." -ForegroundColor Cyan

$scriptPath = $PSScriptRoot

Write-Host "Starting React dev server..." -ForegroundColor Yellow
Set-Location "$scriptPath\frontend"

npm run dev

Write-Host ""
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Green

