import React from "react";
import { Form, Col } from "react-bootstrap";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <Col className="mb-3">
      <Form>
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
