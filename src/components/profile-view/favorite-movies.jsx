import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { MovieCard } from "../movie-card/movie-card";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const FavoriteMovies = ({ user, favoriteMovies }) => {
  return (
    <Row>
      <Col md={12}>
        <h3>My Movies</h3>
      </Col>
      <Row>
        {favoriteMovies.map((movie) => {
          return (
            <Col className="mb-5" key={movie.id} md={4}>
              <Link to={`/movies/${movie.title}`} />
              <MovieCard
                movie={movie}
                isFavorite={user.favoriteMovies.includes(movie.title)}
              />
            </Col>
          );
        })}
      </Row>
    </Row>
  );
};

FavoriteMovies.propTypes = {
  favoriteMovies: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
};
