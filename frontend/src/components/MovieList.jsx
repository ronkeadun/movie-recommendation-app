import { useEffect, useState } from "react"
import _ from "lodash"

import MovieListCard from "./MovieListCard"
import FilterMovies from "./FilterMovies"


const MovieList = ({type, title}) => {
    const [movies, setMovies] = useState([])
    const [minRating, setMinRating] = useState(0)
    const [filterMovies, setFilterMovies] = useState([])
    const [sort, setSort] = useState({by:"default", order:"asc"})

    const TMDB_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL
    const URL = `${TMDB_BASE_URL}/movie`
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY

    const fetchMovies = async()=> {
        const response = await fetch(`${URL}/${type}?api_key=${API_KEY}`)
        const data = await response.json()
        setMovies(data.results)
        setFilterMovies(data.results)
    }

    useEffect(()=>{
        fetchMovies()
    }, [])

    useEffect(()=>{
        if(sort.by !== "default"){
            const sortedMovies = _.orderBy(filterMovies, [sort.by], [sort.order])
            setFilterMovies(sortedMovies)
        }
    }, [sort])

    const handleFilter = rate => {
        if (rate === minRating) {
            setMinRating(0)
            setFilterMovies(movies)
        }else{
            setMinRating(rate)
    
            const filteredMovies = movies.filter((movie)=> movie.vote_average >= rate)
            setFilterMovies(filteredMovies)
        }
    }

    const handleSort = (e)=> {
        const {name, value} = e.target
        setSort((prev)=> {
            return {...prev, [name]:value}
        })
    }
    return (
        
        <section className="movie_list" id={type}>
            
            <div className="movie_list_header">
                <h2 className="movie_list_heading">{title}</h2>

                <div className="movie_list_fs">
                    <FilterMovies minRating={minRating} onRatingClick={handleFilter} ratings={[8,7,6]}/>

                    <select name="by" id="" className="movie_sorting" onChange={handleSort} value={sort.by}>
                        <option value="default">Sort By</option>
                        <option value="release_date">Release Date</option>
                        <option value="vote_average">Rating</option>
                    </select>

                    <select name="order" id="" className="movie_sorting" onChange={handleSort} value={sort.order}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
            </div>
            <MovieListCard movies={filterMovies}/>
        </section>
        
    )
}

export default MovieList
