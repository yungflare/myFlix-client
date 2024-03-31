import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

export const MovieView = ({ movies, onFavoriteToggle }) => {
  const { movieId } = useParams();
  const decodedMovieId = decodeURIComponent(movieId);
  const movie = movies.find((b) => b._id === decodedMovieId);

  console.log("movieId:", movieId);
  console.log("movies:", movies);
  console.log("movie:", movie);

  return (
    <div>
      <div>
        <img height={500} src={movie?.Image} alt="Movie Poster" />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie?.Title || "No Title"}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie?.Director?.Name || "No Director"}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie?.Genre?.Name || "No Genre"}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie?.Description || "No Description"}</span>
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

      <Link to={`/movies/favorites`}>
        <Button
          variant="outline-primary"
          style={{ cursor: "pointer" }}
          onClick={() => onFavoriteToggle(movieId)}
        >
          {movie?.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </Button>
      </Link>
    </div>
  );
};

MovieView.propTypes = {
  movies: PropTypes.array.isRequired,
  movie: PropTypes.string,
  Image: PropTypes.string,
  onFavoriteToggle: PropTypes.func.isRequired,
};

export default MovieView;
