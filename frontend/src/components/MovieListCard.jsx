import { Link } from "react-router-dom";

const MovieListCard = ({movies}) => {
    
    return (   

        <div className="movie_cards flex">
            {
                movies && movies.map((movie)=>(    
                    <div className="movie_card" key={movie.id}> 
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="movie poster" className="movie_poster"/>
                        <div className="movie_details">
                            <h3 className="movie_details_heading pt-10 pb-5 text-lg font-medium">{movie.original_title}</h3>
                            <div className="movie_date_rate">
                                <p>{movie.release_date}</p>
                                <p>{movie.vote_average}</p>
                            </div>
                            <p className="movie_description">
                                {movie.overview.slice(0,100) + "..."}
                            </p>
                            <Link to={`/movie/${movie.id}`} className="p-0.5 m-1 rounded-2xl text-center text-sm  bg-[#e50914] hover:bg-red-900">Click here for more</Link>
                        </div> 
                    </div>  
                ))
            }
                
        </div>    

    )
}

export default MovieListCard
