# 📝 Blogging Platform (FastAPI + SQLite + SQLAlchemy)

This project is a simple yet powerful blogging platform built using **FastAPI**, **SQLite**, and **SQLAlchemy**. It provides user authentication and full blog management features including creating, updating, deleting blogs, and commenting on posts.

---

## 🚀 Tech Stack

* **Backend Framework:** FastAPI
* **Database:** SQLite
* **ORM:** SQLAlchemy
* **Language:** Python
* **Authentication:** JWT (JSON Web Tokens)
* **Validation:** Pydantic

---

## 🔐 Features

### 👤 User Authentication

* User Registration
* User Login
* JWT-based authentication
* Secure password hashing (bcrypt)

---

### 📝 Blog Management (CRUD)

#### Create Blog

* Authenticated users can create blog posts
* Fields: title, content, tags (optional)

#### Read Blogs

* Get all blogs
* Get single blog by ID
* Pagination support (optional)

#### Update Blog

* Only the blog owner can update their posts
* Partial or full update supported

#### Delete Blog

* Only the owner can delete their blog

---

### 💬 Comment System

* Users can comment on blogs
* View all comments under a blog
* Delete own comments (optional rule)
* Each comment linked to:

  * User
  * Blog post

---

## 🧠 Database Models

### User Model

* id
* username
* email
* password_hash
* created_at

### Blog Model

* id
* title
* content
* owner_id (ForeignKey → User)
* created_at
* updated_at

### Comment Model

* id
* text
* user_id (ForeignKey → User)
* blog_id (ForeignKey → Blog)
* created_at

---

## 🔄 API Endpoints Overview

### Auth Routes

* `POST /register` → Register new user
* `POST /login` → Login user & get token

### Blog Routes

* `POST /blogs/` → Create blog
* `GET /blogs/` → Get all blogs
* `GET /blogs/{id}` → Get blog by ID
* `PUT /blogs/{id}` → Update blog
* `DELETE /blogs/{id}` → Delete blog

### Comment Routes

* `POST /blogs/{id}/comments` → Add comment
* `GET /blogs/{id}/comments` → Get comments
* `DELETE /comments/{id}` → Delete comment

---

## 🔐 Authentication Flow

1. User registers
2. User logs in
3. Server returns JWT token
4. Token used in headers:

   ```
   Authorization: Bearer <token>
   ```
5. Protected routes verify token before access

---

## ⚙️ Key Features Summary

✔ FastAPI high-performance backend
✔ SQLite lightweight database
✔ SQLAlchemy ORM for database handling
✔ Secure authentication system (JWT)
✔ Full CRUD for blogs
✔ Comment system on blogs
✔ Clean modular architecture

---

## 📌 Future Improvements

* Like/Dislike system
* Rich text editor for blogs
* Image upload support
* Role-based access (Admin/User)
