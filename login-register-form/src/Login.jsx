import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {jwtDecode} from "jwt-decode";
import backgroundImg from "./Backgound1.jpg"; // Make sure this path is correct

const Login = () => {
  const navigate = useNavigate();
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange1 = (e) => {
    const value = e.target.value;
    setUsernameOrEmail(value);
    if (!value.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        usernameOrEmail: "Email is required",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, usernameOrEmail: "" }));
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (!value.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password is required",
      }));
    } else if (value.length < 5) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be at least 5 characters",
      }));
    } else if (value.length > 12) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be less than 12 characters",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const errors = {};
    if (!usernameOrEmail.trim()) {
      errors.usernameOrEmail = "Email is required";
    }
    if (!password.trim()) {
      errors.password = "Password is required";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    try {
      const response = await axios.post("http://localhost:8085/api/auth/login", {
        usernameOrEmail,
        password,
      });

      const { accessToken } = response.data;
      const decodedToken = jwtDecode(accessToken);
      const role = decodedToken.authorities[0];

      localStorage.setItem("token", accessToken);
      localStorage.setItem("role", role);

      if (role === "ROLE_ADMIN") {
        navigate("/admin-dashboard", { state: { usernameOrEmail } });
      } else if (role === "ROLE_USER") {
        navigate("/", { state: { usernameOrEmail } });
        alert("Login Success");
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, form: "Invalid credentials" }));
      }
    } catch (error) {
      setErrors((prevErrors) => ({ ...prevErrors, form: "Login failed" }));
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center min-vh-100" style={{ background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)' }}>
      <Row className="w-100" style={{ maxWidth: '900px' }}>
        <Col md={6} className="d-flex flex-column justify-content-center text-white p-4" style={{ background: `url(${backgroundImg}) no-repeat center center`, backgroundSize: 'cover' }}>
          <h2>Create your Account</h2>
          <p>Share your artwork and get projects!</p>
        </Col>
        <Col md={6} className="bg-white p-4">
          <h3>Login</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="usernameOrEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" value={usernameOrEmail} onChange={handleChange1} />
              {errors.usernameOrEmail && <div className="text-danger">{errors.usernameOrEmail}</div>}
            </Form.Group>

            <Form.Group controlId="password" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter your password" value={password} onChange={handleChange} />
              {errors.password && <div className="text-danger">{errors.password}</div>}
            </Form.Group>

            <Button variant="dark" type="submit" className="w-100 mt-3" disabled={!usernameOrEmail || !password}>
              Login
            </Button>

            <Button variant="outline-success" className="w-100 mt-3" onClick={() => navigate("/loginSignUp")}>
              Register
            </Button>
          </Form>
          <div className="mt-4 text-center">
            <a href="https://www.example.com" className="text-blue-700">Forgot Password?</a>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
