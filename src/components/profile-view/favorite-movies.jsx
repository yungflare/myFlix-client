import React, { useEffect, useState } from "react";
import { Button, Alert } from "react-bootstrap";
import PropTypes from "prop-types";

export const ProfileFavoriteView = ({ user, favoriteMovies, onFavoriteToggle, token }) => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    useEffect(() => {
        setErrorMessage(null);

        if (token) {
            fetchFavorites();
        }
      }, [token]);

      const fetchFavorites = () => {
        fetch(`https://movie-api-kiz1.onrender.com/users/${user.Username}/movies`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to get favorite movies');
            }
            return response.json();
        })
        .then((data) => {
            onFavoriteToggle(data); 
        })
        .catch((error) => {
            setErrorMessage("Error fetching Favorite Moives:");
        });
    };
    // }, [user, token, favoriteMovies, onFavoriteToggle]); 

    const handleFavoriteToggle = (movieId) => {
        const url = `https://movie-api-kiz1.onrender.com/users/${user.Username}/movies`;
        const isFavorite = favoriteMovies.some(movie => movie._id === movieId);
        const method = isFavorite ? "DELETE" : "POST";

        fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            if(response.ok) {
                if(isFavorite) {
                    setFavoriteMovies(favoriteMovies.filter(movie => movie._id !== movieId));
                } else {
                    fetch(`https://movie-api-kiz1.onrender.com/movies/${movieId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    .then(response => response.json())
                    .then(data => {
                        setFavoriteMovies([...favoriteMovies, data]);
                    })
                    .catch(error => console.error("Error fetching Movie details: ", error));
                }
            } else {
                console.error(`Error getting favorite movie with ID ${movieId}`);
            }
        })
        .catch((error) => {
            console.error(`Error favorite movie ${movieId}:`, error);
        });
    };

    //             throw new Error('Failed to get Favorites');
    //         }
    //         fetchFavorites();
    //     })

    //     .catch((error) => {
    //         setErrorMessage("Error!");
    //     });
    // };

    //     onFavoriteToggle(movieId)
    //     .then(() => {
    //         setErrorMessage(null);
    //         fetchFavorites();
    //     })
    //     .catch((error) => {
    //         setErrorMessage("Error toggling favorite movie");
    //     });
    // };
   
return (
    <div>
        <h2> Favorite Movies </h2>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        {favoriteMovies && favoriteMovies.length > 0 ? (
            favoriteMovies.map((movie) => (
                <div key={movie._id}>
                    <p>{movie.Title}</p>
                            <Button 
                            variant="outline-primary" 
                            style={{ cursor: "pointer"}}
                            onClick={() => handleFavoriteToggle(movie._id)}
                            >
                                Remove from Favorites
                            </Button>
                          </div>
                       ))
        ) : (
            <p> No favorite movies </p>
        )}
        </div>
);
        };

        ProfileFavoriteView.propTypes = {
            user: PropTypes.shape({
                Username: PropTypes.string.isRequired,
            }).isRequired,
            favoriteMovies: PropTypes.arrayOf(
                PropTypes.shape({
                _id: PropTypes.string.isRequired,
                Title: PropTypes.string.isRequired,
        })
        ).isRequired,
        onFavoriteToggle: PropTypes.func.isRequired,
        token: PropTypes.string.isRequired,
        };

        export default ProfileFavoriteView;
