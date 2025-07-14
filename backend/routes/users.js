const express = require('express');
const auth = require('../middleware/auth');
const { getProfile, updateProfile, getReviews } = require('../controllers/userController');

const router = express.Router();

router.get('/reviews', auth, getReviews);

router.get('/profile', auth, getProfile);

router.put('/profile', auth, updateProfile);

module.exports = router;
