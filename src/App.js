import { useEffect } from "react";
import './App.css';
import SearchIcon from './search.svg';

import Moviecard from "./moviecard";
import { useState } from "react";
//4d33f5b

const API_Url = 'http://www.omdbapi.com?apikey=4d33f5b';


const App = () => {
    const [movies, setmovies] = useState([]);
    const [searchitem, setsearchitem] = useState('');

    const SearchMovies = async (title) => {
        const response = await fetch(`${API_Url}&s=${title}`);
        const data = await response.json();

        setmovies(data.Search);
    }

    useEffect(() => {
        SearchMovies('action')
    }, []);

    return (
        <div className="app">
            <h1>Movie Site by Ayush</h1>
            <div className="search">
                <input
                    placeholder="search for movies..."
                    value={searchitem}
                    onChange={(e) => setsearchitem(e.target.value)}
                    onKeyPress={event => {
                        if (event.key === 'Enter') {
                            SearchMovies(searchitem)
                        }
                    }}
                />
                <img src={SearchIcon} alt="search" onClick={() => SearchMovies(searchitem)} />
            </div>

            {
                movies?.length > 0
                    ? (
                        <div className="container">
                            {movies.map((movie) => (
                                <Moviecard Movie1={movie} />
                            ))}
                        </div>
                    ) : (
                        <div className="empty">
                            <h2>No movies found</h2>
                        </div>
                    )
            }
        </div>
    );
};

export default App;