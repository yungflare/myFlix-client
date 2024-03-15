import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { ProfileFavoriteView } from "../profile-view/favorite-movies";
import  Row  from "react-bootstrap/Row";
import  Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export const MainView = ({ onUserUpdate, onDeregister }) => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const storedToken = localStorage.getItem("token");
        const [user, setUser] = useState(storedUser? storedUser : null);
        const [token, setToken] = useState(storedToken? storedToken : null);
        const [movies, setMovies] = useState([]);
        const [favoriteMovies, setFavoriteMovies] = useState([]);
    
        const handleFavoriteToggle = (movieId) => {
            const url = `https://movie-api-kiz1.onrender.com/users/${user.Username}/movies/${movieId}`;
            const isFavorite = favoriteMovies.includes(movieId);
            const method = isFavorite ? "DELETE" : "POST";

            fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
          
        .then((response) => response.json())
        .then((updatedUser) => {
            setFavoriteMovies(updatedUser.favoriteMovies || []);
        })
        .catch((error) => {
            console.error(`Error toggling favorite for movie with ID ${movieId}:`, error);
        });
    };

    const handleUserUpdate = (updatedUser) => {
        console.log("Deregistering user:", user);
        onDeregister();
    };

    const handleDeregister = () => {
        console.log("User Deleted succesfully!");
    };

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
                            <Navigate to= "/login" replace />
                        ) : movies.length === 0 ? (
                            <Col> Empty! </Col>
                        ) : (
                            <Col md={8}>
                                <MovieView movies={movies} 
                                onFavoriteToggle={handleFavoriteToggle} />
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
                            <Navigate to= "/login" replace  />
                        ) : movies.length === 0 ? (
                            <Col> Empty! </Col>
                        ) : (
                            <>
                            {movies.map((movie) => {
                                return (<Col className="mb-4" key={movie._id} md={3}> 
                                <MovieCard movie={movie}  
                                onFavoriteToggle={handleFavoriteToggle}/>
                                </Col>)
                            })}
                            </>
                        )}
                        </>
                    }
                    />

                       <Route
                    path="/profile"
                    element={
                    <ProfileView
                    user={user}
                    onUserUpdate={handleUserUpdate}
                    onDeregister={handleDeregister} 
                    /> 
                    }
                    />
                    
                    <Route
                    path="/profile/favorites"
                    element={
                        <ProfileFavoriteView
                        user={user}
                        onFavoriteToggle={handleFavoriteToggle}
                        token={token}
                        />
                    }
                    />

                    </Routes>
                    </Row>
                    </BrowserRouter>
            );
                };

                export default MainView;

                       
                
                // <Button 
                // onClick={() => {
                //     setUser(null);
                //     setToken(null);
                //     localStorage.clear();
                // }}
                // > Logout </Button>
         
                    
                    
                    
                   