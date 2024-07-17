import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import backgroundImg from "./Backgound1.jpg"; // Ensure this path is correct

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    roles: [{ name: "ROLE_USER" }],
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let fieldErrors = { ...errors };

    if (name === "name" && !value.trim()) {
      fieldErrors[name] = "Name is required";
    } else if (name === "username" && !value.trim()) {
      fieldErrors[name] = "Username is required";
    } else if (name === "email" && !value.trim()) {
      fieldErrors[name] = "Email is required";
    } else if (name === "email" && value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        fieldErrors[name] = "Invalid email address";
      } else {
        delete fieldErrors[name];
      }
    } else if (name === "password" && !value.trim()) {
      fieldErrors[name] = "Password is required";
    } else if (name === "password" && value.trim()) {
      if (value.length < 5) {
        fieldErrors[name] = "Password must be at least 5 characters";
      } else if (value.length > 12) {
        fieldErrors[name] = "Password must be less than 12 characters";
      } else {
        delete fieldErrors[name];
      }
    } else {
      delete fieldErrors[name];
    }

    setErrors(fieldErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(user).forEach((key) => {
      if (key !== "roles") {
        validateField(key, user[key]);
        if (!user[key].trim()) {
          newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
        }
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await axios.post("http://localhost:8085/api/auth/register", user);
      alert("Registration Success");
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error.message);
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center min-vh-100" style={{ background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)' }}>
      <Row className="w-100" style={{ maxWidth: '900px' }}>
        <Col md={6} className="d-flex flex-column justify-content-center text-white p-4" style={{ background: `url(${backgroundImg}) no-repeat center center`, backgroundSize: 'cover' }}>
          <h2>Create your Account</h2>
          <p>Share your artwork and get projects!</p>
        </Col>
        <Col md={6} className="bg-white p-4 d-flex align-items-center">
          <div className="w-100">
            <h3>Sign Up</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" name="name" value={user.name} onChange={handleChange} />
                {errors.name && <div className="text-danger">{errors.name}</div>}
              </Form.Group>

              <Form.Group controlId="username" className="mt-3">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter your username" name="username" value={user.username} onChange={handleChange} />
                {errors.username && <div className="text-danger">{errors.username}</div>}
              </Form.Group>

              <Form.Group controlId="email" className="mt-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" name="email" value={user.email} onChange={handleChange} />
                {errors.email && <div className="text-danger">{errors.email}</div>}
              </Form.Group>

              <Form.Group controlId="password" className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter your password" name="password" value={user.password} onChange={handleChange} />
                {errors.password && <div className="text-danger">{errors.password}</div>}
              </Form.Group>

              <Button variant="dark" type="submit" className="w-100 mt-3" disabled={Object.keys(errors).length > 0 || !user.name.trim() || !user.username.trim() || !user.email.trim() || !user.password.trim()}>
                Register
              </Button>
            </Form>
            <div className="mt-4 text-center">
              <a href="/login" className="text-blue-700">Already have an account?</a>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
