import { useState } from 'react';
import { useMovieContext } from '../contexts/FavMovieContext';

const RatingReview = ({ movieId }) => {
  const { submitRatingReview } = useMovieContext();
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    submitRatingReview(movieId, Number(rating), review);
    setRating('');
    setReview('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ 
      marginTop: '7rem',
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '50%',
      backgroundColor: '#666',
      textAlign: 'center'
    }} className='h-100'>
      <div>
        <label>Rating (1-10): </label>
        <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} min="1" max="10" required />
      </div>
      <div>
        <label className='block mt-10'>Review: </label>
        <textarea className='w-100 h-50 bg-[#333] text-white mt-5  p-2' value={review} onChange={(e) => setReview(e.target.value)} />
      </div>
      <button className='bg-[#e50914] text-white py-2 px-5 rounded text-base hover:opacity-90 cursor-pointer mt-5' type="submit">Submit</button>
    </form>
  );
};

export default RatingReview;
