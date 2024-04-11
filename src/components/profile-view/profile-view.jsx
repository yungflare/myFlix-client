import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

export const ProfileView = ({ user, onUserUpdate, onDeregister, movies }) => {
  const [newUsername, setNewUsername] = useState(user.Username);
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState(user.Email);
  const [newBirthday, setNewBirthday] = useState(user.Birthday);
  const [favoritemovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    setFavoriteMovies(user.favoritemovies || []);
  }, [user]);

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

        <Link to="users/:username/favorite-movies">
          <Button variant="primary">Favorite Movies</Button>
        </Link>
        <Button variant="primary" onClick={handleUpdate}>
          Update Profile
        </Button>

        <Button variant="danger" onClick={onDeregister}>
          Delete Account
        </Button>
      </Form>

      <h3>Favorite Movies</h3>
      {favoritemovies.length === 0 ? (
        <p>No favorite movies added yet.</p>
      ) : (
        <ul>
          {favoritemovies.map((movie) => (
            <li key={movie._id}>{movie.Title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProfileView;
