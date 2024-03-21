import React from "react";
import { useParams } from "react-router";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./movie-view.scss";
import { Button } from "react-bootstrap";
import { PropTypes } from "prop-types";

export const MovieView = ({ movies, onBackClick }) => {
    const { movieId } = useParams();
    const decodeMovieId = decodeURIComponent(movieId);
    const movie = movies.find((b) => b.id === movieId);

    return (
        <Row className="my-5 justify-content-center">
            <Col md={5} >
            <img height={500} src = {movie.Image} alt="movie cover" className="img-fluid"/>
            </Col>
            <Col md={3}>
                <div>
                <span>{movie.Title}</span>
                </div>
            <div>
                <span>Director: </span>
                <span>{movie.Director?.Name}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.Genre?.Name}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.Description}</span>
            </div>
            <Button onClick={onBackClick} variant="link">Back</Button>
            </Col>
            </Row>
    );
};

//             <Link to={`/`}>
//                 <Button 
//                 className="back-button" 
//                 variant="primary" 
//                 style={{ cursor: "pointer" }} > 
//                 Go Back 
//                 </Button>
//             </Link>
//             <Button 
//             variant="outline-primary"
//             style={{ cursor: "pointer"}}
//             onClick={() => onFavoriteToggle(movie._id)}
//             >
//                 {favoriteMovies.includes(movie._id) ? "Remove from Favorites" : "Add to Favorites"}
//             </Button>
//         </div>
//     );
// };

MovieView.propTypes = {
    movie: PropTypes.array.isRequired,
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
  }.isRequired