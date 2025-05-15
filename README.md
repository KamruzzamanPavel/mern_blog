# MERN Blog

A modern and secure full-stack blogging platform built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js), featuring **Firebase Authentication** with support for **Google Sign-In**.

---

## ✨ Features

- 🔐 **Secure Authentication via Firebase**:

  - Email/password registration & login
  - **Google OAuth 2.0 login**
  - Firebase-managed user sessions and token verification

- 📝 **Blog Management**:

  - Create, edit, delete, and view posts

- 💾 **MongoDB Database** for storing blogs
- 🌐 **Express.js REST API** for backend operations
- ⚛️ **React Frontend** with Tailwind CSS styling
- 🔄 **Responsive Design** for all devices

---

## 🔐 Secure Login & Registration

- Powered by **Firebase Authentication**.
- Supports:

  - Email/password registration
  - **Google login** (OAuth 2.0)

- Backend uses Firebase Admin SDK to verify ID tokens and authorize users.
- No passwords are stored on the server — Firebase handles all authentication securely.

---

## 📁 Project Structure

```
mern_blog/
├── client/             # React frontend (Firebase Auth integrated)
├── server/             # Node.js + Express backend (Firebase Admin SDK)
├── .env                # Environment variables
└── README.md           # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js & npm
- MongoDB (local or Atlas)
- Firebase Project with:

  - Enabled Email/Password and Google Sign-in
  - Web API Key and Project ID

### 1. Clone the repository

```bash
git clone https://github.com/KamruzzamanPavel/mern_blog.git
cd mern_blog
```

### 2. Set up Firebase

- Go to [Firebase Console](https://console.firebase.google.com/)
- Create a project and enable **Email/Password** and **Google Sign-In**
- Get your **Web API Key**, **Project ID**, and **Service Account Key JSON**

### 3. Configure `.env` files

#### In `client/.env`:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

#### In `server/.env`:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
FIREBASE_PROJECT_ID=your_project_id
GOOGLE_APPLICATION_CREDENTIALS=./path/to/your-service-account.json
```

> ⚠️ Make sure to **add `service-account.json` to `.gitignore`**

---

### 4. Install dependencies

#### Backend:

```bash
cd server
npm install
```

#### Frontend:

```bash
cd ../client
npm install
```

---

### 5. Run the project

```bash
# Start the backend
cd server
npm start
```

```bash
# Start the frontend
cd ../client
npm start
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 🔑 Google Login Example

The login page includes a **"Continue with Google"** button. On success:

1. Firebase issues an ID token.
2. The token is sent to the Express backend for verification via Firebase Admin SDK.
3. The user is authenticated and authorized to perform actions.

---

## 🧩 Tech Stack

- **Frontend**: React, Tailwind CSS, Firebase Auth
- **Backend**: Node.js, Express.js, Firebase Admin SDK
- **Database**: MongoDB (via Mongoose)
- **Authentication**: Firebase Email/Password, Google OAuth

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---
