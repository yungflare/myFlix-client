import "./movie-view.scss";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const MovieView = ({ movies }) => {
    const { movieId } = useParams();
    const decodedMovieId = decodeURIComponent(movieId);
    const movie = movies.find((b) => b.id === movieId);

    return (
        <div>
            <div>
                <img height={500} src = {movie.Image} />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.Title}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.Director.Name}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.Genre.Name}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.Description}</span>
            </div>
            <Link to={`/movies`}>
                <button className="back-button"> Go Back </button>
            </Link>
        </div>
    );
};

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