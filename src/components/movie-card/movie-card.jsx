import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, onFavoriteToggle, favoriteMovies }) => {
  const [isFavorite, setIsFavorite] = useState(movie.isFavorite);

  const handleFavoriteToggle = (movieId) => {
    onFavoriteToggle(movieId);
    setIsFavorite(!isFavorite); // Toggle the isFavorite state
  };

  return (
    <Card>
      <Card.Img variant="top" src={movie.Image} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Genre.Name}</Card.Text>
        {/* <Card.Text>{movie.Description.substring(0, 80)}...</Card.Text> */}
        <Card.Text>{movie.Director.Name}</Card.Text>

        <Link to={`/movies/${movie._id}`}>
          <Button variant="primary" style={{ cursor: "pointer" }}>
            Open
          </Button>
        </Link>
        <Button
          variant="outline-primary"
          style={{ cursor: "pointer" }}
          onClick={() => handleFavoriteToggle(movie._id)}
        >
          {isFavorite ? "REMOVE FROM FAVS" : "ADD TO FAVORITES!"}
        </Button>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string,
    Image: PropTypes.string,
    Director: PropTypes.shape({
      Name: PropTypes.string,
    }),
    isFavorite: PropTypes.bool,
  }).isRequired,
  onFavoriteToggle: PropTypes.func.isRequired,
};
