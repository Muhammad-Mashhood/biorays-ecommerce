import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import './Auth.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setError('');
    
    // Add validation
    if (!email || !password) {
      return setError('Please fill in all fields');
    }
    
    try {
      setLoading(true);
      // Here you would add your authentication logic
      console.log('Logging in with:', email, password);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // On successful login, redirect to home page
      navigate('/');
      
      // Show success toast notification
      // You can create a global toast context or use browser alert for now
      alert('Login successful!');
    } catch (err) {
      setError('Failed to sign in. Please check your credentials.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="auth-container">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="auth-card">
            <Card.Body className="p-4 p-md-5">
              <h2 className="text-center auth-header">Welcome Back</h2>
              
              {error && <Alert variant="danger">{error}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4 auth-form-group" controlId="formBasicEmail">
                  <Form.Label className="auth-form-label">Email address</Form.Label>
                  <Form.Control 
                    className="auth-form-control"
                    type="email" 
                    placeholder="Enter your email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4 auth-form-group" controlId="formBasicPassword">
                  <Form.Label className="auth-form-label">Password</Form.Label>
                  <Form.Control 
                    className="auth-form-control"
                    type="password" 
                    placeholder="Enter your password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <div className="text-end mb-4 auth-form-group">
                  <Link to="/forgot-password" className="auth-link">Forgot Password?</Link>
                </div>

                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100 auth-btn auth-form-group"
                  disabled={loading}
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
              </Form>
              
              <div className="auth-divider auth-form-group">
                <span>OR</span>
              </div>
              
              <div className="auth-form-group">
                <button className="social-btn">
                  <FontAwesomeIcon icon={faGoogle} />
                  Continue with Google
                </button>
                <button className="social-btn">
                  <FontAwesomeIcon icon={faFacebook} />
                  Continue with Facebook
                </button>
              </div>
              
              <div className="text-center mt-4 auth-form-group">
                <p>Don't have an account? <Link to="/signup" className="auth-link">Sign Up</Link></p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;