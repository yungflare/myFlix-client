import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import NavigationBar from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import ProfileFavoritesView from "../favorite-movies/favorite-movies";
import SearchBar from "../SearchBar/search-filter";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

export const MainView = ({ updatedUser, onDeregister }) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (user) {
      setFavoriteMovies(user.FavoriteMovies || []);
    }
  }, [user]);

  const handleFavoriteToggle = (movieId) => {
    const url = `https://movie-api-kiz1.onrender.com/users/${user.Username}/movies/${movieId}`;

    const isFavorite = favoriteMovies.includes(movieId);

    const method = isFavorite ? "POST" : "PUT";

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((updatedUser) => {
        setFavoriteMovies(updatedUser.FavoriteMovies || []);
      })
      .catch((error) => {
        console.error(`Error Toggling Movie ID `, error);
      });
  };

  // const handleUserUpdate = (updatedUser) => {
  //   console.log("Updating user:", updatedUser);
  //   onUserUpdate(updatedUser);
  // };

  const handleDeregister = () => {
    console.log("Deleting User:", user);
    onDeregister();
  };

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch(`https://movie-api-kiz1.onrender.com/movies`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((movies) => {
        const moviesFromApi = movies.map((movie) => {
          return {
            _id: movie._id,
            Image: movie.Image,
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
      });
  }, [token]);

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.open("/", "_self");
        }}
        token={token}
      />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/signup" />
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
                  <Navigate to="/movies" />
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
            path="/"
            element={
              <>
                {user ? (
                  <Navigate to="/movies" />
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
            path="/movies"
            element={
              <>
                <SearchBar
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                />
                {!user ? (
                  <Navigate to="/" />
                ) : movies.length === 0 ? (
                  <Col>List is empty!</Col>
                ) : (
                  <>
                    <Row>
                      {movies
                        .filter((movie) =>
                          movie.Title.toLowerCase().includes(
                            searchTerm.toLowerCase()
                          )
                        )
                        .map((movie) => (
                          <Col className="mb-4" key={movie._id} md={3}>
                            <MovieCard
                              movie={movie}
                              onFavoriteToggle={handleFavoriteToggle}
                              favoriteMovies={favoriteMovies}
                            />
                          </Col>
                        ))}
                    </Row>
                  </>
                )}
              </>
            }
          />
          {/* 
          <Route
            path="/movies"
            element={
              <>
                {!user ? (
                  <Navigate to="/" />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    <Row>
                      {movies.map((movie) => (
                        <Col className="mb-4" key={movie._id} md={3}>
                          <MovieCard
                            movie={movie}
                            onFavoriteToggle={handleFavoriteToggle}
                            favoriteMovies={favoriteMovies}
                          />
                        </Col>
                      ))}
                    </Row>
                  </>
                )}
              </>
            }
          /> */}
          <Route
            path="/profile"
            element={
              <ProfileView
                user={user}
                onUserUpdate={updatedUser}
                onDeregister={handleDeregister}
                token={token}
              />
            }
          />

          <Route
            path="/profile/favorites"
            element={
              <ProfileFavoritesView
                user={user}
                onFavoriteToggle={handleFavoriteToggle}
                token={token}
              />
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
