import PropTypes from "prop-types";
export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <div
        onClick = {() => {
            onMovieClick(movie);
        }}
        >
        <h2>{movie.Title}</h2>
        </div>  
    );
};

    MovieCard.propTypes = {
        movie: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Director: PropTypes.shape({
          Name: PropTypes.string.isRequired,
          Date_of_Birth: PropTypes.string.isRequired,
          Date_of_Death: PropTypes.string,
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

       