const mongoose = require('mongoose');
const RatingReview = require('../models/RatingReview');

exports.addReview = async (req, res) => {
  const { userId, movieId, rating, review } = req.body;
  try {
    const ratingReview = new RatingReview({
      userId,
      movieId,
      rating,
      review
    });
    await ratingReview.save();
    res.status(201).json(ratingReview);
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ message: 'Failed to submit review' });
  }
};

exports.getReviews = async (req, res) => {
  try {
    const reviews = await RatingReview.find({ movieId: req.params.movieId }).populate('userId', 'username');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get reviews' });
  }
};

exports.updateReview = async (req, res) => {
  const { reviewId } = req.params;
  const { rating, review } = req.body;
  try{
    const ratingReview = await RatingReview.findByIdAndUpdate(reviewId, { rating, review }, { new: true });
    res.json(ratingReview);
  }catch (err) {
    res.status(500).json({ message: 'Failed to update reviews' });
  }
};

/*exports.deleteReview = async (req, res) => {
  const { reviewId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(reviewId)){
    return res.status(400).json({message: 'Invalid review ID'})
  }
  try {
    const ratingReview = await RatingReview.findById(reviewId);
    if (!ratingReview) return res.status(404).json({ message: 'Review not found' });
    if (ratingReview.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' }); // ensures only the owner can delete
    }
    await ratingReview.deleteOne();
    res.json({ message: 'Review deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}; */


/*exports.deleteReview = async (req, res, next) => {
  const { reviewId } = req.params;

  if (!reviewId || !mongoose.Types.ObjectId.isValid(reviewId)) {
    return res.status(400).json({ message: 'Invalid review ID' });
  }

  try {
    // one atomic query: must match both id *and* owner
    const result = await RatingReview.deleteOne({
      _id: reviewId,
      userId: req.user._id.toString()           // enforces ownership
    });

    if (result.deletedCount === 0) {
      // Either the doc never existed *or* the user didn’t own it
      return res.status(404).json({ message: 'Review not found' });
      // ‑‑ or 403 if you prefer to reveal existence
    }

    return res.status(204).end();     // 204 No Content
  } catch (err) {
    console.error('Error deleting review:', err);
    return next(err);                 // lets your global handler set 500
  }
};*/


exports.deleteReview = async (req, res) => {
  const { reviewId } = req.params;

  // Validate ObjectId format
  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    return res.status(400).json({ message: 'Invalid review ID' });
  }

  try {
    const deletedReview = await RatingReview.findByIdAndDelete(reviewId);
    if (!deletedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }

    return res.status(200).json({ message: 'Review deleted successfully' });
  } catch (err) {
    console.error('Error deleting review:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
