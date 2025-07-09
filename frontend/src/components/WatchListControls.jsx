import { useContext } from "react";
import { WatchListContext } from "../contexts/WatchListState";

export const WatchListControls = ({ type, movie }) => {
  const {
    addMovieToWatchlist,
    removeMovieFromWatchlist,
    addMovieToWatched,
    moveToWatchlist,
    removeFromWatched,
    watchlist,
    watched
  } = useContext(WatchListContext);

  const isWatchList = (movieId) => {
    return watchlist?.some(movie => movie.id === movieId)
  }

  const iswatchlist = isWatchList(movie.id)

  function onFavWatchListClick(movie) {
    if (iswatchlist) removeMovieFromWatchlist(movie.id)
    else addMovieToWatchlist(movie)
  }

  const isWatched = (movieId) => {
    return watched?.some(movie => movie.id === movieId)
  }

  const iswatched = isWatched(movie.id)

  function onFavWatchedClick(movie) {
    if (iswatched) removeFromWatched(movie.id)
    else addMovieToWatched(movie)
  }


  return (
    <div className="inner-card-controls">
      {type === "watchlist" && (
        <div>
          <button className="ctrl-btn" onClick={() => addMovieToWatched(movie)}>
            <i className="fa-fw far fa-eye"></i>
          </button>

          <button
            className="ctrl-btn"
            onClick={() => removeMovieFromWatchlist(movie.id)}
          >
            <i className="fa-fw fa fa-times"></i>
          </button>
        </div>
      )}

      {type === "favorites" && (
        <div>
          <button className="ctrl-btn" onClick={() => onFavWatchListClick(movie)}>
            <i className={`fa-fw far fa-eye watch ${iswatchlist ? "active" : ""}`}></i>
          </button>

          <button
            className="ctrl-btn"
            onClick={() => onFavWatchedClick(movie)}
          >
            <i className={`fa-fw far fa-eye-slash watch ${iswatched ? "active" : ""}`}></i>
          </button>
        </div>
      )}

      {type === "watched" && (
        <div>
          <button className="ctrl-btn" onClick={() => moveToWatchlist(movie)}>
            <i className="fa-fw far fa-eye-slash"></i>
          </button>

          <button
            className="ctrl-btn"
            onClick={() => removeFromWatched(movie.id)}
          >
            <i className="fa-fw fa fa-times"></i>
          </button>
        </div>
      )}
    </div>
  );
};
