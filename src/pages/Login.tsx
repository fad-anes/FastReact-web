import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import './Login.css'; 

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password ) {
      setError('All fields are required.');
      return;
    }
    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setError('Please enter a valid email.');
      return;
    }

    

    // Appeler le service de connexion
    try {
      const response = await login(email, password);
      if (response) {
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('user-name', response.user.username);
        localStorage.setItem('user-role', response.user.role);
        localStorage.setItem('user-id', response.user.id);
        navigate(response.user.role === 'admin' ? '/dashboard' : '/');
      }
    } catch (error:any) {
      setError(error.response.data.detail);
    }
  };

  return (
    <Container fluid className="login-container">
      <Row className="justify-content-center">
        <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
          <div className="login-form-container">
            <h2 className="mt-5">Login</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <Form onSubmit={handleSubmit}>
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

              <Button variant="primary" type="submit" className="mt-3">
                Login
              </Button>
            </Form>
            <div className="mt-3">
              Don't have an account? <a href="/register">Register here</a>
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

export default Login;
