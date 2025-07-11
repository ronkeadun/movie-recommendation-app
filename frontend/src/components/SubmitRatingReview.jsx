import { useState } from 'react';
import axios from "axios";
import { useAuthStore } from "../store/authStore";

const API_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const SubmitRatingReview = ({ movieId, onSuccess }) => {
  
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user } = useAuthStore(); 
  const userId = user?._id;
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await axios.post(`${API_BASE_URL}/api/rating-reviews`,
        { userId, movieId, rating: Number(rating), review },
        { withCredentials: true } // important for cookie-based auth
      );
      // clear form and notify parent
      setRating("");
      setReview("");
      onSuccess?.(); // trigger refresh callback
    } catch (err) {
      const errMessage = err.response?.dada?.message || "Failed to submit review. Please try again."
      console.error(errMessage);
      setError(errMessage);
    } finally {
      setLoading(false);
    }
  };

  // block unauthenticated users
  if (!user) {
    return (
      <div className="text-center text-gray-600 mb-4">
        Please log in to submit a rating and review.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ 
      marginTop: '7rem',
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: '70%',
      backgroundColor: '#666',
      textAlign: 'center'
    }} className='h-100 shadow rounded-lg'>

      <h3 className="text-lg font-semibold mb-3">Leave a Rating and Review</h3>

      {error && <div className="text-red-600 mb-2">{error}</div>}

      
      <label className="block mb-2">
        <span className="text-sm font-medium">Rating (1-10): </span>
        <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} min="1" max="10" required 
          className="border rounded px-3 py-2 mt-1"
        />
      </label>
    
      <label className='block mb-4'> 
        <span className="text-sm font-medium">Your Review: </span>
        <textarea className='w-full bg-[#333] text-white mt-5 p-2' rows="4" required value={review} onChange={(e) => setReview(e.target.value)} />
      </label>
      <button className='bg-[#e50914] text-white py-2 px-5 rounded text-base hover:opacity-90 cursor-pointer mt-5' type="submit"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
};

export default SubmitRatingReview;
