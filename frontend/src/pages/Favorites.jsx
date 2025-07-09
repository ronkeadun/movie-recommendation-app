import { useMovieContext } from "../contexts/FavMovieContext";
import MovieCard from "../components/MovieCard";

function Favorites() {
  const { favorites } = useMovieContext();

  if (favorites) {
    return (
      <div className="favorites min-h-screen mt-15">
        <h2>Your Favorites</h2>
        <div className="movies-grid grid grid-cols-2 md:grid-cols-5 gap-4">
          {favorites.map((movie) => (
            <MovieCard movie={movie} key={movie.id} type="favorites" />
          ))}
        </div>
      </div>
    );
  }else{
    return (
      <div className="favorites-empty">
        <h2>No Favorite Movies Yet</h2>
        <p>Start adding movies to your favorites and they will appear here!</p>
      </div>
    );
  }
}

export default Favorites;

