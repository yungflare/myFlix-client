import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import  Row  from "react-bootstrap/Row";
import  Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";


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
    
            return (
             <Row className="justify-content-md-center">
                {!user ? (
                    <Col md={4}>
                        <LoginView onLoggedIn={(user, token) => {
                setUser(user);
                setToken(token);
                        }} 
                        />
              <h2> Sign Up </h2> 
              <SignupView /> 
              </Col>

            ) : selectedMovie ? (
                <Col md={8}>
                    <MovieView
                    key={movies._id}
                    movie={selectedMovie}
                    onBackClick={() => setSelectedMovie(null)}
                    />

                </Col>
            ) : movies.length === 0 ? (
                <div> Empty </div>
            ) : (
                <>
                {movies.map((movie) => (
                    <Col className="mb-4" key={movie._id} md={3}>
                        <MovieCard
                        movie={movie}
                        onMovieClick={(newSelectedMovie) => {
                            setSelectedMovie(newSelectedMovie);
                        }}
                    />
                    </Col>
                ))}
                <Button 
                onClick={() => {
                    setUser(null);
                    setToken(null);
                    localStorage.clear();
                }}
                > Logout </Button>
                </>
            )}
            </Row>
            );
                    };

                    
                    
                    
                   