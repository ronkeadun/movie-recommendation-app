import { createContext, useReducer, useEffect } from "react";
import axios from "axios";
import WatchListReducer from "./WatchListReducer";
import { useAuthStore } from "../store/authStore"



const API_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const initialState = {
  watchlist: [],
  watched: [],
};

// create context
export const WatchListContext = createContext(initialState);

// provider components
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
        console.log("Got watchlist:", watchlistRes.data)
        dispatch({ type: "SET_WATCHLIST", payload: Array.isArray(watchlistRes.data?.watchlist) ? watchlistRes.data.watchlist : [] });
        dispatch({ type: "SET_WATCHED", payload: Array.isArray(watchedRes.data?.watched) ? watchedRes.data.watched : [] });
      } catch (err) {
        console.error("Error fetching watchlist or watched:", err)
      }  
    };
    fetchData();
  }, [userId]);

  /*useEffect(() => {
    const fetchWatchlist = async () => {
      if (!userId) {
        console.log("No userid yet");
        return
      }
      try {
        const res = await axios.get(`${API_BASE_URL}/api/watchlist/${userId}`);
        console.log("Got watchlist:", res.data)
        dispatch({ type: "SET_WATCHLIST", payload: Array.isArray(res.data.watchlist) ? res.data.watchlist : [] });
      } catch (err) {
        console.error("Fetch watchlist error:", err)
      }  
    };
    fetchWatchlist();
  }, [userId]);

  useEffect(() => {
      const fetchWatched = async () => {
        if (!userId) {
          return
        }
        try {
          const watchedRes = await axios.get(`${API_BASE_URL}/api/watched/${userId}`);
          dispatch({ type: "SET_WATCHED", payload: Array.isArray( watchedRes.data) ? watchedRes.data.watched : [] });
        } catch (err) {
          console.error("Fetch watched error:", err)
        }
        fetchWatched();
    }
  }, [userId]);

  /*useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
    localStorage.setItem("watched", JSON.stringify(state.watched));
  }, [state]);*/


  // actions
  const addMovieToWatchlist = async (movie) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/api/watchlist`, { userId, movie });
      if(res.status === 200) {
        dispatch({ type: "ADD_MOVIE_TO_WATCHLIST", payload: movie });
      }
    } catch (err) {
      console.error("Add to watchlist error:", err)
    }
  };

  const removeMovieFromWatchlist = async (movieId) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/watchlist/${userId}/${movieId}`);
      dispatch({ type: "REMOVE_MOVIE_FROM_WATCHLIST", payload: movieId });
    } catch (err) {
      console.error("Remove from watchlist error:", err)
    }
  };

  const addMovieToWatched = async (movie) => {
    try {
      await axios.post(`${API_BASE_URL}/api/watched`, { userId, movie });
      dispatch({ type: "ADD_MOVIE_TO_WATCHED", payload: movie });
    } catch (err) {
      console.error("Add to watched error:", err)
    }
  };

  const moveToWatchlist = async (movie) => {
    try {
      await axios.post(`${API_BASE_URL}/api/watched/move`, { userId, movie });
      dispatch({ type: "MOVE_TO_WATCHLIST", payload: movie });
    } catch (err) {
      console.error("Move to watchlist error:", err)
    }
  };

  const removeFromWatched = async (movieId) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/watched/${userId}/${movieId}`);
      dispatch({ type: "REMOVE_FROM_WATCHED", payload: movieId });
    } catch (err) {
      console.error("Remove from watched error:", err)
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