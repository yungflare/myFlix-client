import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import PropTypes from "prop-types";

const ProfileFavoritesView = ({ user, token }) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(
      `https://movie-api-kiz1.onrender.com/users/${user.Username}/movies/${movie._id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setFavoriteMovies(data.FavoriteMovies || []);
      })
      .catch((error) => {
        console.error("Error fetching favorite movies:", error);
      });

    fetch(
      `https://movie-api-kiz1.onrender.com/users/${user.Username}/movies/${movie._id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
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

  const handleToggle = (movieId) => {
    const url = `https://movie-api-kiz1.onrender.com/users/${user.Username}/movies/${movie._id}`;

    const isFavorite = favoriteMovies.some((movie) => movie === movieId);

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
        console.error(
          `Error toggling favorite for movie ID ${movieId}:`,
          error
        );
      });
  };

  const favoriteMoviesToShow = movies.filter((movie) =>
    favoriteMovies.includes(movie._id)
  );

  return (
    <div>
      <h2> Favorite Movies </h2>
      {favoriteMoviesToShow.length === 0 ? (
        <p>No Favorite Movies</p>
      ) : (
        <div>
          {favoriteMoviesToShow.map((movie) => (
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
};

ProfileFavoritesView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string,
  }).isRequired,
  token: PropTypes.string,
};

export default ProfileFavoritesView;
