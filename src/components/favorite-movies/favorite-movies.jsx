import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import PropTypes from "prop-types";

const ProfileFavoriteView = ({ user, token }) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [movies, setMovies] = useState([]);

  // const url = `https://movie-api-kiz1.onrender.com/users/${user.Username}/movies/${movieId}`;
  // const isFavorite = favoriteMovies.includes(movieId);
  // const method = isFavorite ? "DELETE" : "POST";

  // const handleFavoriteToggle = (movieId, isFavorite) => {
  //   if (isFavorite) {
  //     setFavoriteMovies(favoriteMovies.filter((id) => id !== movieId));
  //   } else {
  //     setFavoriteMovies([...favoriteMovies, movieId]);
  //   }
  // };

  useEffect(() => {
    fetch(`https://movie-api-kiz1.onrender.com/users/${user.Username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setFavoriteMovies(data.FavoriteMovies || []);
      })
      .catch((error) => {
        console.error("Error fetching favorite movies:", error);
      });

    fetch("`https://movie-api-kiz1.onrender.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            _id: movie._id,
            Title: movie.Title,
            Description: movie.Description,
            Genre: {
              Name: movie.Genre.Name,
            },
            Director: {
              Name: movie.Director.Name,
            },
          };
        });

        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [user.Username, token]);

  //   if (!token) {
  //     return;

  //     fetch(url, {
  //       method: method,
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((updatedUser) => {
  //         setFavoriteMovies(updatedUser.FavoriteMovies || []);
  //       })
  //       .catch((error) => {
  //         console.error(`Error toggling favorite for movie ${movieId}:`, error);
  //       });
  //   }

  //   fetch(`https://movie-api-kiz1.onrender.com/users/${user.Username}`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setFavoriteMovies(data.FavoriteMovies || []);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching movies: ", error);
  //     });

  //   fetch(`https://movie-api-kiz1.onrender.com/movies`, {
  //     headers: { Authorization: `Bearer ${token}` },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       setMovies(data || []);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching movies:", error);
  //     });
  // }, [user.Username, token]);

  //       const moviesFromApi = data.map((movie) => {
  //         return {
  //           _id: movie._id,
  //           Image: movie.Image,
  //           Title: movie.Title,
  //           Description: movie.Description,
  //           Genre: {
  //             Name: movie.Genre.Name,
  //           },
  //           Director: {
  //             Name: movie.Director.Name,
  //           },
  //         };
  //       });

  //       setMovies(moviesFromApi);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching movies:", error);
  //     });
  // }, [user.Username, token]);

  const handleToggle = (movieId) => {
    const url = `https://movie-api-kiz1.onrender.com/users/${user.Username}/movies/${movieId}`;
    const isFavorite = favoriteMovies.some((movie) => movie === movieId);
    // const isFavorite = favoriteMovies.includes(movieId);
    const method = isFavorite ? "DELETE" : "POST";

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setFavoriteMovies(data.FavoriteMovies || []);
      })
      .catch((error) => {
        console.error(`Error toggling favorite for Movie: ${movieId}:`, error);
      });
  };

  const addedFavoriteMovies = movies.filter((movie) =>
    favoriteMovies.includes(movie._id)
  );

  return (
    <div>
      <h2> Favorite Movies </h2>
      {addedFavoriteMovies.length === 0 ? (
        <p> No Favorite Movies </p>
      ) : (
        <div>
          {addedFavoriteMovies.map((movie) => (
            <Card
              key={movie._id}
              style={{ width: "18rem", marginBottom: "15px" }}
            >
              <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Description}</Card.Text>
                <Button
                  variant="primary"
                  onClick={() => handleToggle(movie._id)}
                >
                  Remove from Favorites
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
  // <div>
  //   {addedFavoriteMovies.map((movie) => (
  //     <MovieCard
  //       key={movie._id}
  //       movie={movie}
  //       favoriteMovies={favoriteMovies}
  //       onFavoriteToggle={handleFavoriteToggle}
  //     />
  //   ))}
  // </div>
};

ProfileFavoriteView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
  }).isRequired,
  token: PropTypes.string.isRequired,
};
//   movies: PropTypes.array,
//   movie: PropTypes.string,
//   Image: PropTypes.string,
//   user: PropTypes.shape({
//     Username: PropTypes.string.isRequired,
//   }).isRequired,
//   token: PropTypes.string.isRequired,
// };

export default ProfileFavoriteView;
