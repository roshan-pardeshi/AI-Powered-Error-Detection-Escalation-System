@echo off
REM ============================================
REM AI-Powered Error Detection System Setup
REM ============================================

echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║  AI-Powered Error Detection & Escalation System            ║
echo ║  Windows Startup Script                                    ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ✗ Node.js is not installed. Please install Node.js v14 or higher.
    echo   Download from: https://nodejs.org/
    pause
    exit /b 1
)
echo ✓ Node.js is installed

REM Check if MySQL is running
netstat -an | find ":3306" >nul 2>nul
if %errorlevel% neq 0 (
    echo ✗ MySQL is not running on port 3306
    echo   Start MySQL server first (Services → MySQL80 → Start)
    pause
    exit /b 1
)
echo ✓ MySQL is running

echo.
echo Installing dependencies...
echo.

REM Install backend dependencies
echo [1/2] Installing Backend Dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ✗ Failed to install backend dependencies
    pause
    exit /b 1
)
echo ✓ Backend dependencies installed
cd..

REM Install frontend dependencies
echo [2/2] Installing Frontend Dependencies...
cd frontend
call npm install
if %errorlevel% neq 0 (
    echo ✗ Failed to install frontend dependencies
    pause
    exit /b 1
)
echo ✓ Frontend dependencies installed
cd ..

echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║  Setup Complete! Starting Application...                  ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

REM Note: You need to run these in separate terminals
echo.
echo Next steps:
echo ===========
echo.
echo 1. Open NEW TERMINAL (Command Prompt or PowerShell)
echo    and run: cd backend && npm run dev
echo.
echo 2. Open ANOTHER NEW TERMINAL
echo    and run: cd frontend && npm start
echo.
echo The backend will start on port 5000
echo The frontend will start on port 3000
echo.
echo Then open: http://localhost:3000
echo.
pause
