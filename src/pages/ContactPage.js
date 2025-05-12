import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import ContactForm from '../components/ContactForm';

const ContactPage = () => {
  return (
    <Container className="my-5">
      <h1 className="text-center mb-5">Contact Us</h1>
      
      <Row className="mb-5">
        <Col md={4}>
          <Card className="contact-card h-100">
            <Card.Body className="text-center">
              <FontAwesomeIcon icon={faMapMarkerAlt} size="2x" className="mb-3 text-primary" />
              <Card.Title>Our Address</Card.Title>
              <Card.Text>123 Main Street, Lahore, Pakistan</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="contact-card h-100">
            <Card.Body className="text-center">
              <FontAwesomeIcon icon={faPhone} size="2x" className="mb-3 text-primary" />
              <Card.Title>Phone</Card.Title>
              <Card.Text>+92 300 1234567</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="contact-card h-100">
            <Card.Body className="text-center">
              <FontAwesomeIcon icon={faEnvelope} size="2x" className="mb-3 text-primary" />
              <Card.Title>Email</Card.Title>
              <Card.Text>info@biorays.com</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row>
        <Col lg={12}>
          <ContactForm />
        </Col>
      </Row>
    </Container>
  );
};

export default ContactPage;