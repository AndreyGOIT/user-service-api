# User Service API

## 📌 Description

Simple REST API for user management with authentication and role-based access control.

## 🚀 Tech Stack

- Node.js
- Express
- TypeScript
- Prisma (SQLite)
- JWT authentication
- Zod validation

## ⚙️ Setup

```bash
npm install
npx prisma migrate dev
npm run dev
```

## 📎 Base URL

http://localhost:3000

## 🔑 Authorization

Use header:
Authorization: Bearer <token>

### Register

POST /auth/register

#### Example request

```json
{
  "fullName": "Ivan Ivanov",
  "birthDate": "1990-01-01",
  "email": "ivan@example.com",
  "password": "123456"
}
```

#### Example response

```json
{
  "id": "...",
  "email": "ivan@example.com"
}
```

### Login

POST /auth/login

#### Example request

```json
{
  "email": "ivan@example.com",
  "password": "123456"
}
```

#### Example response

```json
{
  "token": "..."
}
```

## 👤 Users

### Get user by id

GET /users/:id
Access: admin or owner

### Get all users

GET /users
Access: admin only

### Block user

PATCH /users/:id/block
Access: admin or owner

## 🧪 Notes

- Passwords are hashed with bcrypt
- JWT is used for authentication
- Role-based access control is implemented
