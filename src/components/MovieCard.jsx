import "../css/MovieCard.css"
import { useMovieContext } from "../contexts/MovieContext"

function MovieCard({movie}) {
    const {isfavourite, addTofavourites, removeFromfavourites} = useMovieContext()
    const favourite = isfavourite(movie.id)

    function onfavouriteClick(e) {
        e.preventDefault()
        if (favourite) removeFromfavourites(movie.id)
        else addTofavourites(movie)
    }

    return <div className="movie-card">
        <div className="movie-poster">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
            <div className="movie-overlay">
                <button className={`favourite-btn ${favourite ? "active" : ""}`} onClick={onfavouriteClick}>
                    ♥
                </button>
            </div>
        </div>
        <div className="movie-info">
            <h3>{movie.title}</h3>
            <p>{movie.release_date?.split("-")[0]}</p>
        </div>
    </div>
}

export default MovieCard