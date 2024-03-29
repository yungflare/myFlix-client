import React, { useState, useEffect } from "react";
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
import { Toast } from "react-bootstrap";
import  handleFavoriteToggle  from "../movie-view/movie-view";
import isFavorite from "../movie-view/movie-view";

export const MainView = ({ onUserUpdate, onDeregister }) => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const storedToken = localStorage.getItem("token");
        const [user, setUser] = useState(storedUser || null);
        const [token, setToken] = useState(storedToken || null);
        const [movies, setMovies] = useState([]);
        const [favoriteMovies, setFavoriteMovies] = useState([]);
        const [showConfirmation, setShowConfirmation] = useState(false); 
        const [addedMovieTitle, setAddedMovieTitle] = useState("");
    
    //     const handleFavoriteToggle = (movieId, movieTitle) => {
    //         const url = `https://movie-api-kiz1.onrender.com/users/${user.Username}/movies/${movieId}`;
    //         // const isFavorite = favoriteMovies.includes(movieId);
    //         const method = isFavorite ? "DELETE" : "POST";

    //         fetch(url, {
    //             method: method,
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         })
    //     .then((response) => {
    //         if (response.ok) {
        
    //         setShowConfirmation(true);
    //         setAddedMovieTitle(movieTitle);

    //         setTimeout(() => {
    //             setShowConfirmation(false);
    //             setAddedMovieTitle("");
    //         }, 2000);
    //     } 
    // })
    //     .catch((error) => {
    //         console.error(`Error toggling favorite for movie with ID ${movieId}:`, error);
    //     });
    // };
 
    useEffect(() => {
        if (!token) {
            return;
        }

        fetch("https://movie-api-kiz1.onrender.com/movies", {
            headers: { Authorization: `Bearer ${token}`},
        })
        .then((response) => response.json())
        .then((data) => {
            setMovies(data);
        });
    }, [token]);

    const handleMovieClick = (movie) => {
        console.log("Movie Clicked:", movie);
    };

    const handleUserUpdate = (UpdatedUser) => {
        console.log("Deregistering user:", user);
        onDeregister();
    };

    const handleDeregister = () => {
        console.log("User Deleted succesfully!");
    };


        //     const moviesFromApi = data.map((movie) => {
        //         return {
        //           _id: movie._id,
        //           Image: movie.Image,
        //           Title: movie.Title,
        //           Description: movie.Description,
        //           Genre: {
        //               Name: movie.Genre.Name
        //           },
        //           Director: {
        //               Name: movie.Director.Name
        //           }
        //         };
        //       });
      
        //       setMovies(moviesFromApi);
        //     });
        // }, [token]);
    
            return (
                <>
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
                    path="/"
                    element={
                        <>
                        {!user ? (
                            <Navigate to= "/login" replace />
                        ) : movies.length === 0 ? (
                            <Col> Empty! </Col>
                        ) : (
                            <Col md={8}>
                                <MovieView 
                                movies={movies} 
                                handleFavoriteToggle={handleFavoriteToggle}
                                />
                            </Col>
                        )}
                        </>
                    }
                    />

            

                    </Routes>
                    </Row>
                    </BrowserRouter>
                    <Toast 
                    show={showConfirmation}
                    onClose={() => setShowConfirmation(false)} 
                    delay={3000} 
                    autohide
                    >
                    <Toast.Header>
                        <strong className="mr-auto"> Success!</strong>
                    </Toast.Header>
                    <Toast.Body>
                        {addedMovieTitle} has been added to fvorites!
                        </Toast.Body>
                    </Toast>
                   
                    </>
            );
                };

                export default MainView;


                    
         
                    
                    
                    
                   