import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Subscribe = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) return;
    
    setLoading(true);
    
    try {
      // Use explicit URL to ensure it works in development
      const response = await axios.post('/api/email/subscribe', { email });
      
      setStatus({
        submitted: true,
        success: true,
        message: 'Thanks for subscribing! Check your inbox for confirmation.'
      });
      
      // Clear form
      setEmail('');
    } catch (error) {
      console.error('Subscription error:', error);
      if (error.response) {
        console.error('Server response:', error.response.data);
      }
      
      setStatus({
        submitted: true,
        success: false,
        message: 'Failed to subscribe. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="subscribe container my-5">
      <h2>Subscribe to our emails</h2>
      
      {status.submitted && (
        <Alert variant={status.success ? 'success' : 'danger'} className="mt-3">
          {status.message}
        </Alert>
      )}
      
      <Form className="mt-4 subscribe-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <Form.Control 
            type="email" 
            placeholder="Email" 
            aria-label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
          <Button 
            className="btn-outline-dark" 
            type="submit"
            disabled={loading}
          >
            {loading ? '...' : <FontAwesomeIcon icon={faArrowRight} />}
          </Button>
        </div>
      </Form>
    </section>
  );
};

export default Subscribe;