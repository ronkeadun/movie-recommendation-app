import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from "react-hot-toast";
import { useAuthStore } from "../store/authStore"

const FavMovieContext = createContext();

const API_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

export const FavMovieProvider = ({ children }) => {
  
  const [favorites, setFavorites] = useState([]);

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
    try {
      await axios.post(`${API_BASE_URL}/api/favorites`, { userId, movie });
      setFavorites(prev => [...prev, movie]);
      toast.success("Successfully added to favorites")
    } catch (error) {
      toast.error ("Failed to add to favorites")
    }
  };

  const removeFromFavorites = async (movieId) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/favorites/${userId}/${movieId}`);
      setFavorites(prev => prev.filter(movie => movie.id !== movieId));
      toast.success("Successfully removed from favorites")
    } catch (error) {
      toast.error ("Failed to remove from favorites")
    }
  };

  const isFavorite = (movieId) => {
    return favorites.some(movie => movie.id === movieId)
  }

  return (
    <FavMovieContext.Provider value={{ 
      favorites, 
      addToFavorites, 
      removeFromFavorites, 
      isFavorite
    }}>
      {children}
    </FavMovieContext.Provider>
  );
};

export const useMovieContext = () => useContext(FavMovieContext);
