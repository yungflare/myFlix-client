import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const storedToken = localStorage.getItem("token");
        const [user, setUser] = useState(storedUser? storedUser : null);
        const [token, setToken] = useState(storedToken? storedToken : null);
        const [movies, setMovies] = useState([]);
        const [selectedMovie, setSelectedMovie] = useState(null);
    
    useEffect(() => {
        if (!token) {
            return;
        }

        fetch("https://movie-api-kiz1.onrender.com/movies",
        {
            headers: { Authorization: `Bearer ${token}`}
        })
        .then((response) => response.json())
        .then((data) => {
                setMovies(data);
            });
        }, [token]);
    
        if (!user) {
            return (
            <>
            <p> Log In </p>
            <LoginView
              onLoggedIn={(user, token) => {
                setUser(user);
                setToken(token);
              }} />

             <p> Sign Up </p>  
              <SignupView /> 
              </>
        );
            }
            return (
                <div>
                    <button
                        onClick={() => {
                            setUser(null);
                            setToken(null);
                            localStorage.clear();
                        }}
                    >
                        Logout
                    </button>
                    {movies.map((movie) => (
                        <MovieCard
                            key={movie._id}
                            movie={movie}
                            onMovieClick={(selectedMovie) => setSelectedMovie(selectedMovie)}
                        />
                    ))}
                </div>
            );
                    }
