import { useContext } from "react";
import { WatchListContext } from "../contexts/WatchListState";
import { WatchListHeader } from "../components/WatchListHeader";
import  MovieCard  from "../components/MovieCard";


export const Watchlist = () => {
  const { watchlist } = useContext(WatchListContext);

  return (
    <div className="movie-page">
      <WatchListHeader />
      <div className="container">
        <div className="header">
          <h2 className="heading">My Watchlist</h2>

          <span className="count-pill">
            {watchlist?.length} {watchlist?.length === 1 ? "Movie" : "Movies"}
          </span>
        </div>

        {watchlist?.length > 0 ? (
          <div className="watchlist-movie-grid">
            {watchlist.map((movie) => (
              <MovieCard movie={movie} key={movie.id} type="watchlist" />
            ))}
          </div>
        ) : (
          <h3 className="no-movies">No movies in your list! Add some!</h3>
        )}
      </div>
    </div>
  );
};
