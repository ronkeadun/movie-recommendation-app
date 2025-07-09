const { searchMovies, getMovieDetails, discoverMovies, fetchMovies } = require('../utils/tmdb');
const Review = require('../models/RatingReview');

exports.search = async (req, res) => {
  try {
    const { query } = req.query;
    const { data } = await searchMovies(query);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: 'Failed to search movies' });
  }
};

exports.details = async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = await getMovieDetails(id);
    const reviews = await Review.find({ movieId: id }).populate('userId', 'username');
    res.status(200).json({ ...data, reviews });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch movie details' });
  }
};

exports.discover = async (req, res) => {
  try {
    const { data } = await discoverMovies(req.query);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: 'Failed to discover movies' });
  }
};

exports.recommend = async (req, res) => {
  try {
    const user = req.user;
    const likedGenres = ['28', '12']; // Placeholder genres
    const { data } = await discoverMovies({ with_genres: likedGenres.join(',') });
    res.status(200).json(data.results.slice(0, 10));
  } catch (err) {
    res.status(500).json({ message: 'Failed to get recommendations' });
  }
};

exports.fetchMovies = async (req, res) => {
  try {
    const { type } = req.params;
    const { data } = await fetchMovies(type);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch movies' });
  }
};