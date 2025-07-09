const express = require('express');
const auth = require('../middleware/auth')
const { addFavorites, getFavorites, deleteFavorites } = require('../controllers/favoriteController');

const router = express.Router();

// Add to favorites
router.post('/', auth, addFavorites);

// Get favorites
router.get('/:userId', auth, getFavorites);

// Delete from favorites
router.delete('/:userId/:movieId', auth, deleteFavorites);


module.exports = router;
