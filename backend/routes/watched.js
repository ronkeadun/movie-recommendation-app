const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const { addWatched, getWatched, deleteWatched, moveWatched } = require('../controllers/watchedController');


router.post('/', auth, addWatched);

router.get('/:userId', auth, getWatched);

router.delete('/:userId/:movieId', auth, deleteWatched );

//Move from watchlist to watched
router.post('/move', auth, moveWatched);

module.exports = router;