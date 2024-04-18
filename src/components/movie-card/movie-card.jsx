import React from "react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, isFavorite }) => {
  const storedToken = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  const [addTitle, setAddTitle] = useState("");
  const [delTitle, setDelTitle] = useState("");

  // useEffect(() => {
  //   const addToFavorites = () => {
  //     fetch(
  //       `https://movie-api-kiz1.onrender.com/users/${
  //         user.Username
  //       }/movies/${encodeURIComponent(movie.Title)}`,
  //       {
  //         method: "POST",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     )
  //       .then((response) => {
  //         if (!response.ok) {
  //           throw new Error("Failed to add movie to favorites.");
  //         }
  //         alert("Movie added to favorites successfully!");
  //         window.location.reload();
  //         return response.json();
  //       })
  //       .then((user) => {
  //         if (user) {
  //           localStorage.setItem("user", JSON.stringify(user));
  //           setUser(user);
  //         }
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   };
  //   const removeFromFavorites = () => {
  //     fetch(
  //       `https://movie-api-kiz1.onrender.com/users/${
  //         user.Username
  //       }/movies/${encodeURIComponent(movie.Title)}`,
  //       {
  //         method: "DELETE",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     )
  //       .then((response) => {
  //         if (!response.ok) {
  //           throw new Error("Failed to remove movie from favorites.");
  //         }
  //         alert("Movie removed from favorites successfully!");
  //         window.location.reload();
  //         return response.json();
  //       })
  //       .then((user) => {
  //         if (user) {
  //           localStorage.setItem("user", JSON.stringify(user));
  //           setUser(user);
  //         }
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   };
  //   if (addTitle) {
  //     addToFavorites();
  //   }
  //   if (delTitle) {
  //     removeFromFavorites();
  //   }
  // }, [addTitle, delTitle, token]);

  // const handleAddToFavorites = () => {
  //   setAddTitle(movie.title);
  // };
  // const handleRemoveFromFavorites = () => {
  //   setDelTitle(movie.title);
  // };

  return (
    <>
      <Link
        to={`/movies/${encodeURIComponent(movie._id)}`}
        className="movie-view"
      >
        <Card className="h-100">
          <Card.Img variant="top" src={movie.Image} />
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>{movie.Genre.Name}</Card.Text>
            <Card.Text>{movie.Director.Name}</Card.Text>
          </Card.Body>
        </Card>
      </Link>

      <Card>
        {isFavorite ? (
          <Button variant="primary" onClick={handleRemoveFromFavorites}>
            Remove
          </Button>
        ) : (
          <Button variant="primary" onClick={handleAddToFavorites}>
            Add
          </Button>
        )}
      </Card>
    </>
  );
};

MovieCard.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string,
    Image: PropTypes.string,
    Director: PropTypes.shape({
      Name: PropTypes.string,
    }),
  }).isRequired,
};
