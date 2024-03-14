import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";
import { Button } from "react-bootstrap";
import { PropTypes } from "prop-types";

export const MovieView = ({ movies, onFavoriteToggle }) => {
    const { movieId } = useParams();
    const decodeMovieId = decodeURIComponent(movieId);
    const movie = movies.find((b) => b.id === movieId);

    return (
        <div>
            <div>
                <img height={500} src = {movie.Image} />
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
            <Link to={`/`}>
                <Button 
                className="back-button" 
                variant="primary" 
                style={{ cursor: "pointer" }} > 
                Go Back 
                </Button>
            </Link>
            <Button 
            variant="outline-primary"
            style={{ cursor: "pointer"}}
            onClick={() => onFavoriteToggle(movie._id)}
            >
                {movie.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </Button>
        </div>
    );
};

    // MovieView.propTypes = {
    //     movies: propTypes.array.isRequired,
    //     onFavoriteToggle: propTypes.func.isRequired,
    // };

MovieView.propTypes = {
    movie: PropTypes.array.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string
    }),
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string
    }),
  }.isRequired