import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import PropTypes from "prop-types";
import { UserInfo } from "./user-info";
import { Button, Card, Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
=======
import { Button, Card } from "react-bootstrap";
>>>>>>> parent of ef1aadd (Starting Over)
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

export const ProfileView = ({ user, onUserUpdate, onDeregister }) => {
  const [newUsername, setNewUsername] = useState(user.Username);
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState(user.Email);
  const [newBirthday, setNewBirthday] = useState(user.Birthday);
  // const [favoriteMovies, setFavoriteMovies] = useState([]);

  // useEffect(() => {
  //   setFavoriteMovies(user.favoriteMovies || []);
  // }, [user]);

  const handleUpdate = () => {
    const updatedUser = {
      Username: newUsername,
      Password: newPassword,
      Email: newEmail,
      Birthday: newBirthday,
    };
    onUserUpdate(updatedUser);
  };

  return (
    <div>
      <h1> My Profile </h1>
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>New Password:</Form.Label>
          <Form.Control
            type="text"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Update Email:</Form.Label>
          <Form.Control
            type="text"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBirthday">
          <Form.Label>Update Birthday:</Form.Label>
          <Form.Control
            type="text"
            value={newBirthday}
            onChange={(e) => setNewBirthday(e.target.value)}
            required
          />
        </Form.Group>

        <Link to="/profile/favorites">
          <Button variant="primary">Favorite Movies</Button>
        </Link>

        <Button variant="primary" onClick={handleUpdate}>
          Update Profile
        </Button>
      </Form>

      <Button variant="danger" onClick={onDeregister}>
        Delete Account
      </Button>
    </div>
  );
};
ProfileView.propTypes = {
  localUser: PropTypes.object.isRequired,
  movies: PropTypes.array.isRequired,
  token: PropTypes.string.isRequired,
};
