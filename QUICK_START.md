# QUICK START GUIDE

Get the system up and running in 5 minutes!

## Prerequisites
- Node.js (v14+)
- MySQL Server
- Git (optional)

## Step 1: Download MySQL Schema

Copy and run in MySQL:
```sql
mysql -u root -p < database/schema.sql
```

## Step 2: Start Backend (Terminal 1)

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MySQL password
npm run dev
```

Expected output:
```
✓ Database connected successfully
Server running on port 5000
```

## Step 3: Start Frontend (Terminal 2)

```bash
cd frontend
npm install
cp .env.example .env
npm start
```

Browser opens at `http://localhost:3000`

## Step 4: Create Test Account

1. Click **Sign Up**
2. Enter details:
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `TestPass123!` (must have uppercase, lowercase, number, special char)
   - Role: `Employee`
3. Click **Sign Up**

## Step 5: Test Features

### Report an Issue
1. Click **Report Issue**
2. Title: `Login button not working`
3. Description: `The login button is broken and prevents me from accessing the system`
4. Category: `Bug`
5. Submit → Priority auto-classified as **High**

### View Dashboard
1. Click **Dashboard**
2. See your reported issue
3. Filter by priority/status

### Create Manager Account
1. Logout (click your name → Logout)
2. Sign up with role = **Manager**
3. Go to Dashboard → See all employees' issues
4. Click on an issue → Change status/priority
5. Go to **Escalation Report** → See issues pending > 24 hours

## Troubleshooting

| Problem | Solution |
|---------|----------|
| MySQL error | Start MySQL service: `net start MySQL80` (Windows) or `brew services start mysql` (Mac) |
| Port 5000 in use | Kill process: `lsof -ti:5000 \| xargs kill -9` |
| Password validation fails | Use: `TestPass123!` (uppercase, lowercase, number, special) |
| Login fails | Check email/password, ensure account exists |
| Blank dashboard | Refresh page (F5) |

## File Locations

- **Backend**: `backend/src/server.js`
- **Frontend**: `frontend/src/App.js`
- **Database**: `database/schema.sql`
- **API Tests**: `backend/tests/API_TESTS.rest`
- **API Docs**: `API_DOCUMENTATION.md`

## Key Credentials

```
MySQL:
  Username: root
  Password: (whatever you set)

Test Employee Account:
  Email: test@example.com
  Password: TestPass123!
  Role: Employee

Test Manager Account:
  Email: manager@example.com
  Password: TestPass123!
  Role: Manager
```

## What to Try Next

1. **Report multiple issues** with different content
2. **Login as Manager** and update issue statuses
3. **Check Escalation Report** (won't show issues < 24 hours old)
4. **Filter issues** by priority and status
5. **Change issue priority** (Manager only)
6. **Delete old issues**

## API Endpoint Examples

Test with curl:

```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"TestPass123!"}'

# Create Issue
curl -X POST http://localhost:5000/api/issues \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"title":"Test","description":"Test description","category":"Bug"}'

# Get Issues
curl -X GET http://localhost:5000/api/issues \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Features Summary

✅ User signup/login with JWT
✅ Report issues with AI priority classification
✅ View dashboard with filters
✅ Manager can update status/priority
✅ Auto-escalation detection (24+ hours)
✅ Input validation
✅ Error handling
✅ Secure passwords

## Need Help?

1. Check `README.md` for detailed documentation
2. Check `API_DOCUMENTATION.md` for API reference
3. Review `backend/tests/API_TESTS.rest` for examples
4. Check console logs for error messages

---

**You're all set! Start reporting issues now! 🚀**
