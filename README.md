
# 📚 Course Selling Backend

This is the backend server for a Course Selling web application. It is built with **Node.js**, **Express**, and **MongoDB**. It supports multiple user roles like **Admin** and **User**, with secure API routes and JWT-based authentication.

---

## 🔧 Features

- 🧑‍🎓 User registration and login
- 🧑‍💼 Admin login and course management
- 📦 Create, update, delete, and fetch courses
- 🧾 Purchase and view purchased courses
- 🔐 JWT Authentication for secure APIs
- 📁 Organized route structure (User, Admin, Course)
- 🌐 MongoDB integration using Mongoose
- 🧪 Environment variable support using `.env`

---

## 🚀 Getting Started

### 📦 Prerequisites

- Node.js (v14 or later)
- MongoDB (Atlas or local)
- Git

---

### 🛠️ Installation

```bash
# Clone the repo
git clone git@github.com:Prasadsutar1/course-selling-backend.git

# Navigate into the project directory
cd course-selling-backend

# Install dependencies
npm install
```

---

### 🔐 Environment Setup

Create a `.env` file in the root directory:

```env
PORT=5000
DB_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>
JWT_SECRET=your_jwt_secret_key
```

> Make sure your `.env` file is **not committed to GitHub**

---

### ▶️ Running the Server

```bash
# Start the server
node index.js

# or use nodemon for auto-restart
npx nodemon index.js
```

Server will run on:

```
http://localhost:5000
```

---

## 📂 API Routes

### 🧑 User APIs (`/api/v1/user`)

- `POST /signup` – Create user
- `POST /signin` – Login user
- `GET /courses` – View available courses
- `POST /courses/:courseId` – Purchase course
- `GET /purchasedCourses` – View purchased courses

### 🧑‍💼 Admin APIs (`/api/v1/admin`)

- `POST /signup` – Create admin
- `POST /signin` – Login admin
- `POST /courses` – Create a course
- `PUT /courses/:courseId` – Update a course
- `GET /courses` – List all courses

---

## 🧱 Project Structure

```
course-selling-backend/
│
├── middleware/
│   ├── adminmiddleware.js
│   └── usermiddleware.js
│
├── routes/
│   ├── admin.js
│   ├── course.js
│   └── user.js
│
├── db.js
├── index.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

## 🤝 Contributing

Contributions are welcome! Please fork the repo and create a pull request.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## ✨ Author

- [@Prasadsutar1](https://github.com/Prasadsutar1)
