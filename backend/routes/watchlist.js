const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const { addWatchList, getWatchList, deleteWatchList } = require('../controllers/watchListController');


router.post('/', auth, addWatchList);

router.get('/:userId', auth, getWatchList);

router.delete('/:userId/:movieId', auth, deleteWatchList);


module.exports = router;
