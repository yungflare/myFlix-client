import React from "react";
import { Link } from "react-router-dom";
import "./movie-view.scss";
import { Button } from "react-bootstrap";
import { PropTypes } from "prop-types";
import ProfileView from "../profile-view/profile-view";

const handleFavoriteToggle = (movieId, movieTitle) => {
    const url = `https://movie-api-kiz1.onrender.com/users/${user.Username}/movies/${movieId}`;
    const isFavorite = favoriteMovies.includes(movieId);
    const method = isFavorite ? "DELETE" : "POST";
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
.then((response) => {
    if (response.ok) {
        setShowConfirmation(true);
        setAddedMovieTitle(movieTitle);

    setTimeout(() => {
        setShowConfirmation(false);
        setAddedMovieTitle("");
    }, 2000);
} 
})
.catch((error) => {
    console.error(`Error toggling favorite for movie with ID ${movieId}:`, error);
});
};

export const MovieView = ({ movies }) => {
        return (
        <div>
            {movies.map((movie) => (
                <div key={movie._id} className="movie-card">
                    <img src={movie.Image} alt="Movie Poster" className="movie-image" />
                    <h3>{movie.Title}</h3>
                    <button 
                    variant = "outline-primary"
                    style={{ cursor: "pointer"}}
                    onClick={() => handleFavoriteToggle(movie._id, movie.Title)}
                    >
                        {movie.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                    </button>
                    </div>
            ))}
            </div>
        );
            };


MovieView.propTypes = {
    movies: PropTypes.array.isRequired,
    handleFavoriteToggle: PropTypes.func.isRequired
};

export default MovieView;


