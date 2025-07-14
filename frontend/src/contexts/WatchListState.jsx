import { createContext, useReducer, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import WatchListReducer from "./WatchListReducer";
import { useAuthStore } from "../store/authStore"



const API_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const initialState = {
  watchlist: [],
  watched: [],
};

// create context
export const WatchListContext = createContext(initialState);

// provider component
export const WatchListProvider = ({ children }) => {

  const [state, dispatch] = useReducer(WatchListReducer, initialState);
  const {user} = useAuthStore();
  const userId = user?._id;

  useEffect(() => {
    if (!userId) {
      console.log("No userId yet");
      return
    }
    const fetchData = async () => {    
      try {
        const [watchlistRes, watchedRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/watchlist/${userId}`),
          axios.get(`${API_BASE_URL}/api/watched/${userId}`)
        ]);
        dispatch({ type: "SET_WATCHLIST", payload: Array.isArray(watchlistRes.data?.watchlist) ? watchlistRes.data.watchlist : [] });
        dispatch({ type: "SET_WATCHED", payload: Array.isArray(watchedRes.data?.watched) ? watchedRes.data.watched : [] });
      } catch (err) {
        toast.error("Error fetching watchlist or watched:", err)
        console.error("Error fetching watchlist or watched:", err)
      }  
    };
    fetchData();
  }, [userId]);

  // actions
  const addMovieToWatchlist = async (movie) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/api/watchlist`, { userId, movie });
        dispatch({ type: "ADD_MOVIE_TO_WATCHLIST", payload: movie });
        toast.success("Successfully added to watchlists")
      } catch (err) {
      if (err.response?.status === 409) {
        toast.error("Movie already in watchlist")
        console.error("Add to watchlist error:", err)
      } else {
        toast.error ("Failed to add to watchlist")
      }
    };
  }

  const removeMovieFromWatchlist = async (movieId) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/watchlist/${userId}/${movieId}`);
      dispatch({ type: "REMOVE_MOVIE_FROM_WATCHLIST", payload: movieId });
      toast.success("Successfully removed from watchlists")
    } catch (err) {
      toast.error ("Failed to remove from watchlist")
    }
  };

  const addMovieToWatched = async (movie) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/api/watched`, { userId, movie });
      dispatch({ type: "ADD_MOVIE_TO_WATCHED",  payload: movie });
      toast.success("Successfully added to watched")
    } catch (err) {
      if (err.response?. status === 409) {
        toast.error("Movie already in watched")
        console.error("Add to watched error:", err)
      } else {
        toast.error ("Failed to add to watched")
      }
    };
  };

  const moveToWatchlist = async (movie) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/api/watched/move`, { userId, movie });
      dispatch({ type: "MOVE_TO_WATCHLIST", payload: movie });
      const { message } = res
      toast.success(message)
    } catch (err) {
      if (err.response?. status === 409) {
        toast.error("Movie already in watchlist")
        console.error("Add to watchlist error:", err)
      } else {
        toast.error ("Failed to move to watchlist")
      }
    };
  };

  const removeFromWatched = async (movieId) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/watched/${userId}/${movieId}`);
      dispatch({ type: "REMOVE_FROM_WATCHED", payload: movieId });
      toast.success("Successfully removed from watched")
    } catch (err) {
      toast.error ("Failed to remove from watched")
    }
  };

  return (
    <WatchListContext.Provider
      value={{
        watchlist: state.watchlist,
        watched: state.watched,
        addMovieToWatchlist,
        removeMovieFromWatchlist,
        addMovieToWatched,
        moveToWatchlist,
        removeFromWatched,
      }}
    >
      {children}
    </WatchListContext.Provider>
  );
};