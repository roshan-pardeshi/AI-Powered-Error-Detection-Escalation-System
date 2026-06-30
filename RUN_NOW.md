# 🚀 QUICK START - 3 STEPS TO RUN

## Prerequisites (Do Once)

### 1. Install Node.js & MySQL

**Node.js:** https://nodejs.org/ (v14+)
**MySQL:** https://dev.mysql.com/downloads/mysql/

Verify installation:
```bash
node --version   # Should show v14+
npm --version    # Should show v6+
mysql --version  # Should show v5.7+
```

### 2. Start MySQL Service

**Windows:** Services → MySQL → Right-click → Start
**Mac:** `brew services start mysql`
**Linux:** `sudo systemctl start mysql`

### 3. Create Database

```bash
cd "C:\Users\Admin\OneDrive\Desktop\AI-Powered Error Detection & Escalation System"
mysql -u root -p < database/schema.sql
# Enter password: mysql@123
```

---

## RUN APPLICATION (Every Time)

### Step 1: Verify Setup (First Time Only)

Double-click: `verify.bat`

This checks:
- ✓ Node.js installed
- ✓ MySQL running
- ✓ .env files exist
- ✓ Dependencies installed

### Step 2: Open Terminal 1 - Start Backend

```bash
cd backend
npm run dev
```

Wait for message:
```
✓ Database connected successfully

    ╔════════════════════════════════════════════════════════════╗
    ║  Server running on port 5000                               ║
    ╚════════════════════════════════════════════════════════════╝
```

### Step 3: Open Terminal 2 - Start Frontend

```bash
cd frontend
npm start
```

Browser opens automatically to: **http://localhost:3000**

---

## That's It! 🎉

Application is now running:
- **Backend API**: http://localhost:5000
- **Frontend UI**: http://localhost:3000

---

## Test Features

1. **Sign Up** → Create test account
2. **Report Issue** → AI assigns priority automatically
3. **Dashboard** → Filter and manage issues
4. **Manager Role** → Update status/priority
5. **Escalation** → View overdue issues (if any)

---

## Stop Application

Press `Ctrl + C` in each terminal

---

## Common Issues

| Problem | Fix |
|---------|-----|
| Port 5000 in use | Change PORT in backend/.env |
| MySQL not running | Start MySQL service |
| npm not found | Restart terminal / Reinstall Node.js |
| White screen | Open browser console (F12) - check errors |
| API calls fail | Check backend is running |

---

## Need Help?

- **Setup Issues**: Read `SETUP_AND_RUN.md`
- **API Reference**: Read `API_DOCUMENTATION.md`
- **Full Documentation**: Read `README.md`

---

**Ready?** Follow steps above! 🚀
