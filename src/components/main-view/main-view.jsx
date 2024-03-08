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

        fetch("https://movie-api-kiz1.onrender.com/movies",{
            headers: { Authorization: `Bearer ${token}`}
        })
        .then((response) => response.json())
        .then((data) => {
            const moviesFromApi = data.map((movie) => {
                return {
                  _id: movie._id,
                  Image: movie.Image,
                  Title: movie.Title,
                  Description: movie.Description,
                  Genre: {
                      Name: movie.Genre.Name
                  },
                  Director: {
                      Name: movie.Director.Name
                  }
                };
              });
      
              setMovies(moviesFromApi);
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

            if (selectedMovie) {
                return (
                    <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
                );
            }

                if (movies.length === 0) {
                    return <div> Empty! </div>
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
                            onMovieClick={(newSelectedMovie) => setSelectedMovie(newSelectedMovie)
                            }
                        />
                    ))}
                </div>
            );
                    };
