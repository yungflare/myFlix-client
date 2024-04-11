import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

export const MovieCard = ({ movie, isFavorite, addMovie, removeMovie }) => {
  const add = () => addMovie(movie._id);
  const remove = () => removeMovie(movie._id);

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Text>
            <Row className="justify-content-md-center">
              <Col className="w-100">
                {isFavorite.includes(movie) ? (
                  <Button onClick={remove} className="primary-button"></Button>
                ) : (
                  <Button onClick={add} className="primaryButton"></Button>
                )}
                <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
                  <Button variant="primary" className="primaryButton">
                    CLICK
                  </Button>
                </Link>
              </Col>
            </Row>
          </Card.Text>
        </Card.Body>
        <Card.Img variant="top" src={movie.Image} className="moviePoster" />
      </Card>
    </>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string,
    Description: PropTypes.string,
    Image: PropTypes.string,
    Director: PropTypes.shape({
      Name: PropTypes.string,
    }),
    isFavorite: PropTypes.bool,
  }).isRequired,
  onFavoriteToggle: PropTypes.func.isRequired,
};
