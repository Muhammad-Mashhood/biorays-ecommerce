import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import './Auth.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setError('');
    
    // Add validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      return setError('Please fill in all fields');
    }
    
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }
    
    if (formData.password.length < 6) {
      return setError('Password must be at least 6 characters long');
    }
    
    try {
      setLoading(true);
      // Here you would add your registration logic
      console.log('Signing up with:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // On successful registration, you would redirect to login or dashboard
      // history.push('/signin');
    } catch (err) {
      setError('Failed to create an account. Please try again.');
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
              <h2 className="text-center auth-header">Create Account</h2>
              
              {error && <Alert variant="danger">{error}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4 auth-form-group" controlId="formBasicName">
                  <Form.Label className="auth-form-label">Full Name</Form.Label>
                  <Form.Control 
                    className="auth-form-control"
                    type="text" 
                    name="name"
                    placeholder="Enter your full name" 
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4 auth-form-group" controlId="formBasicEmail">
                  <Form.Label className="auth-form-label">Email address</Form.Label>
                  <Form.Control 
                    className="auth-form-control"
                    type="email" 
                    name="email"
                    placeholder="Enter your email" 
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4 auth-form-group" controlId="formBasicPassword">
                  <Form.Label className="auth-form-label">Password</Form.Label>
                  <Form.Control 
                    className="auth-form-control"
                    type="password" 
                    name="password"
                    placeholder="Enter password" 
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4 auth-form-group" controlId="formBasicConfirmPassword">
                  <Form.Label className="auth-form-label">Confirm Password</Form.Label>
                  <Form.Control 
                    className="auth-form-control"
                    type="password" 
                    name="confirmPassword"
                    placeholder="Confirm your password" 
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100 auth-btn auth-form-group"
                  disabled={loading}
                >
                  {loading ? 'Creating Account...' : 'Sign Up'}
                </Button>
              </Form>
              
              <div className="auth-divider auth-form-group">
                <span>OR</span>
              </div>
              
              <div className="auth-form-group">
                <button className="social-btn">
                  <FontAwesomeIcon icon={faGoogle} />
                  Sign up with Google
                </button>
                <button className="social-btn">
                  <FontAwesomeIcon icon={faFacebook} />
                  Sign up with Facebook
                </button>
              </div>
              
              <div className="text-center mt-4 auth-form-group">
                <p>Already have an account? <Link to="/signin" className="auth-link">Sign In</Link></p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;