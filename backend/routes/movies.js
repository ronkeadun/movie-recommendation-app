const express = require('express');
const router = express.Router();
const { searchMovies } = require("../controllers/movieController");

// GET /api/movies/search?title=...&genre=...&year=...
router.get("/search", searchMovies);

module.exports = router;