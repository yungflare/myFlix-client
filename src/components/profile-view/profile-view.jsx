import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const ProfileView = ({ user, onDeregister }) => {
  const storedToken = localStorage.getItem("token");
  const [newUsername, setNewUsername] = useState(user.Username);
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState(user.Email);
  const [newBirthday, setNewBirthday] = useState(user.Birthday);

  const handleUpdate = async () => {
    const updatedUser = {
      Username: newUsername,
      Password: newPassword || "",
      Email: newEmail,
      Birthday: newBirthday,
      Password: newPassword,
    };

    if (newPassword) {
      updatedUser.Password = newPassword;
    }

    try {
      const response = await fetch(
        `https://movie-api-kiz1.onrender.com/users/${user.Username}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
          body: JSON.stringify(updatedUser),
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        if (response.status === 422) {
          console.error("Validation error:", errorResponse);
        } else {
          throw new Error("Failed to update Profile");
        }
      } else {
        console.log("User profile updated!");
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error("Error updating user profile: ", error.message);
    }
  };

  const handleDeregister = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to Delete your Account?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `https://movie-api-kiz1.onrender.com/users/${user.Username}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      if (response.ok) {
        console.log("User deleted successfully");
      } else {
        console.error("Failed to Delete User");
      }
    } catch (error) {
      console.error("Error Deleteing User:", error.message);
    }
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
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Update Email:</Form.Label>
          <Form.Control
            type="email"
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

ProfileView.propTypes = {
  user: PropTypes.object.isRequired,
  onDeregister: PropTypes.func.isRequired,
};
