import { useNavigate } from "react-router-dom";
import { useMovieContext } from "../contexts/FavMovieContext"
import { WatchListControls } from "./WatchListControls"

function MovieCard({ movie, type }) {
    const {isFavorite, addToFavorites, removeFromFavorites} = useMovieContext()
    const navigate = useNavigate();

    const favorite = isFavorite(movie.id)

    function onFavoriteClick(e) {
        e.preventDefault()
        if (favorite) removeFromFavorites(movie.id)
        else addToFavorites(movie)
    }

    return (
        <div className="movie-card">
            <div className="movie-poster">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title + " poster"}/>
                <div className="movie-overlay">
                    <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
                        ♥
                    </button>
                </div>

                <WatchListControls type={type} movie={movie} />
                
            </div>
            <div className="movie-info">
                <h3 className="text-sm font-semibold">{movie.title}</h3>
                <p className="text-xs text-gray-400">{movie.release_date?.split("-")[0]}</p>
            </div>
            <button type="button" 
                className='bg-[#e50914] text-white py-2 px-5 rounded text-base hover:opacity-90 cursor-pointer mt-2'
                onClick={() => navigate("/rating-review")}
            >Rate and Review</button>
        </div>
    )
}

export default MovieCard