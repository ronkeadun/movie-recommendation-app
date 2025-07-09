const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

const tmdb = axios.create({
  baseURL: TMDB_BASE_URL,
  params: { api_key: TMDB_API_KEY }
});

exports.searchMovies = (query) => tmdb.get('/search/movie', { params: { query } });
exports.getMovieDetails = (id) => tmdb.get(`/movie/${id}`, {
  params: { append_to_response: 'videos,credits,recommendations' }
});
exports.discoverMovies = (filters) => tmdb.get('/discover/movie', { params: { ...filters } });

exports.fetchMovies = (type) => tmdb.get(`/movie/${type}`, { params: {type} });