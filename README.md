# AI-Powered Error Detection & Escalation System

A complete web application for detecting, classifying, and escalating reported issues using AI-powered NLP classification. Employees can report issues, and the system automatically assigns priority levels. Managers can track, manage, and escalate issues.

## 📋 Features

✅ **User Authentication**
- Secure JWT-based login/signup
- Role-based access (Employee, Manager)
- Password hashing with bcryptjs

✅ **Issue Reporting**
- User-friendly form for reporting issues
- Input validation on frontend and backend
- Support for multiple categories

✅ **AI Classification**
- Automatic priority classification (Low, Medium, High)
- Keyword-based NLP logic
- Category suggestions

✅ **Issue Management**
- Dashboard with filtering and sorting
- Status tracking (Pending, In Progress, Resolved)
- Priority management

✅ **Escalation System**
- Automatic detection of issues pending > 24 hours
- Manager view of escalated issues
- Real-time escalation alerts

✅ **Security & Error Handling**
- Input validation and sanitization
- SQL injection prevention
- Comprehensive error handling
- Secure password management

## 🏗️ Project Structure

```
AI-Powered Error Detection & Escalation System/
├── backend/                          # Express.js backend
│   ├── src/
│   │   ├── server.js                # Main server file
│   │   ├── config/
│   │   │   ├── database.js          # MySQL connection
│   │   │   └── jwt.js               # JWT configuration
│   │   ├── controllers/
│   │   │   ├── authController.js    # Auth logic
│   │   │   └── issueController.js   # Issue logic
│   │   ├── models/
│   │   │   ├── User.js              # User database operations
│   │   │   └── Issue.js             # Issue database operations
│   │   ├── middleware/
│   │   │   ├── auth.js              # Authentication middleware
│   │   │   └── errorHandler.js      # Error handling
│   │   ├── routes/
│   │   │   ├── authRoutes.js        # Auth endpoints
│   │   │   └── issueRoutes.js       # Issue endpoints
│   │   └── utils/
│   │       ├── aiClassifier.js      # AI classification logic
│   │       └── validators.js        # Input validation
│   ├── tests/
│   │   └── API_TESTS.rest           # API test cases
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
│
├── frontend/                         # React.js frontend
│   ├── src/
│   │   ├── App.js                   # Main app component
│   │   ├── index.js                 # Entry point
│   │   ├── components/
│   │   │   ├── Navigation.js        # Navigation bar
│   │   │   ├── Navigation.css
│   │   │   ├── IssueCard.js         # Issue card component
│   │   │   ├── IssueCard.css
│   │   │   ├── ProtectedRoute.js    # Route protection
│   │   ├── pages/
│   │   │   ├── Login.js             # Login page
│   │   │   ├── Signup.js            # Signup page
│   │   │   ├── Auth.css             # Auth styles
│   │   │   ├── Dashboard.js         # Main dashboard
│   │   │   ├── Dashboard.css
│   │   │   ├── ReportIssue.js       # Report issue page
│   │   │   ├── ReportIssue.css
│   │   │   ├── Escalation.js        # Escalation report
│   │   │   └── Escalation.css
│   │   ├── services/
│   │   │   └── api.js               # API calls
│   │   ├── utils/
│   │   │   ├── authUtils.js         # Auth utilities
│   │   │   └── validators.js        # Validation utilities
│   │   ├── styles/
│   │   │   └── global.css           # Global styles
│   │   └── public/
│   │       └── index.html
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
│
└── database/
    └── schema.sql                   # MySQL schema

```

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm (comes with Node.js)
- Git

### Step 1: Clone or Download the Project

```bash
cd "AI-Powered Error Detection & Escalation System"
```

### Step 2: Setup MySQL Database

1. **Start MySQL server**
   ```bash
   # On Windows (if installed)
   net start MySQL80
   
   # On Mac
   brew services start mysql
   
   # On Linux
   sudo service mysql start
   ```

2. **Login to MySQL**
   ```bash
   mysql -u root -p
   ```

3. **Create the database**
   ```bash
   # Run the schema file
   mysql -u root -p < database/schema.sql
   
   # OR manually:
   CREATE DATABASE error_detection_system;
   ```

4. **Verify database creation**
   ```bash
   mysql -u root -p -e "SHOW DATABASES;"
   ```

### Step 3: Setup Backend

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env file** (copy from .env.example)
   ```bash
   # On Windows
   copy .env.example .env
   
   # On Mac/Linux
   cp .env.example .env
   ```

4. **Update .env file with your MySQL credentials**
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=error_detection_system
   DB_PORT=3306
   PORT=5000
   NODE_ENV=development
   JWT_SECRET=your_super_secret_jwt_key_change_this
   ESCALATION_TIME_HOURS=24
   ```

5. **Start the backend server**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # OR production mode
   npm start
   ```

   You should see:
   ```
   ╔════════════════════════════════════════════════════════════╗
   ║  AI-Powered Error Detection & Escalation System            ║
   ║  Server running on port 5000                               ║
   ║  Environment: development                                   ║
   ╚════════════════════════════════════════════════════════════╝
   ```

### Step 4: Setup Frontend

1. **Open a new terminal and navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env file** (copy from .env.example)
   ```bash
   # On Windows
   copy .env.example .env
   
   # On Mac/Linux
   cp .env.example .env
   ```

4. **Start the frontend development server**
   ```bash
   npm start
   ```

   The app will open at `http://localhost:3000`

## 📱 Usage Guide

### First Time Setup

1. **Create an Account**
   - Go to signup page
   - Choose role: Employee or Manager
   - Fill in credentials
   - Password must contain: uppercase, lowercase, number, special character

2. **Login**
   - Use your credentials to login
   - JWT token is automatically saved

### For Employees

1. **Report an Issue**
   - Click "Report Issue" in navigation
   - Fill in title, description, category
   - System automatically classifies priority
   - Submit

2. **View Your Issues**
   - Go to Dashboard
   - See all your reported issues
   - Filter by status or priority
   - Track issue progress

### For Managers

1. **View All Issues**
   - Dashboard shows all issues from all employees
   - Filter by status, priority, category

2. **Manage Issues**
   - Click issue to view details
   - Change status (Pending → In Progress → Resolved)
   - Update priority manually
   - Delete resolved issues

3. **Check Escalation Report**
   - Click "Escalation Report"
   - See issues pending for > 24 hours
   - Prioritize and address them
   - Statistics of escalated issues

## 🔐 Security Features

- ✅ JWT-based authentication
- ✅ Password hashing with bcryptjs (10 salt rounds)
- ✅ Input validation on both frontend and backend
- ✅ SQL injection prevention
- ✅ CORS enabled
- ✅ Helmet.js for security headers
- ✅ Protected routes
- ✅ Role-based access control

## 🧪 Testing APIs

Use the provided [API_TESTS.rest](./backend/tests/API_TESTS.rest) file with:
- VS Code REST Client extension
- Postman
- Insomnia

**Sample Request:**
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "TestPass123!"
}
```

## 📊 AI Classification Logic

The system uses keyword-based NLP to classify issues:

**High Priority Keywords:**
- critical, urgent, down, crash, error, failed, security, breach, cannot, unable...

**Medium Priority Keywords:**
- slow, issue, problem, performance, lag, bug, incorrect, wrong...

**Low Priority Keywords:**
- question, info, documentation, enhancement, suggestion, typo...

Priority is determined by counting keyword occurrences in title, description, and category.

## 🗄️ Database Schema

### Users Table
- `id` - Primary key
- `username` - Unique username
- `email` - Unique email
- `password` - Hashed password
- `role` - Employee or Manager
- `created_at`, `updated_at` - Timestamps

### Issues Table
- `id` - Primary key
- `user_id` - Foreign key to users
- `title` - Issue title
- `description` - Detailed description
- `category` - Issue category
- `priority` - Low, Medium, High
- `status` - Pending, In Progress, Resolved
- `created_at`, `updated_at` - Timestamps

### Additional Tables
- `notifications` - For future notifications
- `activity_logs` - For audit trail

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get current user (Protected)
- `POST /api/auth/verify` - Verify token

### Issues
- `POST /api/issues` - Create issue (Protected)
- `GET /api/issues` - Get all issues (Protected)
- `GET /api/issues/:id` - Get single issue (Protected)
- `PATCH /api/issues/:id/status` - Update status (Protected, Manager only)
- `PATCH /api/issues/:id/priority` - Update priority (Protected, Manager only)
- `GET /api/issues/escalation/report` - Get escalation report (Protected, Manager only)
- `DELETE /api/issues/:id` - Delete issue (Protected)

## 🐛 Error Handling

The application handles:
- ✅ Invalid input validation
- ✅ Database connection errors
- ✅ Authentication failures
- ✅ Authorization violations
- ✅ Not found errors
- ✅ Server errors

All errors return user-friendly messages.

## 📈 Performance Optimizations

- Database indexing on frequently queried columns
- Connection pooling for MySQL
- Pagination for issue lists
- JWT token validation
- Error logging for debugging

## 🚨 Troubleshooting

**MySQL Connection Error:**
```
Error: connect ECONNREFUSED 127.0.0.1:3306
```
- Check if MySQL server is running
- Verify .env credentials
- Check DB_HOST and DB_PORT

**Port Already in Use:**
```
Error: listen EADDRINUSE :::5000
```
- Change PORT in .env
- Or kill process using port: `lsof -ti:5000 | xargs kill -9`

**Token Expired:**
- Clear localStorage
- Login again

**CORS Errors:**
- Ensure backend is running on port 5000
- Check proxy setting in frontend package.json

## 📝 Sample Test Accounts

After running schema.sql, you can create test accounts:

```bash
# Signup as Employee
POST http://localhost:5000/api/auth/signup
{
  "username": "employee_test",
  "email": "employee@test.com",
  "password": "TestPass123!",
  "role": "Employee"
}

# Signup as Manager
POST http://localhost:5000/api/auth/signup
{
  "username": "manager_test",
  "email": "manager@test.com",
  "password": "TestPass123!",
  "role": "Manager"
}
```

## 📚 Technologies Used

### Backend
- Express.js - Web framework
- MySQL2 - Database driver
- bcryptjs - Password hashing
- JWT - Authentication
- Helmet - Security headers
- CORS - Cross-origin requests

### Frontend
- React 18 - UI library
- React Router - Navigation
- Axios - HTTP client
- CSS3 - Styling

## 🤝 Contributing

To add features:
1. Create a new branch
2. Make changes
3. Test thoroughly
4. Submit for review

## 📞 Support

For issues or questions:
1. Check [API_TESTS.rest](./backend/tests/API_TESTS.rest) for examples
2. Review database schema in [schema.sql](./database/schema.sql)
3. Check error messages in console logs
4. Verify all environment variables are set

## ⚖️ License

This project is provided as-is for educational and professional use.

## 🎉 Getting Started Quick Summary

```bash
# Terminal 1 - Backend
cd backend
npm install
# Create .env and add your MySQL credentials
npm run dev

# Terminal 2 - Frontend
cd frontend
npm install
# Create .env with API_URL
npm start

# Terminal 3 - MySQL (if not running as service)
mysql -u root -p
# Run: mysql -u root -p < database/schema.sql
```

Then open `http://localhost:3000` and start using the system!


Built with ❤️ for efficient error management
