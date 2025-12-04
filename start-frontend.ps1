# Frontend server script
Write-Host "Starting frontend server..." -ForegroundColor Green

# Navigate to project folder
Set-Location $PSScriptRoot

# Start frontend
Set-Location frontend
npm run dev

