const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { search, details, discover, recommend, fetchMovies } = require('../controllers/movieController');

router.get('/search', search);
router.get('/discover', discover);
router.get('/recommend', auth, recommend);
router.get('/:id', details);
router.get('/:type', fetchMovies);

module.exports = router;