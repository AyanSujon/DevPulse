# DevPulse API Documentation


**Version:** 1.0.0  
**Base API:** https://devpulse-api-delta.vercel.app  
**Project Repository:** https://github.com/AyanSujon/DevPulse  
**Developer:** Ayan Sujon  
**Website:** https://www.ayansujon.com  
**LinkedIn:** https://www.linkedin.com/in/ayan-sujon/


---

## Table of Contents

1. [Base Information](#base-information)
2. [Authentication](#authentication)
3. [API Endpoints](#api-endpoints)
   - [Health Check](#health-check)
   - [Authentication Endpoints](#authentication-endpoints)
   - [User Endpoints](#user-endpoints)
   - [Issue Endpoints](#issue-endpoints)
4. [Error Handling](#error-handling)
5. [Response Format](#response-format)

---
## 🚀 DevPulse Project Overview

DevPulse is a RESTful backend API built for managing software issues in a collaborative development environment. It provides a structured system for reporting, tracking, updating, and resolving bugs and feature requests with role-based access control and secure authentication.

## 🎯 Project Purpose

DevPulse is designed to act as a lightweight issue tracking system for development teams. It allows contributors to report issues and maintainers to manage the full lifecycle of those issues, ensuring smooth collaboration between users and project maintainers.

## 🏗️ Core Features

### 🔐 Authentication & Security
- JWT-based authentication system
- Secure user registration and login
- Role-based access control:
  - **Contributor** → create and update own issues (limited access)
  - **Maintainer** → full access (update & delete any issue)

---

## Base Information

- **Base URL:** `http://localhost:{PORT}/api`
- **Port:** Configured via `PORT` environment variable
- **CORS Origin:** Configured via `CORS_ORIGIN` environment variable
- **Content-Type:** `application/json`

---

## Authentication

### JWT Token-Based Authentication

The API uses **JWT (JSON Web Token)** for authentication. Protected endpoints require a valid JWT token in the `Authorization` header.

#### Token Format

```
Authorization: <JWT_TOKEN>
```

#### Token Payload

The JWT token contains the following information:

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "user@example.com",
  "role": "contributor",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

#### Token Expiration

- **Expires In:** 1 day

#### User Roles

- **`contributor`** - Can create and update their own open issues
- **`maintainer`** - Can manage all issues (update, delete)

---

## API Endpoints

### Health Check

#### Get Health Status

```
GET /
```

**Description:** Returns the health status and information about the DevPulse server.

**Request:**
```bash
curl http://localhost:3000/
```

**Response (200 OK):**
```json
{
  "message": "DevPulse Server is listening",
  "projectName": "DevPulse",
  "version": "1.0.0",
  "developer": "Ayan Sujon",
  "website": "https://www.ayansujon.com",
  "Linkedin": "https://www.linkedin.com/in/ayansujon/"
}
```

---

### Authentication Endpoints

#### User Signup

```
POST /api/auth/signup
```

**Description:** Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "role": "contributor"
}
```

**Request Parameters:**
| Parameter | Type   | Required | Description                                |
|-----------|--------|----------|---------------------------------------------|
| name      | string | Yes      | User's full name                            |
| email     | string | Yes      | User's email address                        |
| password  | string | Yes      | User's password (will be hashed with bcrypt) |
| role      | string | No       | User role: `contributor` or `maintainer`    |

**Response (201 Created):**
```json
{
  "statusCode": 201,
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "contributor",
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  }
}
```

**Error Response (500 Internal Server Error):**
```json
{
  "statusCode": 500,
  "success": false,
  "message": "Error message describing the issue",
  "error": {},
  "data": null
}
```

---

#### User Login

```
POST /api/auth/login
```

**Description:** Login to the system and receive a JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Request Parameters:**
| Parameter | Type   | Required | Description         |
|-----------|--------|----------|---------------------|
| email     | string | Yes      | User's email address |
| password  | string | Yes      | User's password      |

**Response (200 OK):**
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "contributor",
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    }
  }
}
```

**Error Response (500 Internal Server Error):**
```json
{
  "statusCode": 500,
  "success": false,
  "message": "Invalid Credentials: User not found",
  "error": {},
  "data": null
}
```

---

### User Endpoints

#### User endpoints are currently only used for signup, which is listed under Authentication Endpoints

---

### Issue Endpoints

#### Create Issue

```
POST /api/issues
```

**Description:** Create a new issue. Requires authentication with `contributor` or `maintainer` role.

**Authentication:** Required (JWT Token)

**Request Body:**
```json
{
  "title": "Login button not working",
  "description": "The login button on the homepage is not responding to clicks",
  "type": "bug"
}
```

**Request Parameters:**
| Parameter   | Type   | Required | Description                          |
|-------------|--------|----------|--------------------------------------|
| title       | string | Yes      | Issue title                          |
| description | string | Yes      | Detailed description of the issue    |
| type        | string | Yes      | Issue type: `bug` or `feature_request` |

**Response (201 Created):**
```json
{
  "statusCode": 201,
  "success": true,
  "message": "Issue created successfully",
  "data": {
    "id": 1,
    "title": "Login button not working",
    "description": "The login button on the homepage is not responding to clicks",
    "type": "bug",
    "status": "open",
    "reporter_id": 1,
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  }
}
```

**Error Responses:**

- **401 Unauthorized** - Missing or invalid JWT token:
```json
{
  "statusCode": 401,
  "success": false,
  "message": "Unauthorized access!!"
}
```

- **403 Forbidden** - User doesn't have required role:
```json
{
  "statusCode": 403,
  "success": false,
  "message": "Forbidden access!!"
}
```

---

#### Get All Issues

```
GET /api/issues
```

**Description:** Retrieve all issues with optional filtering and sorting. No authentication required.

**Query Parameters:**

| Parameter | Type   | Required | Description                                           | Default  |
|-----------|--------|----------|-------------------------------------------------------|----------|
| sort      | string | No       | Sort order: `newest` or `oldest`                     | `newest` |
| type      | string | No       | Filter by type: `bug` or `feature_request`           | N/A      |
| status    | string | No       | Filter by status: `open`, `in_progress`, or `resolved` | N/A      |

**Example Requests:**

```bash
# Get all issues sorted by newest (default)
GET /api/issues

# Get all bugs
GET /api/issues?type=bug

# Get all open issues sorted by oldest
GET /api/issues?sort=oldest&status=open

# Get all feature requests with open status
GET /api/issues?type=feature_request&status=open

# Get all in_progress issues sorted by oldest
GET /api/issues?sort=oldest&status=in_progress
```

**Response (200 OK):**
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Issues fetched successfully",
  "data": [
    {
      "id": 1,
      "title": "Login button not working",
      "description": "The login button on the homepage is not responding to clicks",
      "type": "bug",
      "status": "open",
      "reporter": {
        "id": 1,
        "name": "John Doe",
        "role": "contributor"
      },
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    },
    {
      "id": 2,
      "title": "Add dark mode support",
      "description": "Users are requesting a dark mode option for better usability",
      "type": "feature_request",
      "status": "in_progress",
      "reporter": {
        "id": 2,
        "name": "Jane Smith",
        "role": "maintainer"
      },
      "created_at": "2024-01-14T09:15:00Z",
      "updated_at": "2024-01-15T14:22:00Z"
    }
  ]
}
```

**Empty Response (200 OK):**
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Issues fetched successfully",
  "data": []
}
```

---

#### Get Single Issue

```
GET /api/issues/:id
```

**Description:** Retrieve a single issue by its ID. No authentication required.

**Path Parameters:**
| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| id        | number | Yes      | Issue ID    |

**Example Request:**
```bash
GET /api/issues/1
```

**Response (200 OK):**
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Issue retrieved successfully",
  "data": {
    "id": 1,
    "title": "Login button not working",
    "description": "The login button on the homepage is not responding to clicks",
    "type": "bug",
    "status": "open",
    "reporter": {
      "id": 1,
      "name": "John Doe",
      "role": "contributor"
    },
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "statusCode": 404,
  "success": false,
  "message": "Issue not found",
  "data": null
}
```

---

#### Update Issue

```
PATCH /api/issues/:id
```

**Description:** Update an existing issue. Requires authentication with `contributor` or `maintainer` role.

**Authentication:** Required (JWT Token)

**Path Parameters:**
| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| id        | number | Yes      | Issue ID    |

**Request Body:** (all fields are optional)
```json
{
  "title": "Updated issue title",
  "description": "Updated description",
  "type": "feature_request",
  "status": "in_progress"
}
```

**Request Parameters:**
| Parameter   | Type   | Required | Description                               |
|-------------|--------|----------|-------------------------------------------|
| title       | string | No       | Updated issue title                       |
| description | string | No       | Updated description                       |
| type        | string | No       | Updated type: `bug` or `feature_request`  |
| status      | string | No       | Updated status: `open`, `in_progress`, or `resolved` |

**Access Control Rules:**
- **Maintainer Role:** Can update any issue
- **Contributor Role:** Can only update their own issues AND only if the status is `open`

**Response (200 OK):**
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Issue updated successfully",
  "data": {
    "id": 1,
    "title": "Updated issue title",
    "description": "Updated description",
    "type": "feature_request",
    "status": "in_progress",
    "reporter_id": 1,
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T15:45:00Z"
  }
}
```

**Error Responses:**

- **401 Unauthorized** - Missing or invalid JWT token:
```json
{
  "statusCode": 401,
  "success": false,
  "message": "Unauthorized access!!"
}
```

- **403 Forbidden** - User lacks permission (not owner or not open status):
```json
{
  "statusCode": 403,
  "success": false,
  "message": "Contributors can only update their own open issues"
}
```

- **404 Not Found** - Issue doesn't exist:
```json
{
  "statusCode": 404,
  "success": false,
  "message": "Issue not found",
  "data": null
}
```

---

#### Delete Issue

```
DELETE /api/issues/:id
```

**Description:** Delete an existing issue. Requires authentication with `maintainer` role only.

**Authentication:** Required (JWT Token - `maintainer` only)

**Path Parameters:**
| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| id        | number | Yes      | Issue ID    |

**Example Request:**
```bash
DELETE /api/issues/1
Authorization: <JWT_TOKEN>
```

**Response (200 OK):**
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Issue deleted successfully",
  "data": {}
}
```

**Error Responses:**

- **401 Unauthorized** - Missing or invalid JWT token:
```json
{
  "statusCode": 401,
  "success": false,
  "message": "Unauthorized access!!"
}
```

- **403 Forbidden** - User doesn't have `maintainer` role:
```json
{
  "statusCode": 403,
  "success": false,
  "message": "Forbidden access!!"
}
```

- **404 Not Found** - Issue doesn't exist:
```json
{
  "statusCode": 404,
  "success": false,
  "message": "Issue not found",
  "data": null
}
```

---

## Error Handling

The API uses HTTP status codes to indicate the success or failure of an API request.

### HTTP Status Codes

| Code | Status           | Description                                      |
|------|------------------|--------------------------------------------------|
| 200  | OK               | Request succeeded                                |
| 201  | Created          | Resource successfully created                    |
| 400  | Bad Request      | Invalid request parameters or malformed request  |
| 401  | Unauthorized     | Missing or invalid authentication token          |
| 403  | Forbidden        | Authenticated but lacks required permissions     |
| 404  | Not Found        | Resource not found                               |
| 500  | Server Error     | Internal server error                            |

### Error Response Format

All errors follow this standard format:

```json
{
  "statusCode": 500,
  "success": false,
  "message": "Error description",
  "error": {},
  "data": null
}
```

---

## Response Format

### Success Response Format

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Success message",
  "data": {}
}
```

### Standard Data Types

#### Issue Object
```json
{
  "id": 1,
  "title": "string",
  "description": "string",
  "type": "bug" | "feature_request",
  "status": "open" | "in_progress" | "resolved",
  "reporter": {
    "id": 1,
    "name": "string",
    "role": "contributor" | "maintainer"
  },
  "created_at": "ISO 8601 timestamp",
  "updated_at": "ISO 8601 timestamp"
}
```

#### User Object
```json
{
  "id": 1,
  "name": "string",
  "email": "string",
  "role": "contributor" | "maintainer",
  "created_at": "ISO 8601 timestamp",
  "updated_at": "ISO 8601 timestamp"
}
```

---

## Quick Reference

### Authentication Flow

1. **Register** - `POST /api/auth/signup` with user details
2. **Login** - `POST /api/auth/login` to get JWT token
3. **Use Token** - Include token in `Authorization` header for protected endpoints

### Issue Workflow

1. **Create** - `POST /api/issues` (requires auth: contributor/maintainer)
2. **List** - `GET /api/issues` (public, supports filtering/sorting)
3. **View** - `GET /api/issues/:id` (public)
4. **Update** - `PATCH /api/issues/:id` (requires auth, role-based access control)
5. **Delete** - `DELETE /api/issues/:id` (requires auth: maintainer only)

---

## Example Usage

### Example: Complete Issue Management Workflow

```bash
# 1. Register a user
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "contributor"
  }'

# 2. Login to get token
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'

# Response contains token - save it for next requests
# TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# 3. Create an issue (requires token)
curl -X POST http://localhost:3000/api/issues \
  -H "Content-Type: application/json" \
  -H "Authorization: $TOKEN" \
  -d '{
    "title": "Login button not working",
    "description": "The login button is unresponsive",
    "type": "bug"
  }'

# 4. Get all open bugs
curl http://localhost:3000/api/issues?type=bug&status=open

# 5. Get a specific issue
curl http://localhost:3000/api/issues/1

# 6. Update an issue (requires token)
curl -X PATCH http://localhost:3000/api/issues/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: $TOKEN" \
  -d '{
    "status": "in_progress"
  }'

# 7. Delete an issue (requires maintainer token)
curl -X DELETE http://localhost:3000/api/issues/1 \
  -H "Authorization: $TOKEN"
```


## 🧠 Summary

DevPulse is a secure, scalable issue tracking REST API that enables structured collaboration between developers and maintainers using JWT authentication, role-based permissions, and a clean modular architecture.

---

## Notes

- All timestamps are in ISO 8601 format
- Password is automatically hashed using bcrypt before storage
- JWT tokens expire after 1 day
- CORS is configured and enabled for specified origins
- The API validates all input and returns descriptive error messages
