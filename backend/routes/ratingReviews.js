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
  body('rating').isInt({min:1, max: 10}).withMessage('Rating must be an integer 1- 10').toInt(),
  body('review').optional().isString()
], validate, addReview);

router.put('/:reviewId', auth, updateReview);
router.patch('/:reviewId', auth, updateReview);
router.delete('/:reviewId', auth, deleteReview);

module.exports = router;
