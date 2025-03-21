import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous messages and errors
    setMessage('');
    setError('');
    
    // Add validation
    if (!email) {
      return setError('Please enter your email address');
    }
    
    try {
      setLoading(true);
      // Here you would add your password reset logic
      console.log('Sending password reset to:', email);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      setMessage('Password reset link has been sent to your email');
    } catch (err) {
      setError('Failed to send password reset email. Please try again.');
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
              <h2 className="text-center auth-header">Reset Password</h2>
              
              {error && <Alert variant="danger">{error}</Alert>}
              {message && <Alert variant="success">{message}</Alert>}
              
              <p className="text-center mb-4 auth-form-group">
                Enter your email address and we'll send you a link to reset your password.
              </p>
              
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

                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100 auth-btn auth-form-group"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Reset Password'}
                </Button>
              </Form>
              
              <div className="text-center mt-4 auth-form-group">
                <p>
                  <Link to="/signin" className="auth-link">Back to Sign In</Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPassword;