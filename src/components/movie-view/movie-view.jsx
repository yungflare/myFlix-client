import React from "react";
import React, { useState } from "react";
// import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import "./movie-view.scss";

export const MovieView = ({ movie, onFavoriteToggle }) => {
  const [isFavorite, setIsFavorite] = useState(
    movie ? movie.isFavorite : false
  );

  const handleFavoriteToggle = (movieId) => {
    onFavoriteToggle(movieId);
    setIsFavorite(!isFavorite); // Toggle the isFavorite state
  };

  // const { movieId } = useParams();
  // const decodedMovieId = decodeURIComponent(movieId);
  // const movie = movies.find((b) => b._id === movieId);
  // const isFavorite = movies.includes(movieId);

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
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Image: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string,
    }),
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string,
      isFavorite: PropTypes.bool,
    }).isRequired,
  }),
  onFavoriteToggle: PropTypes.func.isRequired,
};

// MovieView.propTypes = {
//   movies: PropTypes.array.isRequired,
//   movie: PropTypes.array.isRequired,
//   Title: PropTypes.string.isRequired,
//   Description: PropTypes.string.isRequired,
//   Director: PropTypes.shape({
//     Name: PropTypes.string.isRequired,
//     Description: PropTypes.string,
//   }),
//   Genre: PropTypes.shape({
//     Name: PropTypes.string.isRequired,
//     Description: PropTypes.string,
//     isFavorite: PropTypes.bool,
//   }).isRequired,
//   onFavoriteToggle: PropTypes.func.isRequired,
//   // favorite_Movies: PropTypes.array.isRequired,
// };
