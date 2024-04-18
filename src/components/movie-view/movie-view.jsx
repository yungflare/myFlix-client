import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import "./movie-view.scss";
import { title } from "process";

export const MovieView = ({ movies, onFavoriteToggle }) => {
  const { movieId } = useParams();
<<<<<<< HEAD
  const movie = movies.find((m) => m.id === movieId);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  const [addTitle, setAddTitle] = useState("");
  const [delTitle, setDelTitle] = useState("");

  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    const addToFavorites = () => {
      fetch(
        `https://movie-api-kiz1.onrender.com/users/${
          user.Username
        }/movies/${encodeURIComponent(movie.Title)}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to add movie to favorites.");
          }
          alert("Movie added to favorites successfully!");
          window.location.reload();
          return response.json();
        })
        .then((user) => {
          if (user) {
            localStorage.setItem("user", JSON.stringify(user));
            setUser(user);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
    const removeFromFavorites = () => {
      fetch(
        `https://movie-api-kiz1.onrender.com/users/${
          user.Username
        }/movies/${encodeURIComponent(movie.Title)}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to remove movie from favorites.");
          }
          alert("Movie removed from favorites successfully!");
          window.location.reload();
          return response.json();
        })
        .then((user) => {
          if (user) {
            localStorage.setItem("user", JSON.stringify(user));
            setUser(user);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
    if (addTitle) {
      addToFavorites();
    }
    if (delTitle) {
      removeFromFavorites();
    }
  }, [addTitle, delTitle, token]);

  const handleAddToFavorites = () => {
    setAddTitle(movie.title);
  };
  const handleRemoveFromFavorites = () => {
    setDelTitle(movie.title);
  };
=======
  const decodedMovieId = decodeURIComponent(movieId);
  const movie = movies.find((b) => b._id === decodedMovieId);
  const isFavorite = movies.includes(decodedMovieId);

  // console.log("movieId:", movieId);
  // console.log("movies:", movies);
  // console.log("movie:", movie);
>>>>>>> parent of ef1aadd (Starting Over)

  return (
    <div>
      <div>
        <img height={500} src={movie.Image} alt="Movie Poster" />
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
      <Link to={`/movies`}>
        <Button
          className="back-button"
          variant="primary"
          style={{ cursor: "pointer" }}
        >
          Back
        </Button>
      </Link>

      <Button
        variant={isFavorite ? "danger" : "outline-primary"}
        style={{ cursor: "pointer" }}
        onClick={() => onFavoriteToggle(movieId)}
      >
        Add to Favorites!
      </Button>
    </div>
  );
};

MovieView.propTypes = {
  movies: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string,
    Image: PropTypes.string,
    Director: PropTypes.shape({
      Name: PropTypes.string,
      Genre: PropTypes.shape({
        Name: PropTypes.string,
      }).isRequired,
    }),
  }),
  onFavoriteToggle: PropTypes.func.isRequired,
  favoriteMovies: PropTypes.array.isRequired,
};
