import React from "react";
import { Form, Col } from "react-bootstrap";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Col className="mb-3">
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Search Movie"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Form.Group>
      </Form>
    </Col>
  );
};

export default SearchBar;
