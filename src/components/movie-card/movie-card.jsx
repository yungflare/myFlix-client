import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, onFavoriteToggle }) => {
  const isFavorite = movie.isFavorite;
    return (
        <Card>
          <Card.Img variant="top" src={movie.Image} />
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            {/* <Card.Text>{movie.Description}</Card.Text> */}
            <Card.Text>{movie.Genre.Name}</Card.Text>
            <Card.Text>{movie.Director.Name}</Card.Text>
            <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
              <Button variant="primary" style={{ cursor: "pointer" }}>
              Open</Button>
              </Link>
              <Button 
              variant="outline-primary"
              style={{ cursor: "pointer" }}
              onClick={() => onFavoriteToggle(movie._id)} >
                {movie.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              </Button>
            </Card.Body>
            </Card>
    );
};
    MovieCard.propTypes = {
        movie: PropTypes.shape({
          _id: PropTypes.string.isRequired,
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

    onFavoriteToggle: PropTypes.func.isRequired

    };

    export default MovieCard;

       