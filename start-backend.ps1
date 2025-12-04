# Backend server script
Write-Host "Starting backend server..." -ForegroundColor Green

# Navigate to project folder
Set-Location $PSScriptRoot

# Start backend
Set-Location app
conda run -n volumequant python main.py

