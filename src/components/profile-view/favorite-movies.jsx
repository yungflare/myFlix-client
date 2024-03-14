import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import ProfileView from "./profile-view";

export const ProfileFavoriteView = ({ user, onFavoriteToggle }) => {
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    useEffect(() => {
        fetch(`https://movie-api-kiz1.onrender.com/user/${user._id}/favorites`,)
        .then((response) => response.json())
        .then((data) => {
            setFavoriteMovies(data.favoriteMovies); 
        })
        .catch((error) => console.error ("Error fetching Favorite Moives:", error));
    }, [user._id]);

    const handleToggle = (movieId) => {
        console.log("Toggling favorite for movie ID:", movieId);
        setFavoriteMovies((prevMovies) =>
        prevMovies.map((movie) => ({
            ...movie,
            isFavorite: movie._id === movieId ? !movie.isFavorite : movie.isFavorite,
        }))
        );
        onFavoriteToggle(movieId);
};

return (
    <div>
        <h2> Favorite Movies </h2>
        {favoriteMovies.length === 0 ? (
            <p> No Favorite Movies </p>
        ) : (
            <div>
                {favoriteMovies.map((movie) => (
                    <Card key={movie._id} style={{ width: "18rem", marginBottom:"15px"}}>
                        <Card.Body>
                            <Card.Title>{movie.Title}</Card.Title>
                            <Card.Text>{movie.Description}</Card.Text>
                            <Button 
                            variant="primary"
                            onClick={() => handleToggle(movie._id)} >
                                {movie.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                            </Button>
                        </Card.Body>
                    </Card>
                ))}
    </div>
)}
</div>
);
                };

        ProfileFavoriteView.PropTypes = {
            user: PropTypes.shape({
                _id: PropTypes.string.isRequired,
            }).isRequired,
            onFavoriteToggle: PropTypes.func.isRequired,
        };
        