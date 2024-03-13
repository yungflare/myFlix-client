import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";


export const MovieCard = ({ movie }) => {
    return (
        <Card >
          <Card.Img variant="top" src={movie.Image} />
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>{movie.Director.Name}</Card.Text>
            <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
              <Button variant="link">Open</Button>
              </Link>
            </Card.Body>
            </Card>
    );
};
    MovieCard.propTypes = {
        movie: PropTypes.shape({
        _id: PropTypes.string.isRequired,
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
        Image: PropTypes.string.isRequired
      }).isRequired,
      onMovieClick: PropTypes.func.isRequired
    };
    
    export default MovieCard;

       