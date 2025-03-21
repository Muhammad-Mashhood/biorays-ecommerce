import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Subscribe = () => {
  return (
    <section className="subscribe container my-5">
      <h2>Subscribe to our emails</h2>
      <Form className="mt-4 subscribe-form">
        <div className="input-group">
          <Form.Control type="email" placeholder="Email" aria-label="Email" />
          <Button className="btn-outline-dark" type="submit">
            <FontAwesomeIcon icon={faArrowRight} />
          </Button>
        </div>
      </Form>
    </section>
  );
};

export default Subscribe;