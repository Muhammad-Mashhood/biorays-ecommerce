import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

const ContactForm = () => {
  return (
    <section className="contact-form container my-5">
      <h2>Contact form</h2>
      <Form className="mt-4">
        <Row className="g-3">
          <Col md={6}>
            <Form.Control type="text" placeholder="Name" />
          </Col>
          <Col md={6}>
            <Form.Control type="email" placeholder="Email *" required />
          </Col>
          <Col xs={12}>
            <Form.Control type="tel" placeholder="Phone number" />
          </Col>
          <Col xs={12}>
            <Form.Control as="textarea" rows={4} placeholder="Comment" />
          </Col>
          <Col xs={12}>
            <Button variant="dark" type="submit">Send</Button>
          </Col>
        </Row>
      </Form>
    </section>
  );
};

export default ContactForm;