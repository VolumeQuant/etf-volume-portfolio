# Backend server script
Write-Host "Starting ETF Pulse backend server..." -ForegroundColor Cyan

$scriptPath = $PSScriptRoot

Write-Host "Activating conda environment and starting server..." -ForegroundColor Yellow
Set-Location "$scriptPath\app"

conda run -n volumequant python main.py

Write-Host ""
Write-Host "Backend API: http://localhost:8002" -ForegroundColor Green
Write-Host "API Docs: http://localhost:8002/docs" -ForegroundColor Green

