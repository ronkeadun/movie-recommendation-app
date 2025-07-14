
const FilterMovies = ({minRating,setMinRating,minYear,setMinYear,minPop,setMinPop}) => {

    return (
        <div className="movie_filter">
            <div className="movie_filter_item">
                <label className="block text-xs text-gray-300 mb-1">Min rating</label>
                <select
                    value={minRating}
                    onChange={(e) => setMinRating(Number(e.target.value))}
                    className="rounded-md border-gray-300 text-sm px-2 py-1"
                >
                    {[0,9,8,7,6].map((v) => (
                    <option key={v} value={v} className="bg-black">
                        {v === 0 ? "All" : `⭐ ${v}+`}
                    </option>
                    ))}
                </select>
            </div>
            <div className="movie_filter_item">
                <label className="block text-xs text-gray-300 mb-1">Released after</label>
                <select
                    value={minYear}
                    onChange={(e) => setMinYear(Number(e.target.value))}
                    className="rounded-md border-gray-300 text-sm px-2 py-1"
                >
                    {[0,2020,2015,2010,2000].map((y) => (
                    <option key={y} value={y} className="bg-black">
                        {y === 0 ? "All years" : `${y}+`}
                    </option>
                    ))}
                </select>
            </div>
            <div className="movie_filter_item">
                <label className="block text-xs text-gray-300 mb-1">Min popularity</label>
                <select
                    value={minPop}
                    onChange={(e) => setMinPop(Number(e.target.value))}
                    className="rounded-md border-gray-300 text-sm px-2 py-1"
                >
                    {[0,1000,500,100].map((p) => (
                    <option key={p} value={p} className="bg-black">
                        {p === 0 ? "All" : `🔥 ${p}+`}
                    </option>
                    ))}
                </select>
            </div>
            {(minRating||minYear||minPop) && (
            <button
                onClick={()=>{setMinRating(0);setMinYear(0);setMinPop(0);}}
                className="movie_filter_item text-sm underline"
            >
                Clear filters
            </button>
            )}
        </div>
    )
}

export default FilterMovies
