const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();
const TMDB_KEY = process.env.TMDB_API_KEY;

// Simple English genre name → TMDB ID map
const genreMap = {
  action: 28, adventure: 12, animation: 16, comedy: 35, crime: 80,
  documentary: 99, drama: 18, family: 10751, fantasy: 14, history: 36,
  horror: 27, music: 10402, mystery: 9648, romance: 10749, scifi: 878,
  "sci-fi": 878, thriller: 53, war: 10752, western: 37,
};

exports.searchMovies = async (req, res) => {
  try {
    let { title = "", genre = "", year = "" } = req.query;
    title = title.trim();
    genre = genre.trim().toLowerCase();
    year  = year.trim();

    const gid = genreMap[genre];

    // helper to build query string
    const build = (base, obj) => base + Object.entries(obj)
      .filter(([,v]) => v !== undefined && v !== "")
      .map(([k,v]) => `&${k}=${encodeURIComponent(v)}`)
      .join("");

    let results = [];

    if (title) {
      // use -> /search/movie
      const url = build(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_KEY}`, {
        query: title,
        year
      });
      const { data } = await axios.get(url);
      results = data.results || [];
      if (gid) results = results.filter(m => m.genre_ids.includes(gid));
    } else {
      // no title use -> /discover/movie
      const url = build(`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_KEY}&sort_by=popularity.desc`, {
        with_genres: gid,
        primary_release_year: year
      });
      const { data } = await axios.get(url);
      results = data.results || [];
    }

    res.json(Array.isArray(results) ? results.slice(0,20) : []);
  } catch (err) {
    console.error("searchMovies error:", err.message);
    res.status(500).json({ message: "Search failed" });
  }
};