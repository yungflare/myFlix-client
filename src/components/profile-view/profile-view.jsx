import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Form, Button} from "react-bootstrap";
import { Link } from "react-router-dom";

export const ProfileView = ({ user, onUserUpdate, onDeregister, movies }) => {
    const [newUsername, setNewUsername] = useState(user.Username);
    const [newPassword, setNewPassword] = useState("");
    const [newEmail, setNewEmail] = useState(user.Email);
    const [newBirthday, setNewBirthday] = useState(user.Birthday);
    const [validationError, setValidationError] = useState(null);

    let favoriteMovies = movies.filter(movie => user.FavoriteMovies.includes(movie._id));

    const handleUpdate = () => {
        if (!newUsername || !newEmail || !newBirthday || !newPassword) {
            setValidationError("All fields are required");
            return;
          }
        const updatedUser = {
            Username: newUsername,
            Password: newPassword,
            Email: newEmail,
            Birthday: newBirthday
        };
        onUserUpdate(updatedUser);
    };

    return (
        <div>
            <h1> My Profile </h1>
            {validationError && <p className="text-danger">{validationError}</p>}
            <Form>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    required />
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>New Password:</Form.Label>
                    <Form.Control
                    type="text"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                     />
                </Form.Group>

                <Form.Group controlId="formEmail">
                    <Form.Label>Update Email:</Form.Label>
                    <Form.Control
                    type="text"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    required />
                </Form.Group>

                <Form.Group controlId="formBirthday">
                    <Form.Label>Update Birthday:</Form.Label>
                    <Form.Control
                    type="text"
                    value={newBirthday}
                    onChange={(e) => setNewBirthday(e.target.value)} 
                    required/>
                </Form.Group>

                <div>
                    <h2> Favorite Movies</h2>
                    <ul>
                        {favoriteMovies.map(movie => (
                            <li key={movie._id}>
                                {movie.Title}
                            </li>
                        ))}
                    </ul>
                </div>

                <Link to="/profile/favorites">
                    <Button variant="primary" onClick={handleUpdate}>
                        Update Profile 
                    </Button>
            </Link>

                    <Button variant="danger" onClick={onDeregister}>
                        Delete Account
                    </Button>
            </Form>
        </div>
    );

};

export default ProfileView;