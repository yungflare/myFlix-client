import React from "react";
import { useParams } from "react-router";
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import "./movie-view.scss";

export const MovieView = ({ movies, onFavoriteToggle }) => {
  const { movieId } = useParams();
  const decodedMovieId = decodeURIComponent(movieId);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteToggle = () => {
    onFavoriteToggle(decodedMovieId);
    setIsFavorite(!isFavorite); // Toggle the isFavorite state
  };

  const movie = movies.find((b) => b._id === decodedMovieId);

  return (
    <div>
      <div>
        <img height={500} src={movie.Image} alt="Movie Poster" />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.Title || "No Title"}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.Director?.Name || "No Director"}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.Genre?.Name || "No Genre"}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.Description || "No Description"}</span>
      </div>
      <Link to={`/movies`}>
        <Button
          className="back-button"
          variant="primary"
          style={{ cursor: "pointer" }}
        >
          Back
        </Button>
      </Link>

      <Button
        variant="outline-primary"
        style={{ cursor: "pointer" }}
        onClick={() => handleFavoriteToggle(movie._id)}
      >
        {isFavorite ? "REMOVE FROM FAVS" : "ADD TO FAVORITES!"}
      </Button>
    </div>
  );
};

MovieView.propTypes = {
  movies: PropTypes.array.isRequired,
  onFavoriteToggle: PropTypes.func.isRequired,
  favorite_Movies: PropTypes.array,
};
