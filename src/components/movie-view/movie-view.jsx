import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import "./movie-view.scss";

export const MovieView = ({ movies, onFavoriteToggle }) => {
  const decodedMovieId = decodeURIComponent(movieId);
  const movie = movies.find((b) => b._id === decodedMovieId);
  const isFavorite = movies.includes(decodedMovieId);

  // console.log("movieId:", movieId);
  // console.log("movies:", movies);
  // console.log("movie:", movie);

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
        variant={isFavorite ? "danger" : "outline-primary"}
        style={{ cursor: "pointer" }}
        onClick={() => onFavoriteToggle(movie._id)}
      >
        Add to Favorites!
      </Button>
    </div>
  );
};

MovieView.propTypes = {
  movies: PropTypes.array.isRequired,
  onFavoriteToggle: PropTypes.func.isRequired,
  favorite_Movies: PropTypes.array.isRequired,
};
