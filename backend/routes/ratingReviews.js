const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const auth = require('../middleware/auth');
const {validate} = require('../validators/validatorMiddlewares');
const {
  getReviews,
  addReview,
  updateReview,
  deleteReview
} = require('../controllers/ratingReviewController');

router.get('/:movieId', getReviews);

router.post('/', auth, [
  body('movieId').notEmpty().withMessage('Movie ID is required'),
  body('rating').isNumeric().withMessage('Rating must be a number'),
  body('comment').optional().isString()
], validate, addReview);

router.put('/:reviewId', auth, updateReview);
router.patch('/:reviewId', auth, updateReview);
router.delete('/:reviewId', auth, deleteReview);

module.exports = router;



/*
router.post('/', auth, addReview);
router.get('/:movieId', getReviews);*/
