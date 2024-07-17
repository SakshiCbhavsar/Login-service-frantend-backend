import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const SignupComponent = () => {
  return (
    <Container fluid className="d-flex justify-content-center align-items-center min-vh-100" style={{ background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)' }}>
      <Row className="w-100" style={{ maxWidth: '900px' }}>
        <Col md={6} className="d-flex flex-column justify-content-center text-white p-4" style={{ background: 'url(src/Backgound.png) no-repeat center center', backgroundSize: 'cover' }}>
          <h2>Create your Account</h2>
          <p>Share your artwork and get projects!</p>
        </Col>
        <Col md={6} className="bg-white p-4">
          <h3>Sign Up</h3>
          <Form>
            <Form.Group controlId="firstName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your first name" />
            </Form.Group>

            <Form.Group controlId="lastName" className="mt-3">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter your last name" />
            </Form.Group>

            <Form.Group controlId="email" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter your email address" />
            </Form.Group>

            <Form.Group controlId="password" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter your password" />
            </Form.Group>

            <Button variant="dark" type="submit" className="w-100 mt-3">
              Register
            </Button>

          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupComponent;
