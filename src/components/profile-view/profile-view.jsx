import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export const ProfileView = ({ user, onDeregister }) => {
  const [newUsername, setNewUsername] = useState(user.Username);
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState(user.Email);
  const [newBirthday, setNewBirthday] = useState(user.Birthday);

  const handleUpdate = () => {
    const updatedUser = {
      Username: newUsername,
      Password: newPassword,
      Email: newEmail,
      Birthday: newBirthday,
    };
    console.log("Updating user:", updatedUser);

    window.location.reload();
  };

  const handleDeregister = () => {
    console.log("Deleting User:", user);
    onDeregister();
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
            type="date"
            value={newBirthday}
            onChange={(e) => setNewBirthday(e.target.value)}
            required
          />
        </Form.Group>

        <Link to="/profile/favorites">
          <Button variant="primary">Favorite Movies</Button>
        </Link>

        <Link to="/profile">
          <Button variant="primary" onClick={handleUpdate}>
            Update Profile
          </Button>
        </Link>
      </Form>

      <Button variant="danger" onClick={handleDeregister}>
        Delete Account
      </Button>
    </div>
  );
};
