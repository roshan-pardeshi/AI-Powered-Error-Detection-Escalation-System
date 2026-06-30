@echo off
REM ============================================
REM Pre-Startup Verification Script
REM ============================================

echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║  Pre-Startup Verification                                 ║
echo ║  Checking all requirements...                              ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

setlocal enabledelayedexpansion
set errors=0

REM Check Node.js
echo [1/6] Checking Node.js...
where node >nul 2>nul
if !errorlevel! equ 0 (
    for /f "tokens=*" %%i in ('node --version') do echo ✓ Node.js %%i found
) else (
    echo ✗ Node.js NOT found - Install from https://nodejs.org/
    set /a errors=!errors!+1
)

REM Check npm
echo [2/6] Checking npm...
where npm >nul 2>nul
if !errorlevel! equ 0 (
    for /f "tokens=*" %%i in ('npm --version') do echo ✓ npm %%i found
) else (
    echo ✗ npm NOT found
    set /a errors=!errors!+1
)

REM Check MySQL
echo [3/6] Checking MySQL...
netstat -an | find ":3306" >nul 2>nul
if !errorlevel! equ 0 (
    echo ✓ MySQL is running on port 3306
) else (
    echo ✗ MySQL is NOT running on port 3306
    echo   Start MySQL service and try again
    set /a errors=!errors!+1
)

REM Check .env files
echo [4/6] Checking .env files...
if exist "backend\.env" (
    echo ✓ backend\.env exists
) else (
    echo ✗ backend\.env NOT found
    set /a errors=!errors!+1
)

if exist "frontend\.env" (
    echo ✓ frontend\.env exists
) else (
    echo ✗ frontend\.env NOT found
    set /a errors=!errors!+1
)

REM Check database schema file
echo [5/6] Checking database files...
if exist "database\schema.sql" (
    echo ✓ database\schema.sql found
) else (
    echo ✗ database\schema.sql NOT found
    set /a errors=!errors!+1
)

REM Check if databases are installed
echo [6/6] Checking npm dependencies...
if exist "backend\node_modules" (
    echo ✓ Backend dependencies installed
) else (
    echo ✗ Backend dependencies NOT installed
    echo   Run: cd backend ^&^& npm install
    set /a errors=!errors!+1
)

if exist "frontend\node_modules" (
    echo ✓ Frontend dependencies installed
) else (
    echo ✗ Frontend dependencies NOT installed
    echo   Run: cd frontend ^&^& npm install
    set /a errors=!errors!+1
)

echo.
if !errors! equ 0 (
    echo ╔════════════════════════════════════════════════════════════╗
    echo ║  ✓ All checks passed! Ready to start.                     ║
    echo ╚════════════════════════════════════════════════════════════╝
    echo.
    echo Next steps:
    echo ============
    echo.
    echo 1. Open Terminal 1 and run:
    echo    cd backend
    echo    npm run dev
    echo.
    echo 2. Open Terminal 2 and run:
    echo    cd frontend
    echo    npm start
    echo.
    echo Then open browser to: http://localhost:3000
    echo.
) else (
    echo ╔════════════════════════════════════════════════════════════╗
    echo ║  ✗ !errors! issue^(s^) found - see above                      ║
    echo ║  Please fix and try again                                  ║
    echo ╚════════════════════════════════════════════════════════════╝
    echo.
)

pause
