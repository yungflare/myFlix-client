import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";



export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <Card >
          <Card.Img variant="top" src={movie.Image} />
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>{movie.Director.Name}</Card.Text>
            <Button onClick={() => onMovieClick(movie)} variant="link">
              Open
            </Button>
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

       