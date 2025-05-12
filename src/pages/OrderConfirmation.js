import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Spinner, Alert } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faShoppingBag, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const OrderConfirmation = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        
        // For guest checkout - create a function to retrieve order status without authentication
        const { data } = await axios.get(`/api/orders/guest/${id}`);
        
        setOrder(data.order);
        setError(null);
      } catch (err) {
        console.error('Error fetching order:', err);
        setError('Could not load order details. Please contact customer support.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOrder();
    }
  }, [id]);

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading order details...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">{error}</Alert>
        <div className="text-center mt-4">
          <Link to="/" className="btn btn-primary">Return to Homepage</Link>
        </div>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row className="justify-content-center mb-5">
        <Col md={8} className="text-center">
          <FontAwesomeIcon icon={faCheckCircle} size="4x" className="text-success mb-4" />
          <h1>Thank You for Your Order!</h1>
          <p className="lead mb-4">Your order has been placed successfully.</p>
          <div className="order-number mb-2">
            <strong>Order Number:</strong> #{order?._id}
          </div>
          <p className="mb-4">
            A confirmation email has been sent to <strong>{order?.email}</strong>
          </p>
        </Col>
      </Row>

      <Row>
        <Col lg={8}>
          <Card className="mb-4">
            <Card.Header as="h5">Order Details</Card.Header>
            <Card.Body>
              <Table responsive borderless className="order-items">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order?.orderItems.map(item => (
                    <tr key={item._id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            style={{ width: '50px', height: '50px', objectFit: 'contain' }}
                            className="me-3"
                          />
                          <div>{item.name}</div>
                        </div>
                      </td>
                      <td>{item.quantity}</td>
                      <td>Rs. {((item.onSale ? item.salePrice : item.price) * item.quantity).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          <Row>
            <Col md={6}>
              <Card className="mb-4">
                <Card.Header as="h5">Shipping Address</Card.Header>
                <Card.Body>
                  <p className="mb-1"><strong>{order?.shippingAddress.fullName}</strong></p>
                  <p className="mb-1">{order?.shippingAddress.address}</p>
                  <p className="mb-1">
                    {order?.shippingAddress.city}, {order?.shippingAddress.province} {order?.shippingAddress.postalCode}
                  </p>
                  <p className="mb-0">{order?.shippingAddress.phone}</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="mb-4">
                <Card.Header as="h5">Payment Information</Card.Header>
                <Card.Body>
                  <p><strong>Method:</strong> {order?.paymentMethod === 'cod' ? 'Cash on Delivery' : 
                                            order?.paymentMethod === 'bank' ? 'Bank Transfer' : 
                                            'EasyPaisa / JazzCash'}</p>
                  <p className="mb-0"><strong>Status:</strong> {order?.isPaid ? 'Paid' : 'Pending'}</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>

        <Col lg={4}>
          <Card className="order-summary">
            <Card.Header as="h5">Order Summary</Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between mb-3">
                <span>Subtotal</span>
                <span>Rs. {order?.totalPrice.toLocaleString()}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Shipping</span>
                <span>Rs. 0</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-4">
                <strong>Total</strong>
                <strong>Rs. {order?.totalPrice.toLocaleString()}</strong>
              </div>

              <div className="d-grid gap-2">
                <Button as={Link} to="/" variant="primary">
                  <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                  Continue Shopping
                </Button>
                <Button as={Link} to="/shop" variant="outline-primary">
                  <FontAwesomeIcon icon={faShoppingBag} className="me-2" />
                  Browse More Products
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderConfirmation;