import { useEffect, useState } from "react"
import _ from "lodash"

import MovieListCard from "./MovieListCard"
import FilterMovies from "./FilterMovies"


const MovieList = ({type, title}) => {
    const [movies, setMovies] = useState([])
    const [minRating, setMinRating] = useState(0)
    const [minYear, setMinYear] = useState(0);
    const [minPop, setMinPop] = useState(0);
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

    useEffect(() => {
        if (!movies) return null;
        
        const list = movies.filter((m) => {
            const ratingOK = (m.vote_average ?? 0) >= minRating;
            const yearOK = minYear === 0 ? true : Number((m.release_date || "").slice(0, 4)) >= minYear;
            const popOK = (m.popularity ?? 0) >= minPop;
            return ratingOK && yearOK && popOK;
        });
        setFilterMovies(list)
    }, [movies, minRating, minYear, minPop]);

    useEffect(()=>{
        if(sort.by !== "default"){
            const sortedMovies = _.orderBy(filterMovies, [sort.by], [sort.order])
            setFilterMovies(sortedMovies)
        }
    }, [sort])
    
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

                    <FilterMovies 
                        minRating={minRating} 
                        setMinRating={setMinRating}
                        minYear={minYear}
                        setMinYear={setMinYear}
                        minPop={minPop}
                        setMinPop={setMinPop}
                    />
                    
                    {filterMovies.length === 0 && <div className="p-4 mt-40">No movies matched your filters.</div>}

                    <select name="by" id="" className="movie_sorting" onChange={handleSort} value={sort.by}>
                        <option value="default">Sort By</option>
                        <option value="release_date">Release Date</option>
                        <option value="vote_average">Rating</option>
                        <option value="popularity">Populatity</option>
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
