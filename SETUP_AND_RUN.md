# 🚀 COMPLETE SETUP & RUN GUIDE

## System Requirements

- **Node.js**: v14 or higher
- **npm**: v6 or higher
- **MySQL**: v5.7 or higher
- **Windows**: Windows 10/11, Mac OS, or Linux

---

## STEP 1: Install Prerequisites

### 1.1 Install Node.js & npm

1. Visit: https://nodejs.org/ (Download LTS version)
2. Install Node.js (npm comes with it)
3. Verify installation:
   ```bash
   node --version    # Should show v14+
   npm --version     # Should show v6+
   ```

### 1.2 Install MySQL

**Windows:**
1. Download MySQL from: https://dev.mysql.com/downloads/mysql/
2. Run the installer
3. Choose "Server only" option
4. Keep default port 3306
5. Set root password: `mysql@123` (or remember it)
6. Start MySQL service

**Mac:**
```bash
brew install mysql
brew services start mysql
mysql -u root -p  # No password initially, just press Enter
```

**Linux:**
```bash
sudo apt-get install mysql-server
sudo systemctl start mysql
```

### 1.3 Verify MySQL is Running

```bash
mysql -u root -p  # Password: mysql@123 (or your password)
> EXIT
```

---

## STEP 2: Prepare Database

### 2.1 Create Database and Tables

**Windows (Command Prompt or PowerShell):**
```bash
cd "c:\Users\Admin\OneDrive\Desktop\AI-Powered Error Detection & Escalation System"
mysql -u root -p < database/schema.sql
# When prompted, enter password: mysql@123
```

**Mac/Linux:**
```bash
cd ~/path/to/project
mysql -u root -p < database/schema.sql
# When prompted, enter password
```

### 2.2 Verify Database Created

```bash
mysql -u root -p
> USE error_detection_system;
> SHOW TABLES;
> EXIT
```

Should show 4 tables:
- users
- issues
- notifications
- activity_logs

---

## STEP 3: Setup Environment Variables

✅ **Already created .env files at:**
- `backend/.env` ✓
- `frontend/.env` ✓

To customize, edit these files if needed:

**backend/.env**
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=mysql@123    # Change if your MySQL password is different
DB_NAME=error_detection_system
DB_PORT=3306
PORT=5000
NODE_ENV=development
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
JWT_EXPIRE=7d
ESCALATION_TIME_HOURS=24
```

**frontend/.env**
```
NODE_ENV=development
REACT_APP_API_URL=http://localhost:5000/api
```

---

## STEP 4: Install Dependencies

### Option A: Automatic (Windows)

Double-click: `startup.bat`

This will automatically:
- Check Node.js & MySQL
- Install all dependencies
- Show you the next steps

### Option B: Manual Installation

**Terminal 1 - Install Backend:**
```bash
cd backend
npm install
```

**Terminal 2 - Install Frontend:**
```bash
cd frontend
npm install
```

---

## STEP 5: Start the Application

### You MUST use 2-3 separate terminals!

**Terminal 1 - Start Backend Server:**
```bash
cd backend
npm run dev
```

Expected output:
```
✓ Database connected successfully

    ╔════════════════════════════════════════════════════════════╗
    ║  AI-Powered Error Detection & Escalation System            ║
    ║  Server running on port 5000                               ║
    ║  Environment: development                                  ║
    ╚════════════════════════════════════════════════════════════╝
```

**Terminal 2 - Start Frontend App:**
```bash
cd frontend
npm start
```

Browser will automatically open: `http://localhost:3000`

If not, manually open in browser.

---

## STEP 6: Test the Application

### 6.1 Create Test Account

1. Click "Sign Up"
2. Fill form:
   - **Username**: testuser
   - **Email**: test@example.com
   - **Password**: Test@1234
   - **Confirm Password**: Test@1234
   - **Role**: Employee
3. Click "Sign Up"

### 6.2 Test Features

**As Employee:**
1. Dashboard → See empty issue list
2. Report Issue → Create test issue:
   - Title: "Database Connection Error"
   - Description: "Database is very slow and critical to operations"
   - Category: "Technical"
   - Submit
3. Dashboard → See the issue with AI-assigned priority

**Create Manager Account (for escalation):**
1. Sign Up with:
   - Username: manager
   - Email: manager@example.com
   - Password: Manager@1234
   - Role: Manager
2. Login as manager
3. Dashboard → See ALL issues
4. Try updating issue status/priority (manager controls only)
5. Escalation → View escalation report

---

## STEP 7: Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| **Port 5000 already in use** | `netstat -ano \| findstr :5000` → Kill process or change PORT in .env |
| **Port 3000 already in use** | Change port when asked during frontend startup |
| **MySQL connection refused** | Start MySQL service / Check password in .env |
| **npm: command not found** | Restart terminal / Reinstall Node.js |
| **npm install fails** | Delete node_modules & package-lock.json / Run npm install again |
| **"Cannot find module"** | Run `npm install` in that directory |
| **White screen in browser** | Check browser console for errors (F12) |
| **API calls fail (404)** | Make sure backend is running on port 5000 |

---

## STEP 8: API Testing (Optional)

**Using VS Code REST Client:**

1. Install extension: "REST Client" by Huachao Mao
2. Open: `backend/tests/API_TESTS.rest`
3. Click "Send Request" on any endpoint
4. See response in panel

**Using curl (Command Line):**

```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Signup
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"Test@1234","role":"Employee"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test@1234"}'
```

---

## STEP 9: Stopping the Application

**In each terminal, press:** `Ctrl + C`

Graceful shutdown will occur.

---

## STEP 10: Development Tips

### Change Default Password
Edit: `backend/.env`
```
DB_PASSWORD=your_new_password
```

### View Database
```bash
mysql -u root -p error_detection_system
> SELECT * FROM users;
> SELECT * FROM issues;
```

### Check Server Logs
Backend terminal shows all requests:
```
[2024-05-03T10:30:45.123Z] POST /api/issues
[2024-05-03T10:31:12.456Z] GET /api/issues
```

### Reset Database
```bash
mysql -u root -p < database/schema.sql
```

---

## 🎉 Success Indicators

✅ Backend running on port 5000
✅ Frontend running on port 3000
✅ No red errors in terminals
✅ Can load http://localhost:3000
✅ Can sign up and login
✅ Can create issues
✅ Can see AI-assigned priority

---

## 📞 Troubleshooting Commands

```bash
# Check Node.js
node --version

# Check npm
npm --version

# Check MySQL
mysql --version

# Kill process on port
# Windows:
netstat -ano | findstr :5000
taskkill /PID [PID_NUMBER] /F

# Mac/Linux:
lsof -i :5000
kill -9 [PID_NUMBER]

# Clear npm cache
npm cache clean --force

# Update npm
npm install -g npm@latest
```

---

## 🚀 Ready to Go!

Follow these steps in order and the application will run without errors.

**Questions?** Check `README.md` or `API_DOCUMENTATION.md`

Enjoy! 🎉
