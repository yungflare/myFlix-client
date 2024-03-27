import React from "react";
import { Link } from "react-router-dom";
import "./movie-view.scss";
import { Button } from "react-bootstrap";
import { PropTypes } from "prop-types";

export const MovieView = ({ movies, handleFavoriteToggle, isFavorite }) => {
        return (
        <div>
            {movies.map((movie) => (
                <div key={movie._id} className="movie-card">
                    <img src={movie.Image} alt="Movie Poster" />
                    <h3>{movie.Title}</h3>
                    <button 
                    variant = "outline-primary"
                    style={{ cursor: "pointer"}}
                    onClick={() => handleFavoriteToggle(movie._id, movie.Title)}
                    >
                        {movie.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                    </button>
                    </div>
            ))}
            </div>
        );
            };

    //                 <p>Director: {movie.Director.Name}</p>
    //                 <p>Genre: {movie.Genre.Name}</p>
    //                 <p>Description: {movie.Description}</p>
    //                 <button
    //                     variant="outline-primary"
    //                     style={{ cursor: "pointer" }}
    //                     onClick={() => handleFavoriteToggle(movie._id, movie.Title)}
    //                 >
    //                     {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
    //                 </button>
    //                 </div>
    //         ))}
    //         </div>
    //     );
    // } ;

    const handleFavoriteToggle = (movieId, movieTitle) => {
                const url = `https://movie-api-kiz1.onrender.com/users/${user.Username}/movies/${movieId}`;
                const isFavorite = favoriteMovies.includes(movieId);
                const method = isFavorite ? "DELETE" : "POST";
    
                fetch(url, {
                    method: method,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                })
            .then((response) => {
                if (response.ok) {
            
                setShowConfirmation(true);
                setAddedMovieTitle(movieTitle);
    
                setTimeout(() => {
                    setShowConfirmation(false);
                    setAddedMovieTitle("");
                }, 2000);
            } 
        })
            .catch((error) => {
                console.error(`Error toggling favorite for movie with ID ${movieId}:`, error);
            });
        };

//     // Check if the isFavorite property exists in movie
//     const isFavorite = movie.isFavorite || false;

//     return (
//         <div>
//             <div>
//                 <img height={500} src = {movie?.Image} alt="Movie Poster" />
//             </div>
//             <div>
//                 <span>Title: </span>
//                 <span>{movie.Title}</span>
//             </div>
//             <div>
//                 <span>Director: </span>
//                 <span>{movie.Director?.Name}</span>
//             </div>
//             <div>
//                 <span>Genre: </span>
//                 <span>{movie.Genre?.Name}</span>
//             </div>
//             <div>
//                 <span>Description: </span>
//                 <span>{movie.Description}</span>
//             </div>
//             <div>
                
//             <Link to={`/`}>
//                 <button 
//                 className="back-button" 
//                 variant="primary" 
//                 style={{ cursor: "pointer" }} > 
//                 Go Back 
//                 </button>
//             </Link>
//             <button 
//             variant="outline-primary"
//             style={{ cursor: "pointer"}}
//             onClick={() => handleFavoriteToggle(movie._id, movie.Title)}
//             >
//                 {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
//             </button>
//             </div>
//             </div>
//     );
// };

MovieView.propTypes = {
    movies: PropTypes.array.isRequired,
    onFavoriteToggle: PropTypes.func.isRequired
};

export default MovieView;


//   MovieView.propTypes = {
//     movie: PropTypes.array.isRequired,
//     Title: PropTypes.string.isRequired,
//     Description: PropTypes.string.isRequired,
//     Director: PropTypes.shape({
//       Name: PropTypes.string.isRequired,
//       Description: PropTypes.string
//     }),
//     Genre: PropTypes.shape({
//       Name: PropTypes.string.isRequired,
//       Description: PropTypes.string
//     }),
//   }.isRequired