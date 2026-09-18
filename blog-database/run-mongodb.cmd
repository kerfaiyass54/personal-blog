@echo off
setlocal
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0run-mongodb.ps1" %*
if errorlevel 1 (
    echo MongoDB setup failed.
    exit /b 1
)
echo MongoDB setup completed.
