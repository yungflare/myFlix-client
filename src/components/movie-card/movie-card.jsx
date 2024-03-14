import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
    return (
        <Card >
          <Card.Img variant="top" src={movie.Image} />
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>{movie.Description}</Card.Text>
            <Card.Text>{movie.Director.Name}</Card.Text>
            <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
              <Button variant="link">Open</Button>
              </Link>
            </Card.Body>
            </Card>
    );
};
    // MovieCard.propTypes = {
    //     movie: PropTypes.shape({
    //     Title: PropTypes.string.isRequired,
    //     Director: PropTypes.shape({
    //       Name: PropTypes.string.isRequired
    //     }),
    //     Genre: PropTypes.shape({
    //       Name: PropTypes.string.isRequired 
    //     }),
    //     Image: PropTypes.string.isRequired
    //   }).isRequired
    // };
    
    // export default MovieCard;

       