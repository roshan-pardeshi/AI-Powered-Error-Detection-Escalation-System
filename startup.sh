#!/bin/bash
# ============================================
# AI-Powered Error Detection System Setup
# For Linux/Mac
# ============================================

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║  AI-Powered Error Detection & Escalation System            ║"
echo "║  Linux/Mac Startup Script                                  ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "✗ Node.js is not installed"
    echo "  Install from: https://nodejs.org/"
    exit 1
fi
echo "✓ Node.js is installed"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "✗ npm is not installed"
    echo "  Install Node.js and npm from: https://nodejs.org/"
    exit 1
fi
echo "✓ npm is installed"

# Check if MySQL is running
if ! nc -z localhost 3306 &> /dev/null; then
    echo "✗ MySQL is not running on port 3306"
    echo "  Start MySQL first: brew services start mysql (Mac) or sudo systemctl start mysql (Linux)"
    exit 1
fi
echo "✓ MySQL is running"

echo ""
echo "Installing dependencies..."
echo ""

# Install backend dependencies
echo "[1/2] Installing Backend Dependencies..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "✗ Failed to install backend dependencies"
    exit 1
fi
echo "✓ Backend dependencies installed"
cd ..

# Install frontend dependencies
echo "[2/2] Installing Frontend Dependencies..."
cd frontend
npm install
if [ $? -ne 0 ]; then
    echo "✗ Failed to install frontend dependencies"
    exit 1
fi
echo "✓ Frontend dependencies installed"
cd ..

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║  Setup Complete! Starting Application...                  ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

echo "Next steps:"
echo "==========="
echo ""
echo "1. Open NEW TERMINAL and run:"
echo "   cd backend && npm run dev"
echo ""
echo "2. Open ANOTHER NEW TERMINAL and run:"
echo "   cd frontend && npm start"
echo ""
echo "The backend will start on port 5000"
echo "The frontend will start on port 3000"
echo ""
echo "Then open: http://localhost:3000"
echo ""
