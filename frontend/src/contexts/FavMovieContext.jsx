import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthStore } from "../store/authStore"

const FavMovieContext = createContext();

const API_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

export const FavMovieProvider = ({ children }) => {
  
  const [favorites, setFavorites] = useState([]);
  const [ratingReviews, setRatingReviews] = useState({});

  const {user} = useAuthStore();

  const userId = user?._id;

  useEffect(() => {
    if (userId){
      axios.get(`${API_BASE_URL}/api/favorites/${userId}`)
      .then(res => setFavorites(res.data))
      .catch(err => console.error(err));
    }
  }, [userId]);


  const addToFavorites = async (movie) => {
    await axios.post(`${API_BASE_URL}/api/favorites`, { userId, movie });
    setFavorites(prev => [...prev, movie]);
  };

  const removeFromFavorites = async (movieId) => {
    await axios.delete(`${API_BASE_URL}/api/favorites/${userId}/${movieId}`);
    setFavorites(prev => prev.filter(movie => movie.id !== movieId));
  };

  const isFavorite = (movieId) => {
    return favorites.some(movie => movie.id === movieId)
  }

  const submitRatingReview = async (movieId, rating, review) => {
    const res = await axios.post(`${API_BASE_URL}/api/ratings-reviews`, {
      userId, movieId, rating, review
    });
    setRatingReviews(prev => ({ ...prev, [movieId]: res.data }));
  };

  return (
    <FavMovieContext.Provider value={{ 
      favorites, 
      addToFavorites, 
      removeFromFavorites, 
      isFavorite,
      submitRatingReview
    }}>
      {children}
    </FavMovieContext.Provider>
  );
};

export const useMovieContext = () => useContext(FavMovieContext);
