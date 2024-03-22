import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";
import { Button } from "react-bootstrap";
import { PropTypes } from "prop-types";

export const MovieView = ({ movie, onFavoriteToggle }) => {
    // const { movieId } = useParams();
    // const decodeMovieId = decodeURIComponent(movieId);
    // const movie = movies.find((movie) => movie._id === movieId);
    if (movie) {
        return <div>No movie data available.</div>;
    } 
    // Check if the isFavorite property exists in movie
    const isFavorite = movie.isFavorite || false;

    return (
        <div>
            <div>
                <img height={500} src = {movie?.Image} alt="Movie Poster" />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.Title}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.Director?.Name}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.Genre?.Name}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.Description}</span>
            </div>
            <div>
                
            <Link to={`/`}>
                <button 
                className="back-button" 
                variant="primary" 
                style={{ cursor: "pointer" }} > 
                Go Back 
                </button>
            </Link>
            <button 
            variant="outline-primary"
            style={{ cursor: "pointer"}}
            onClick={() => onFavoriteToggle(movie)}
            >
                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>
            </div>
            </div>
    );
};

MovieView.propTypes = {
    movie: PropTypes.object,
    onFavoriteToggle: PropTypes.func.isRequired
};

export default MovieView;


//   MovieView.propTypes = {
//     movie: PropTypes.array.isRequired,
//     Title: PropTypes.string.isRequired,
//     Description: PropTypes.string.isRequired,
//     Director: PropTypes.shape({
//       Name: PropTypes.string.isRequired,
//       Description: PropTypes.string
//     }),
//     Genre: PropTypes.shape({
//       Name: PropTypes.string.isRequired,
//       Description: PropTypes.string
//     }),
//   }.isRequired