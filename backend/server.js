require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const movieRoutes = require("./routes/movies");
const userRoutes = require("./routes/users");
const favoriteRoutes = require("./routes/favorites");
const watchlistRoutes = require("./routes/watchlist");
const watchedRoutes = require("./routes/watched");
const ratingReviewsRoutes = require("./routes/ratingReviews");
const errorHandler = require("./middleware/errorHandler");

const app = express();

/*app.use(
  cors({
    origin: process.env.CLIENT_BASE_URL || "http://localhost:5173",
    credentials: true,
  })
);*/

const allowedOrigins = [
  'http://localhost:5173',
  'https://tairon-movieflix.netlify.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan("tiny"));

const port = process.env.PORT || 5000;

// Root Route
app.get("/", (req, res) => {
  res.status(200).send("Welcome to Movieflix!");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/users", userRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/watchlist", watchlistRoutes);
app.use("/api/watched", watchedRoutes);
app.use("/api/rating-reviews", ratingReviewsRoutes);

// 404 handler for invalid routes
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

// Centralized error handler
app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log("Server running on port", port);
    });
  })
  .catch((err) => {
    console.log({ err });
    process.exit(1);
  });
