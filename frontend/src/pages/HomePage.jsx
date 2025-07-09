import Hero from "../components/Hero"
import MovieList from "../components/MovieList"

const HomePage = () => {
    return (
        <div className="mt-20">
            <Hero />
            <MovieList type="popular" title="Popular"/>
            <MovieList type="top_rated" title="Top Rated"/>
            <MovieList type="upcoming" title="Upcoming"/>
        </div>
    )
}

export default HomePage
