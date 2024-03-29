import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";


// const handleFavoriteToggle = (movieId, movieTitle) => {
//     const url = `https://movie-api-kiz1.onrender.com/users/${user.Username}/movies/${movieId}`;
//     const isFavorite = favoriteMovies.includes(movieId);
//     const method = isFavorite ? "DELETE" : "POST";
//     const [favoriteMovies, setFavoriteMovies] = useState([]);

//     fetch(url, {
//         method: method,
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//         },
//     })
// .then((response) => {
//     if (response.ok) {
//         setShowConfirmation(true);
//         setAddedMovieTitle(movieTitle);

//     setTimeout(() => {
//         setShowConfirmation(false);
//         setAddedMovieTitle("");
//     }, 2000);
// } 
// })
// .catch((error) => {
//     console.error(`Error toggling favorite for movie with ID ${movieId}:`, error);
// });
// };

export const MovieView = ({ movies, onFavoriteToggle }) => {
    const { movieId } = useParams();
    const decodedMovieId = decodeURIComponent(movieId);
    const movie = movies.find((b) => b._id === decodedMovieId);

    console.log("movieId:", movieId);
    console.log("movies:", movies);
    console.log("movie:", movie);

        return (
            <div>
                         <div>
                             <img height={500} src = {movie?.Image} alt="Movie Poster" />
                       </div>
                         <div>
                             <span>Title: </span>
                             <span>{movie.Title || "No Title"}</span>
                         </div>
                         <div>
                             <span>Director: </span>
                             <span>{movie.Director?.Name || "No Director"}</span>
                         </div>
                         <div>
                         <span>Genre: </span>
                             <span>{movie.Genre?.Name || "No Genre"}</span>
                        </div>
                         <div>
                             <span>Description: </span>
                             <span>{movie.Description || "No Description"}</span>
                         </div>
                     <Link to={`/`}>
                        <Button className="back-button" variant="primary" style={{ cursor: "pointer"}}>
                            Back
                        </Button>
                     </Link>
                     <Button
                      variant= "outline-primary"
                      style={{ cursor: "pointer"}}
                      onClick={() => onFavoriteToggle(movie._id)}
                      >
                        {movie.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                      </Button>
                      </div>
        );
};

MovieView.propTypes = {
    movies: PropTypes.array.isRequired,
    handleFavoriteToggle: PropTypes.func.isRequired
};

export default MovieView;


