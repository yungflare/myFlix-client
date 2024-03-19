import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

export const ProfileFavoriteView = ({ user, favoriteMovies, onFavoriteToggle, token }) => {
    useEffect(() => {
        fetch(`https://movie-api-kiz1.onrender.com/users/${user.Username}/movies`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => response.json())
        .then((data) => {
            const updatedFavoriteMovies = favoriteMovies.map(favMovie => {
                if (favMovie._id === data._id) {
                    return data;
                } else {
                    return favMovie;
                }
            })
            onFavoriteToggle(updatedFavoriteMovies); 
        })
        .catch((error) => {
            console.error ("Error fetching Favorite Moives:", error);
        });
    }, [user, token, favoriteMovies, onFavoriteToggle]);
   
return (
    <div>
        <h2> Favorite Movies </h2>
        {favoriteMovies && favoriteMovies.length > 0 ? (
            favoriteMovies.map((movie) => (
                <div key={movie._id}>
                    <p>{movie.Title}</p>
                            <Button 
                            variant="outline-primary" 
                            style={{ cursor: "pointer"}}
                            onClick={() => onFavoriteToggle(movie._id)}
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
        ),
        onFavoriteToggle: PropTypes.func.isRequired,
        token: PropTypes.string.isRequired,
        };

        export default ProfileFavoriteView;
