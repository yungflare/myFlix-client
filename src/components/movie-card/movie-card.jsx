import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, onMovieClick }) => {
  const isFavorite = movie.isFavorite || false;
    return (
      <Card>
      <Card.Img variant="top" src={movie.Image} />
      <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Genre.Name}</Card.Text>
          <Card.Text>{movie.Director.Name}</Card.Text>
          <Button
            onClick={() => onMovieClick(movie)} variant="link">
              Open
          </Button>
      </Card.Body>
  </Card>
);
};

//         <Card>
//           <Card.Img variant="top" src={movie.Image} />
//           <Card.Body>
//             <Card.Title>{movie.Title}</Card.Title>
//             <Card.Text>{movie.Genre.Name}</Card.Text>
//             <Card.Text>{movie.Director.Name}</Card.Text>
//             {/* <Link to={`/movies/${encodeURIComponent(movie._id)}`}> */}
//               <Button
//                variant="primary" style={{ cursor: "pointer" }}>
//               Open</Button>
//               </Link>
//               <Button 
//               variant="outline-primary"
//               style={{ cursor: "pointer" }}
//               onClick={() => onFavoriteToggle(movie._id)} >
//                 {movie.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
//               </Button>
//             </Card.Body>
//             </Card>
//     );
// };
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

    onMovieClick: PropTypes.func.isRequired

    };

    export default MovieCard;

       