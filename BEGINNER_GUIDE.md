# DETAILED SETUP GUIDE FOR BEGINNERS

Complete step-by-step instructions with explanations.

## What is This Project?

An **AI-Powered Error Detection & Escalation System** that:
- Allows employees to report issues
- Automatically classifies issue priority using AI
- Lets managers track and manage issues
- Alerts when issues are pending too long

## What Do I Need?

### Software (All Free)

1. **Node.js** - JavaScript runtime
   - Download: https://nodejs.org/
   - Version: v14.0 or higher
   - Includes npm (package manager)

2. **MySQL** - Database server
   - Download: https://www.mysql.com/downloads/
   - Version: 5.7 or higher
   - Community Edition is free

3. **Text Editor** (Optional but recommended)
   - VS Code: https://code.visualstudio.com/
   - Or any text editor you prefer

## Installation Instructions

### Part 1: Install Node.js

1. Go to https://nodejs.org/
2. Download **LTS (Long Term Support)** version
3. Run the installer
4. Click **Next** until installation completes
5. Verify installation:
   ```bash
   node --version
   npm --version
   ```
   Both should show version numbers

### Part 2: Install MySQL

1. Go to https://www.mysql.com/downloads/
2. Download **MySQL Community Server**
3. Run the installer
4. Choose **Server Machine** configuration
5. Configure MySQL server:
   - Port: **3306** (default)
   - Config Type: Development Computer
   - MySQL Root Password: Remember this!
6. Complete installation

#### Verify MySQL Installation

**Windows:**
1. Open Command Prompt (Windows key → type "cmd")
2. Type: `mysql --version`
3. Should show version number

**Mac/Linux:**
1. Open Terminal
2. Type: `mysql --version`
3. Should show version number

### Part 3: Download Project Files

1. Download the project folder
2. Extract to a location (e.g., Desktop)
3. The folder should contain:
   - `backend/` folder
   - `frontend/` folder
   - `database/` folder
   - `README.md` file

### Part 4: Create Database

1. Open Command Prompt/Terminal
2. Go to project folder: `cd "AI-Powered Error Detection & Escalation System"`
3. Run database schema:
   ```bash
   mysql -u root -p < database/schema.sql
   ```
4. Enter your MySQL root password
5. Wait for completion (no error messages = success)

**What just happened:**
- Created a new database called `error_detection_system`
- Created tables for users and issues
- Database is ready to use

### Part 5: Setup Backend

**In Command Prompt/Terminal:**

```bash
# Step 1: Go to backend folder
cd backend

# Step 2: Install dependencies
npm install
```
This takes 2-3 minutes. Wait for it to complete.

**Step 3: Create configuration file**

- **Windows**: `copy .env.example .env`
- **Mac/Linux**: `cp .env.example .env`

**Step 4: Edit .env file**

1. Open `.env` file with any text editor
2. Find this line:
   ```
   DB_PASSWORD=your_mysql_password
   ```
3. Replace `your_mysql_password` with your MySQL password
4. Save file (Ctrl+S)

Example:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=MyPassword123
DB_NAME=error_detection_system
```

**Step 5: Start backend server**

In Command Prompt/Terminal (in backend folder):
```bash
npm run dev
```

**Expected output:**
```
✓ Database connected successfully
╔════════════════════════════════════════════════════════════╗
║  AI-Powered Error Detection & Escalation System            ║
║  Server running on port 5000                               ║
║  Environment: development                                   ║
╚════════════════════════════════════════════════════════════╝
```

✅ **Backend is running!** Don't close this window.

### Part 6: Setup Frontend

**Open a NEW Command Prompt/Terminal window:**

```bash
# Step 1: Go to frontend folder (from project root)
cd frontend

# Step 2: Install dependencies
npm install
```
This takes 2-3 minutes. Wait for completion.

**Step 3: Create configuration file**

- **Windows**: `copy .env.example .env`
- **Mac/Linux**: `cp .env.example .env`

**Step 4: Start frontend server**

```bash
npm start
```

**Expected:**
- Automatic browser opens at `http://localhost:3000`
- If not, manually open browser and go to `http://localhost:3000`

✅ **Frontend is running!**

## Using the System

### First Time: Create Account

1. **Click "Sign Up"** button
2. Fill in the form:
   - **Username**: `testuser` (3-20 characters)
   - **Email**: `test@example.com`
   - **Password**: `TestPass123!`
     - Must have: uppercase, lowercase, number, special character (@$!%*?&)
   - **Role**: Select "Employee"
3. Click **Sign Up** button
4. You're logged in! ✅

### As Employee: Report Issue

1. Click **Report Issue** in navigation
2. Fill the form:
   - **Title**: "Login button not working" (5-200 chars)
   - **Description**: "The login button is broken on the homepage" (10-2000 chars)
   - **Category**: Select one (Bug, Feature Request, etc.)
3. Click **Report Issue**
4. **Priority is automatically assigned!** (Low, Medium, or High)
5. See your issue on the dashboard

### As Manager: Manage Issues

1. Create second account with role "Manager"
2. Login with manager account
3. **Dashboard** now shows ALL issues from all employees
4. Click any issue to expand it
5. Change status: Pending → In Progress → Resolved
6. Change priority: Low/Medium/High
7. Click **Escalation Report** to see issues pending > 24 hours

## Common Tasks

### Change MySQL Password

1. Open Command Prompt/Terminal
2. Run: `mysql -u root -p`
3. Enter old password
4. Run: `ALTER USER 'root'@'localhost' IDENTIFIED BY 'newpassword';`
5. Run: `FLUSH PRIVILEGES;`
6. Update `.env` file with new password

### Clear All Data

1. Stop both servers (Ctrl+C in terminals)
2. Run: `mysql -u root -p < database/schema.sql`
3. Enter password
4. Confirm
5. All data is cleared, database recreated

### Can't Connect to MySQL

**Error message:**
```
Error: connect ECONNREFUSED 127.0.0.1:3306
```

**Solution:**

1. Check if MySQL is running
2. Start MySQL service:
   - **Windows**: Open Services (services.msc), find MySQL, click Start
   - **Mac**: Run `brew services start mysql`
   - **Linux**: Run `sudo service mysql start`
3. Try again

### Port Already in Use

**Error message:**
```
Error: listen EADDRINUSE :::5000
```

**Solution:**

1. Another app is using port 5000
2. Kill it: `lsof -ti:5000 | xargs kill -9`
3. Or change PORT in `.env` file (backend)
4. Restart backend

### Forgot Password

You can't reset it in this system. Solution:
1. Create new account with different email
2. Or delete old account from database (advanced)

## Project Structure Explained

```
Project Root/
├── backend/              ← Server code (Node.js/Express)
│   ├── src/
│   │   ├── server.js    ← Main server file
│   │   ├── controllers/ ← Business logic
│   │   ├── models/      ← Database operations
│   │   ├── routes/      ← API endpoints
│   │   └── utils/       ← Helper functions
│   ├── package.json     ← Dependencies list
│   └── .env             ← Configuration (secret)
│
├── frontend/             ← Web app (React)
│   ├── src/
│   │   ├── pages/       ← Web pages
│   │   ├── components/  ← Reusable parts
│   │   └── services/    ← API calls
│   ├── package.json     ← Dependencies list
│   └── .env             ← Configuration
│
├── database/
│   └── schema.sql       ← Database setup
│
└── README.md            ← Full documentation
```

## How AI Priority Works

System reads the issue title and description, looking for keywords:

**High Priority Keywords:**
- critical, urgent, crash, error, security, breach, unable, cannot...

**Medium Priority Keywords:**
- bug, slow, performance, incorrect, issue, problem, lag...

**Low Priority Keywords:**
- question, suggestion, documentation, enhancement, typo...

If more high-priority keywords found → **High priority**
Otherwise → Based on medium/low count

**Example:**
- Title: "System crash when saving"
- Contains: "crash" → HIGH priority
- Automatically assigned ✅

## Testing the APIs

For advanced users, test APIs using:

1. **VS Code REST Client Extension**
   - Install extension
   - Open `backend/tests/API_TESTS.rest`
   - Click "Send Request"

2. **curl command:**
   ```bash
   curl -X POST http://localhost:5000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"TestPass123!"}'
   ```

3. **Postman:**
   - Download Postman
   - Create requests manually
   - Test each endpoint

## Security Notes

🔒 **Your data is safe because:**
- Passwords are hashed (bcryptjs)
- Login uses JWT tokens
- Input is validated
- SQL injection prevented
- HTTPS headers included

⚠️ **For production:**
- Change JWT_SECRET in .env
- Use HTTPS
- Setup proper database backups
- Add rate limiting
- Use environment-specific configs

## File Permissions

If you get permission errors:

**On Mac/Linux:**
```bash
chmod +x backend/src/server.js
chmod +x frontend/src/index.js
```

## Running on Different Port

Want to use port 8000 instead of 5000?

**Edit backend/.env:**
```
PORT=8000
```

Want to use port 3001 instead of 3000?

**Edit frontend/.env:**
```
REACT_APP_API_URL=http://localhost:8000/api
```

## Keyboard Shortcuts

- **Ctrl+C** - Stop running server
- **Ctrl+D** - Exit terminal
- **Ctrl+L** - Clear terminal
- **F5** - Refresh browser
- **Ctrl+Shift+Esc** - Open Task Manager (kill processes)

## Getting Help

1. **Check the logs** - Error messages tell you what's wrong
2. **Google the error** - Most errors have solutions online
3. **Read the README.md** - Full documentation there
4. **Check API_DOCUMENTATION.md** - API reference

## Checklist

Before starting:
- [ ] Node.js installed
- [ ] MySQL installed and running
- [ ] Project folder downloaded
- [ ] Database created (schema.sql run)
- [ ] Backend .env created with password
- [ ] Frontend .env created
- [ ] Backend started (npm run dev)
- [ ] Frontend started (npm start)
- [ ] Browser opened to http://localhost:3000
- [ ] Test account created

## Next Steps

1. ✅ Get system running (this guide)
2. ✅ Create test accounts
3. ✅ Report some sample issues
4. ✅ Test manager features
5. ✅ Read full README.md
6. ✅ Explore API_DOCUMENTATION.md
7. ✅ Customize for your needs
8. ✅ Deploy to production

---

## Quick Reference

| Task | Command |
|------|---------|
| Start backend | `cd backend && npm run dev` |
| Start frontend | `cd frontend && npm start` |
| Install deps | `npm install` |
| Run database | `mysql -u root -p < database/schema.sql` |
| Stop server | `Ctrl+C` |
| Check Node | `node --version` |
| Check MySQL | `mysql --version` |
| Check npm | `npm --version` |

## Troubleshooting Checklist

**Backend won't start?**
- [ ] Is MySQL running?
- [ ] Is .env file created?
- [ ] Is MySQL password correct in .env?
- [ ] Did you run schema.sql?

**Frontend won't start?**
- [ ] Is backend running on port 5000?
- [ ] Is .env file created?
- [ ] Are dependencies installed (npm install done)?

**Can't login?**
- [ ] Did you create account first (Sign Up)?
- [ ] Is password correct?
- [ ] Is email correct?

---

**🎉 You're ready to use the system!**

For any issues, check README.md or API_DOCUMENTATION.md

**Happy error detection! 🚀**
