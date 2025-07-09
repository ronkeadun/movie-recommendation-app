import { useContext } from "react";
import { WatchListContext } from "../contexts/WatchListState";
import { WatchListHeader } from "../components/WatchListHeader";
import  MovieCard  from "../components/MovieCard";

export const Watched = () => {
  const { watched } = useContext(WatchListContext);

  return (
    <div className="movie-page">
      <WatchListHeader />
      <div className="container">
        <div className="header">
          <h2 className="heading">Watched Movies</h2>

          <span className="count-pill">
            {watched?.length} {watched?.length === 1 ? "Movie" : "Movies"}
          </span>
        </div>

        {watched.length > 0 ? (
          <div className="watchlist-movie-grid">
            {watched.map((movie) => (
              <MovieCard movie={movie} key={movie.id} type="watched" />
            ))}
          </div>
        ) : (
          <h3 className="no-movies">No movies in your list! Add some!</h3>
        )}
      </div>
    </div>
  );
};
