import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import PropTypes from "prop-types";

const ProfileFavoriteView = ({ user, token, handleFavoriteToggle }) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch(`https://movie-api-kiz1.onrender.com/users/${user.Username}`, {
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((movieId) => {
        setFavoriteMovies(movieId.FavoriteMovies || []);
      })
      .catch((error) => {
        console.error("Error toggling favorite movies: ", error);
      });

    fetch(`https://movie-api-kiz1.onrender.com/movies`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((movieId) => {
        console.log(movieId);
        setMovies(movieId || []);
        // setFavoriteMovies(data.FavoriteMovies || []);
      })
      .catch((error) => {
        console.error("Error fetching movies: ", error);
      });
  }, [user.Username, token]);

  return (
    <div>
      <h2> Favorite Movies </h2>
      {favoriteMovies.length === 0 ? (
        <p> No Favorite Movies </p>
      ) : (
        <div>
          {movies.map((movie) => (
            <MovieCard
              key={movie._id}
              movieId={movie}
              favoriteMovies={favoriteMovies}
              onFavoriteToggle={handleFavoriteToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
};

ProfileFavoriteView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
  }).isRequired,
  token: PropTypes.string.isRequired,
  handleFavoriteToggle: PropTypes.func.isRequired,
};

export default ProfileFavoriteView;
