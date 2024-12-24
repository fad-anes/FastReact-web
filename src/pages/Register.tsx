import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';
import './Login.css'; 

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [passwordconfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !passwordconfirm || !username ) {
        setError('All fields are required.');
        return;
      }
    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setError('Please enter a valid email.');
      return;
    }

    if (password!=passwordconfirm ) {
        setError('you need to confirm the password.');
        return;
      }

    
    try {
      const response = await register(email, password,username);
      if (response) {
        navigate('/login');
      }
    } catch (error) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <Container fluid className="login-container">
      <Row className="justify-content-center">
        <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
          <div className="login-form-container">
            <h2 className="mt-5">Register</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
                <Form.Label>username</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter username" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)} 
                />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                  type="email" 
                  placeholder="Enter email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder="Enter password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                />
              </Form.Group>

              <Form.Group controlId="formPasswordconfirm">
                <Form.Label>Confirm password</Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder="Enter confirm password" 
                  value={passwordconfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)} 
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="mt-3">
                Register
              </Button>
            </Form>
            <div className="mt-3">
              You have an account? <a href="/login">Login here</a>
            </div>
          </div>
        </Col>
        <Col xs={12} md={6} className="login-image-col">
          <img src="/images/3094352.jpg" alt="Login" className="login-image" />
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
