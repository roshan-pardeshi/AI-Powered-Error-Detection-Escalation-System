# API Documentation

Complete API reference for the Error Detection & Escalation System.

## Base URL

```
http://localhost:5000/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

---

## Authentication Endpoints

### 1. Sign Up

**Endpoint:** `POST /auth/signup`

**Public:** Yes

**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "role": "Employee"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "userId": 1,
      "username": "john_doe",
      "email": "john@example.com",
      "role": "Employee"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Validation Rules:**
- Username: 3-20 characters, alphanumeric + underscore
- Email: Valid email format
- Password: Min 8 chars, must contain uppercase, lowercase, number, special char
- Role: Employee or Manager

**Error Responses:**
- `400` - Validation error or user already exists
- `500` - Server error

---

### 2. Login

**Endpoint:** `POST /auth/login`

**Public:** Yes

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "userId": 1,
      "username": "john_doe",
      "email": "john@example.com",
      "role": "Employee"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Responses:**
- `400` - Missing required fields
- `401` - Invalid credentials
- `500` - Server error

---

### 3. Get Profile

**Endpoint:** `GET /auth/profile`

**Protected:** Yes (Requires valid JWT)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "role": "Employee",
    "created_at": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Responses:**
- `401` - Invalid or expired token
- `404` - User not found
- `500` - Server error

---

### 4. Verify Token

**Endpoint:** `POST /auth/verify`

**Public:** Yes

**Request Body:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "valid": true,
    "user": {
      "id": 1,
      "username": "john_doe",
      "email": "john@example.com",
      "role": "Employee",
      "created_at": "2024-01-15T10:30:00.000Z"
    }
  }
}
```

**Error Responses:**
- `401` - Invalid token

---

## Issue Endpoints

### 1. Create Issue

**Endpoint:** `POST /issues`

**Protected:** Yes (Employee and Manager)

**Request Body:**
```json
{
  "title": "Login page crashes on Safari",
  "description": "When I try to log in from Safari browser, the page crashes and I get a white screen. This is critical as it prevents me from accessing the system.",
  "category": "Bug"
}
```

**Query Parameters:** None

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Issue reported successfully",
  "data": {
    "issueId": 1,
    "userId": 1,
    "title": "Login page crashes on Safari",
    "description": "When I try to log in...",
    "category": "Bug",
    "priority": "High",
    "status": "Pending",
    "aiClassification": {
      "priority": "High",
      "suggestedCategory": "Bug"
    }
  }
}
```

**Validation:**
- Title: 5-200 characters
- Description: 10-2000 characters
- Category: One of the predefined categories

**Error Responses:**
- `400` - Validation error
- `401` - Unauthorized
- `500` - Server error

---

### 2. Get All Issues

**Endpoint:** `GET /issues`

**Protected:** Yes

**Query Parameters:**
```
GET /issues?status=Pending&priority=High&category=Bug&sortBy=created_at&page=1&limit=10
```

| Parameter | Type | Optional | Values |
|-----------|------|----------|--------|
| status | string | Yes | Pending, In Progress, Resolved |
| priority | string | Yes | Low, Medium, High |
| category | string | Yes | Bug, Feature Request, Performance, UI/UX, Database, Security, Documentation, Other |
| sortBy | string | Yes | created_at, priority, status, updated_at |
| page | number | Yes | Default: 1 |
| limit | number | Yes | Default: 10 |

**Notes:**
- Employees only see their own issues
- Managers see all issues

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "issues": [
      {
        "id": 1,
        "user_id": 1,
        "title": "Login page crashes",
        "description": "...",
        "category": "Bug",
        "priority": "High",
        "status": "Pending",
        "created_at": "2024-01-15T10:30:00.000Z",
        "updated_at": "2024-01-15T10:30:00.000Z",
        "username": "john_doe",
        "email": "john@example.com"
      }
    ],
    "total": 1,
    "pages": 1,
    "currentPage": 1
  }
}
```

**Error Responses:**
- `401` - Unauthorized
- `500` - Server error

---

### 3. Get Single Issue

**Endpoint:** `GET /issues/:issueId`

**Protected:** Yes

**Path Parameters:**
```
:issueId - The ID of the issue to retrieve
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "user_id": 1,
    "title": "Login page crashes",
    "description": "...",
    "category": "Bug",
    "priority": "High",
    "status": "Pending",
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T10:30:00.000Z",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

**Error Responses:**
- `403` - Forbidden (Employee trying to view another employee's issue)
- `404` - Issue not found
- `401` - Unauthorized
- `500` - Server error

---

### 4. Update Issue Status

**Endpoint:** `PATCH /issues/:issueId/status`

**Protected:** Yes (Manager only)

**Path Parameters:**
```
:issueId - The ID of the issue to update
```

**Request Body:**
```json
{
  "status": "In Progress"
}
```

**Valid Status Values:**
- Pending
- In Progress
- Resolved

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Issue status updated successfully",
  "data": {
    "id": 1,
    "status": "In Progress",
    "updated_at": "2024-01-15T11:00:00.000Z",
    ...
  }
}
```

**Error Responses:**
- `400` - Invalid status
- `403` - Only managers can update status
- `404` - Issue not found
- `401` - Unauthorized
- `500` - Server error

---

### 5. Update Issue Priority

**Endpoint:** `PATCH /issues/:issueId/priority`

**Protected:** Yes (Manager only)

**Path Parameters:**
```
:issueId - The ID of the issue to update
```

**Request Body:**
```json
{
  "priority": "High"
}
```

**Valid Priority Values:**
- Low
- Medium
- High

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Issue priority updated successfully",
  "data": {
    "id": 1,
    "priority": "High",
    "updated_at": "2024-01-15T11:00:00.000Z",
    ...
  }
}
```

**Error Responses:**
- `400` - Invalid priority
- `403` - Only managers can update priority
- `404` - Issue not found
- `401` - Unauthorized
- `500` - Server error

---

### 6. Get Escalation Report

**Endpoint:** `GET /issues/escalation/report`

**Protected:** Yes (Manager only)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "escalationThreshold": "24 hours",
    "count": 2,
    "issues": [
      {
        "id": 1,
        "title": "Login page crashes",
        "description": "...",
        "priority": "High",
        "status": "Pending",
        "created_at": "2024-01-14T08:00:00.000Z",
        "updated_at": "2024-01-15T11:00:00.000Z",
        "username": "john_doe",
        "email": "john@example.com",
        "category": "Bug",
        "user_id": 1
      }
    ]
  }
}
```

**Notes:**
- Only shows issues with status "Pending" that were created > 24 hours ago
- Escalation threshold is configurable in .env (ESCALATION_TIME_HOURS)

**Error Responses:**
- `403` - Only managers can view escalation report
- `401` - Unauthorized
- `500` - Server error

---

### 7. Delete Issue

**Endpoint:** `DELETE /issues/:issueId`

**Protected:** Yes

**Path Parameters:**
```
:issueId - The ID of the issue to delete
```

**Notes:**
- Employees can only delete their own issues
- Managers can delete any issue

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Issue deleted successfully"
}
```

**Error Responses:**
- `403` - Forbidden (Employee trying to delete another employee's issue)
- `404` - Issue not found
- `401` - Unauthorized
- `500` - Server error

---

## Error Response Format

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error description"
}
```

### Common HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource successfully created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Invalid/missing token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 500 | Server Error - Internal server error |

---

## Rate Limiting

Currently, no rate limiting is implemented. For production, consider adding:
- Request rate limiting per IP
- Per-user rate limits
- JWT token expiration limits

---

## CORS Configuration

Cross-Origin requests are enabled for:
- `http://localhost:3000` (development)

For production, update CORS settings in `backend/src/server.js`

---

## Testing

Use the following tools to test APIs:
1. **VS Code REST Client** - Use files in `backend/tests/`
2. **Postman** - Import the requests
3. **Insomnia** - Import the requests
4. **curl** - Command line testing

Example curl request:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"TestPass123!"}'
```

---

## Response Headers

All responses include:
```
Content-Type: application/json
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
```

---

## Token Expiration

JWT tokens expire after **7 days** (configurable in .env as JWT_EXPIRE).

After expiration:
- Frontend should redirect to login
- Use `/auth/verify` to check token validity

---

## Pagination

List endpoints support pagination:

```
GET /issues?page=2&limit=20
```

Response includes:
- `total` - Total number of items
- `pages` - Total number of pages
- `currentPage` - Current page number

---

## Version

Current API Version: **1.0.0**

For version history and breaking changes, check CHANGELOG.md

---

**Last Updated:** January 2024
