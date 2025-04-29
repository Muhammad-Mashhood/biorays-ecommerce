import React, { useState } from 'react';
import { Form, Row, Col, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    comment: ''
  });
  const [status, setStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });
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
    setLoading(true);
    
    try {
      const response = await axios.post('/api/email/contact', formData);
      
      setStatus({
        submitted: true,
        success: true,
        message: 'Thank you for your message! We will get back to you soon.'
      });
      
      // Clear form
      setFormData({
        name: '',
        email: '',
        phone: '',
        comment: ''
      });
    } catch (error) {
      setStatus({
        submitted: true,
        success: false,
        message: 'Something went wrong. Please try again later.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-form container my-5">
      <h2>Contact form</h2>
      
      {status.submitted && (
        <Alert variant={status.success ? 'success' : 'danger'}>
          {status.message}
        </Alert>
      )}
      
      <Form className="mt-4" onSubmit={handleSubmit}>
        <Row className="g-3">
          <Col md={6}>
            <Form.Control 
              type="text" 
              placeholder="Name" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Col>
          <Col md={6}>
            <Form.Control 
              type="email" 
              placeholder="Email *" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </Col>
          <Col xs={12}>
            <Form.Control 
              type="tel" 
              placeholder="Phone number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </Col>
          <Col xs={12}>
            <Form.Control 
              as="textarea" 
              rows={4} 
              placeholder="Comment"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              required
            />
          </Col>
          <Col xs={12}>
            <Button 
              variant="dark" 
              type="submit"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send'}
            </Button>
          </Col>
        </Row>
      </Form>
    </section>
  );
};

export default ContactForm;