# 🤖 AI-Powered Error Detection & Escalation System

An AI-powered web application that automatically detects, classifies, and prioritizes reported issues using keyword-based NLP. Employees can report issues, while managers can monitor, manage, and escalate unresolved issues.

---

## 🚀 Features

- 🔐 JWT Authentication
- 👥 Role-Based Access (Employee & Manager)
- 🤖 AI-Based Priority Classification
- 📝 Issue Reporting & Tracking
- 📊 Manager Dashboard
- 🚨 Automatic Issue Escalation
- 🔍 Search & Filter Issues
- 🛡️ Secure Password Hashing
- ⚡ REST API Integration

---

## 🛠️ Tech Stack

### Frontend
- React.js
- CSS3
- Axios

### Backend
- Node.js
- Express.js
- JWT
- bcryptjs

### Database
- MySQL

---

## 📂 Project Structure

```
AI-Powered Error Detection & Escalation System/
│
├── frontend/
├── backend/
├── database/
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd AI-Powered-Error-Detection-Escalation-System
```

### 2. Install Backend

```bash
cd backend
npm install
npm run dev
```

### 3. Install Frontend

```bash
cd frontend
npm install
npm start
```

### 4. Configure Environment Variables

Create a `.env` file inside the **backend** folder.

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=error_detection_system
PORT=5000
JWT_SECRET=your_secret_key
```

---

## 📡 API Endpoints

| Method | Endpoint |
|---------|----------|
| POST | `/api/auth/signup` |
| POST | `/api/auth/login` |
| GET | `/api/issues` |
| POST | `/api/issues` |
| PATCH | `/api/issues/:id/status` |

---

## 🎯 Key Features

- User Authentication
- AI Priority Detection
- Issue Management
- Status Tracking
- Automatic Escalation
- Secure REST APIs
- Responsive UI

---

## 📸 Screenshots

Add your project screenshots here.

---

## 🔮 Future Improvements

- Email Notifications
- AI Model Integration
- File Attachments
- Analytics Dashboard
- Real-time Notifications

---

## 👨‍💻 Author

**Roshan Pardeshi**

GitHub: https://github.com/yourusername

---

⭐ If you like this project, please give it a Star!
