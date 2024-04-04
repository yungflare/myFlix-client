import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { ProfileFavoriteView } from "../favorite-movies/favorite-movies";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = ({ onUserUpdate, onDeregister }) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);

  const handleFavoriteToggle = (movieId) => {
    fetch(
      `https://movie-api-kiz1.onrender.com/user/${user._id}/favorites/${movieId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          console.error(`Error toggling favorite movie with ID ${movieId}`);
          return response.json();
        }
        return response.json();
      })
      .then((data) => {
        console.log("Toggling Favorite:", data);
        setFavoriteMovies(data.favoriteMovies);
      })
      .catch((error) =>
        console.error(
          `Error toggling favorite movies with ID ${movieId}:`,
          error
        )
      );
  };

  const handleUserUpdate = (updatedUser) => {
    console.log("Updating user:", updatedUser);
    onUserUpdate(updatedUser);
  };

  const handleDeregister = () => {
    console.log("Deleting User:", user);
    onDeregister();
  };

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://movie-api-kiz1.onrender.com/movies", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
              Description: movie.Genre.Description,
            },
            Director: {
              Name: movie.Director.Name,
              Bio: movie.Director.Bio,
              // Birth: movie.Director.Date_of_Birth,
            },
          };
        });
        setMovies(moviesFromApi);
      });
  }, [token]);

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          // localStorage.removeItem("token");
          // localStorage.removeItem("user");
        }}
      />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />

          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col> List is Empty! </Col>
                ) : (
                  <Col md={8}>
                    <MovieView
                      movies={movies}
                      onFavoriteToggle={handleFavoriteToggle}
                    />
                  </Col>
                )}
              </>
            }
          />

          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col> Empty! </Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className="mb-4" key={movie._id} md={3}>
                        <MovieCard
                          movie={movie}
                          onFavoriteToggle={handleFavoriteToggle}
                        />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />

          <Route
            path="/profile"
            element={
              <ProfileView
                user={user}
                onUserUpdate={handleUserUpdate}
                onDeregister={handleDeregister}
              />
            }
          />

          <Route
            path="/profile/favorites"
            element={
              <ProfileFavoriteView
                user={user}
                onFavoriteToggle={handleFavoriteToggle}
              />
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
