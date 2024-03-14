import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import  Row  from "react-bootstrap/Row";
import  Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const storedToken = localStorage.getItem("token");
        const [user, setUser] = useState(storedUser? storedUser : null);
        const [token, setToken] = useState(storedToken? storedToken : null);
        const [movies, setMovies] = useState([]);
    
    useEffect(() => {
        if (!token) {
            return;
        }

        fetch("https://movie-api-kiz1.onrender.com/movies",{
            headers: { Authorization: `Bearer ${token}`}
        })
        .then((response) => response.json())
        .then((data) => {
            const moviesFromApi = data.map(movie => {
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
                <BrowserRouter>
                <NavigationBar
                    user={user}
                    onLoggedOut={() => {
                        setUser(null);
                    }}
                    />
             <Row className="justify-content-md-center">
                <Routes>
                    <Route
                    path="/signup"
                    element={
                        <>
                         {user ? (
                            <Navigate to="/" />
                         ) : ( 
                            <Col md={5}>
                                <SignupView /> 
                            </Col>
                         )}
                        </>
                    }
                    />

                    <Route 
                    path="/login"
                    element={
                        <>
                        {user ? (
                            <Navigate to="/" />
                        ) : ( 
                            <Col md={5}>
                                <LoginView onLoggedIn={(user, token) => {setUser(user); setToken(token);}} />
                            </Col>
                        )}
                        </>
                    }
                    />

                    <Route 
                    path="/movies/movieId"
                    element={
                        <>
                        {!user ? (
                            <Navigate to= "/" />
                        ) : movies.length === 0 ? (
                            <Col> Empty! </Col>
                        ) : (
                            <Col md={8}>
                                <MovieView movies={movies} />
                            </Col>
                        )}
                        </>
                    }
                    />

                    <Route 
                    path="/"
                    element={
                        <>
                        {!user ? (
                            <Navigate to= "/movies/:Title"  />
                        ) : movies.length === 0 ? (
                            <Col> Empty! </Col>
                        ) : (
                            <>
                            {movies.map((movie) => {
                                <Col className="mb-4" key={movie._id} md={3}> 
                                <MovieCard movie={movie} />
                                </Col>
                            })}
                            </>
                        )}
                        </>
                    }
                    />
                       <Route
                    path="/profile"
                    element={
                        <>
                         {user ? (
                            <Navigate to="/users" />
                         ) : ( 
                            <Col md={5}>
                                <ProfileView /> 
                            </Col>
                         )}
                        </>
                    }
                    />
                    </Routes>
                    </Row>
                    </BrowserRouter>
            );
                };


                       
                
                // <Button 
                // onClick={() => {
                //     setUser(null);
                //     setToken(null);
                //     localStorage.clear();
                // }}
                // > Logout </Button>
         
                    
                    
                    
                   