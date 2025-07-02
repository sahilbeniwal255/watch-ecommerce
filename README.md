# 🕰️ Herman Watches – Full-Stack E-Commerce App

Welcome to **Herman Watches**, a modern e-commerce platform for luxury timepieces. This is my **first full-stack project**, built using the **MERN stack**, featuring secure authentication, an admin panel, and a clean MVC architecture.

---

## 🧰 Tech Stack

<p align="center">
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white"/>
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/>
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black"/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white"/>
</p>

---

## ✨ Features

### 🛍️ User Side
- Browse watches by category or brand
- Add to cart and wishlist
- Register/Login with JWT-based authentication
- View order history and profile

### 🛠️ Admin Panel
- Add, update, and delete products
- Manage users and orders
- Dashboard with key metrics

---

## 🧱 Project Structure (MVC)
### 🗂️ Project Structure

```text
herman-watches/
├── backend/
│   ├── controllers/       # Business logic (userController.js, productController.js)
│   ├── models/            # MongoDB schemas (User.js, Product.js)
│   ├── routes/            # Express routes (authRoutes.js, productRoutes.js)
│   ├── middleware/        # JWT auth, error handlers
│   ├── config/            # DB connection setup
│   ├── utils/             # Token generators, validators
│   ├── .env               # Environment variables
│   └── server.js          # Backend entry point
│
├── frontend/
│   ├── public/            # Static files (favicon, HTML)
│   ├── src/
│   │   ├── components/    # UI components (Navbar, ProductCard)
│   │   ├── pages/         # Route views (Home, Login, Admin)
│   │   ├── redux/         # State management (store, slices)
│   │   ├── services/      # Axios + API logic
│   │   ├── utils/         # JWT decoding, helpers
│   │   └── App.js         # Main app wrapper
│   └── package.json       # Frontend dependencies
│
├── README.md
├── package.json           # Optional monorepo root config
└── .gitignore
```


---

## 🔐 Authentication

- **JWT** for secure token-based login
- **bcrypt** for password hashing
- Protected routes for both users and admins

---

