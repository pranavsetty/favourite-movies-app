import {createContext, useState, useContext, useEffect} from "react"

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({children}) => {
    const [favourites, setfavourites] = useState([])

    useEffect(() => {
        const storedFavs = localStorage.getItem("favourites")

        if (storedFavs) setfavourites(JSON.parse(storedFavs))
    }, [])

    useEffect(() => {
        localStorage.setItem('favourites', JSON.stringify(favourites))
    }, [favourites])

    const addTofavourites = (movie) => {
        setfavourites(prev => [...prev, movie])
    }

    const removeFromfavourites = (movieId) => {
        setfavourites(prev => prev.filter(movie => movie.id !== movieId))
    }
    
    const isfavourite = (movieId) => {
        return favourites.some(movie => movie.id === movieId)
    }

    const value = {
        favourites,
        addTofavourites,
        removeFromfavourites,
        isfavourite
    }

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}