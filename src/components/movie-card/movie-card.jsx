import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import MovieView from "../movie-view/movie-view";

export const MovieCard = ({ movie, onFavoriteToggle }) => {
  const isFavorite = movie.isFavorite || false;

  const handleRemoveFromFavorites = (movieId) => {
    onFavoriteToggle(movieId);
  };

    return (
        <Card>
          <Card.Img variant="top" src={movie.Image} />
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>{movie.Genre.Name}</Card.Text>
            <Card.Text>{movie.Director.Name}</Card.Text>
            </Card.Body>
            <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
              <Button
               variant="primary" 
               style={{ cursor: "pointer" }}>
              Open</Button>
    
              <Button 
              variant="outline-primary"
              style={{ cursor: "pointer" }}
              onClick={() => onFavoriteToggle(movie._id)} >
                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              </Button>

              {isFavorite && (
              <Button 
              variant="outline-primary"
              style={{ cursor: "pointer" }}
              onClick={() => handleRemoveFromFavorites(movie._id)} >
                Remove from Favorites
              </Button>
              )}
              
              </Link>
            </Card>
    );
};
    MovieCard.propTypes = {
        movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Director: PropTypes.shape({
          Name: PropTypes.string
        }),
        Genre: PropTypes.shape({
          Name: PropTypes.string.isRequired 
        }),
        isFavorite: PropTypes.bool,
        Image: PropTypes.string.isRequired
      }).isRequired,

    onFavoriteToggle: PropTypes.func.isRequired,

    };

    export default MovieCard;

       