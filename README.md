# 🎬 Movie Recommendation App Overview

A full-featured movie recommendation web application that allows users to discover, search, browse, rate, review, and manage personalized movie lists including favorites, watchlists, and watched movies. Built for modern movie enthusiasts who want a tailored and interactive movie browsing experience.

---

## 🌐 Live Demo

🔗 **Frontend**: [Deployed on Netlify](https://tairon-movieflix.netlify.app)  
🔗 **Backend**: [Hosted on Render ](https://movie-recommendation-app-0xjr.onrender.com)

---

## 📦 Features

### 🧑‍💼 User Features

- **Authentication**: Register and login with JWT-based authentication using cookies.
- **Profile Management**: View and manage your personal profile, including saved movies and reviews.
- **Favorites & Watchlists**: Add/remove movies to/from favorites and watchlists with instant feedback (toast notifications).
- **Watched Movies**: Track movies you've already seen.
- **Movie Reviews & Ratings**: Post, update, and delete reviews with star ratings.

### 🔎 Movie Search & Discovery

- **Search by Title/Genre/Year**: Intelligent movie search with dynamic query filters.
- **Filter & Sort**: Filter and sort movies by rating, popularity, and release date.
- **View Movie Details**: View detailed movie information and get recommended movies on every movie details viewed.
- **Personalized Recommendation**: Get mood-based `AI recommendations` using `Gemini AI`.
- **Watch Movie Trailers**: TMDB API and movie trailer integration.
- **Popular & Trending Movies**: Browse top-rated and popular titles pulled from external TMDB API.

### ⚙️ Admin/Backend Capabilities

- **RESTful API** built with Express and MongoDB.
- **Middleware** for error handling and authentication.
- **Validation** with express-validator to ensure data integrity.
- **Scalable architecture** with separated concerns for controllers, routes, and models.

---

## 🧰 Tech Stack

### Frontend:

- **React.js + Vite**
- **Tailwind CSS** for styling
- **Zustand** for global state management
- **Axios** for API communication
- **React Router** for routing
- **Lucide Icons** & **react-hot-toast** for enhanced UI/UX

### Backend:

- **Node.js + Express.js**
- **MongoDB + Mongoose**
- **JWT (Cookies-based)** Authentication
- **Express Validator** for data validation
- **CORS, dotenv** for security and configuration

---

## 🔐 Authentication & Security

- Uses **HttpOnly Cookies** for token-based authentication (JWT).
- Supports `SameSite=None; Secure` for cross-site cookie access over HTTPS.
- Protected routes via `authMiddleware`.

---

## 🚀 Installation & Setup

### 📁 Folder Structure

```
movie-recommendation-app/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── contexts/
│   │   └── App.jsx
│   └── index.html
```

### 🔧 Prerequisites

- Node.js & npm
- MongoDB (local or Atlas)
- TMDB API Key

### 📁 Get Project Folder

```bash
# Clone the repository
git clone https://github.com/ronkeadun/movie-recommendation-app.git
cd movie-recommendation-app
```

### 🔨 Backend Setup

```bash
cd backend
cp .env.example .env
# Fill in your MongoDB URI, JWT secret, etc.
npm install
npm run dev
```

### 🎨 Frontend Setup

```bash
cd frontend
cp .env.example .env
# Set REACT_APP_API_BASE_URL (e.g., http://localhost:5000/api)
npm install
npm run dev
```

---

## 🧪 API Testing with Postman

You can test all backend API endpoints using **Postman** or any similar API client. Below is a list of key routes, sample payloads, and testing guidelines.

---

### 🧑‍💼 Auth Routes

#### ✅ Register (Signup)

- **POST** `/api/auth/signup`
- **Body (JSON)**:

```json
{
  "username": "johndoe",
  "email": "johndoe@example.com",
  "password": "securePassword123"
}
```

#### 🔓 Login

- **POST** `/api/auth/login`
- **Body (JSON)**:

```json
{
  "email": "johndoe@example.com",
  "password": "securePassword123"
}
```

- ✅ On success, an HTTP-only cookie with JWT will be set.

#### 🚪 Logout

- **POST** `/api/auth/logout`

---

### 👤 User Profile

#### 🔐 Get Current User Info

- **GET** `/api/users/profile`
- Requires: Auth cookie (set after login)

---

### 🎬 Movie Routes

#### 🔍 Search Movies

- **GET** `/api/movies/search?title=inception&genre=Action&year=2010`

---

### ❤️ Favorites

#### ➕ Add to Favorites

- **POST** `/api/favorites`

#### ❌ Remove from Favorites

- **DELETE** `/api/favorites/:userId/:movieId`

#### 📄 Get User Favorites

- **GET** `/api/favorites/:userId`

---

### 👁️‍🗨️ Watchlist

#### ➕ Add to Watchlist

- **POST** `/api/watchlist`

#### ❌ Remove from Watchlist

- **DELETE** `/api/watchlist/:userId/:movieId`

#### 📄 Get Watchlist

- **GET** `/api/watchlist/:userId`

---

### ✅ Watched Movies

#### ➕ Add to Watched

- **POST** `/api/watched`

#### ❌ Remove from Watched

- **DELETE** `/api/watched/:userId/:movieId`

#### 📄 Get Watched Movies

- **GET** `/api/watched/:userId`

---

### 💬 Reviews & Ratings

#### ➕ Submit Review

- **POST** `/api/rating-reviews`
- **Body (JSON)**:

```json
{
  "userId": "66261f9f5a4e34d3c0a31a7e",
  "movieId": 123,
  "rating": 7,
  "review": "Excellent movie with great visuals!"
}
```

#### ✏️ Update Review

- **PUT** `/api/rating-reviews/:reviewId`
- **Body (JSON)**:

```json
{
  "rating": 4,
  "review": "Great movie, just a bit long."
}
```

#### ❌ Delete Review

- **DELETE** `/api/rating-reviews/:reviewId`

#### 📄 Get All Reviews by User

- **GET** `/api/users/reviews`

---

## 🧪 Notes API for Testing

- Make sure the backend server is running at `http://localhost:5000/` (or your deployed backend URL).
- Enable **cookies** in Postman to handle JWT authentication.
- Test **protected routes** after successful login.
- Use environment variables in Postman for dynamic base URLs and tokens if needed.

## 🧪 Frontend Testing

- Frontend user flows manually tested for:
  - Signup/Login
  - Adding/removing favorites and watchlist
  - Submitting/editing/deleting reviews
  - Filtering and sorting movies

---

## 📂 Environment Variables

### Backend `.env`

```
PORT=5000
MONGODB_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
TMDB_API_KEY=your_tmdb_api_key
NODE_ENV=development
```

### Frontend `.env`

```
VITE_SERVER_BASE_URL=http://localhost:5000
VITE_GOOGLE_GENAI_API_KEY=your_genai_api_key
```

For production, use `.env.production` and host-sensitive values securely.

---

## 🛡️ Deployment

- **Frontend**: Deployable on Netlify or Vercel.
- **Backend**: Compatible with Render, Railway, Cyclic, or your preferred Node host.

---

## 🧼 Code Quality

- Responsive, user-friendly interface (built with React + Tailwind CSS)
- Clean project structure with separation of concerns.

---

## 🙌 Contributing

Feel free to fork and enhance this app! PRs are welcome.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
© 2025 Aderonke Fadare
