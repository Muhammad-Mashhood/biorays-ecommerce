import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, totalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Form states
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    province: '',
    paymentMethod: 'cod'
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle order submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      setError('Your cart is empty');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Create order data object
      const orderData = {
        orderItems: cartItems,
        shippingAddress: {
          fullName: `${formData.firstName} ${formData.lastName}`,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          province: formData.province,
          phone: formData.phone
        },
        paymentMethod: formData.paymentMethod,
        email: formData.email,
        totalPrice
      };

      // Send order to backend
      const { data } = await axios.post('/api/orders', orderData);

      // Clear the cart
      clearCart();
      
      // Redirect to order confirmation
      navigate(`/order-confirmation/${data.order._id}`);
    } catch (err) {
      console.error('Order creation failed:', err);
      setError(
        err.response?.data?.message || 
        'Failed to place order. Please try again or contact customer support.'
      );
      
      // Show more detailed error info in console for debugging
      if (err.response) {
        console.error('Error response data:', err.response.data);
        console.error('Error response status:', err.response.status);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="my-5">
      <h1 className="mb-4">Checkout</h1>
      
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={8}>
            <Card className="mb-4">
              <Card.Header>
                <h5 className="mb-0">Contact Information</h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="firstName" 
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="lastName" 
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control 
                        type="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control 
                        type="tel" 
                        name="phone" 
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            
            <Card className="mb-4">
              <Card.Header>
                <h5 className="mb-0">Shipping Address</h5>
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="address" 
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>City</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="city" 
                        value={formData.city}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>Postal Code</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="postalCode" 
                        value={formData.postalCode}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>Province</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="province" 
                        value={formData.province}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            
            <Card>
              <Card.Header>
                <h5 className="mb-0">Payment Method</h5>
              </Card.Header>
              <Card.Body>
                <Form.Group>
                  <Form.Check 
                    type="radio"
                    id="cod"
                    name="paymentMethod"
                    value="cod"
                    label="Cash on Delivery (COD)"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleChange}
                    className="mb-2"
                  />
                  <Form.Check 
                    type="radio"
                    id="bank"
                    name="paymentMethod"
                    value="bank"
                    label="Bank Transfer"
                    checked={formData.paymentMethod === 'bank'}
                    onChange={handleChange}
                    className="mb-2"
                  />
                  <Form.Check 
                    type="radio"
                    id="easypaisa"
                    name="paymentMethod"
                    value="easypaisa"
                    label="EasyPaisa / JazzCash"
                    checked={formData.paymentMethod === 'easypaisa'}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={4}>
            <Card className="order-summary">
              <Card.Header>
                <h5 className="mb-0">Order Summary</h5>
              </Card.Header>
              <Card.Body>
                <div className="mb-4">
                  {cartItems.map(item => (
                    <div key={item._id} className="d-flex justify-content-between mb-2">
                      <span>{item.quantity} × {item.name}</span>
                      <span>Rs. {((item.onSale ? item.salePrice : item.price) * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                
                <hr />
                
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal</span>
                  <span>Rs. {totalPrice.toLocaleString()}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping</span>
                  <span>Rs. 0</span>
                </div>
                
                <hr />
                
                <div className="d-flex justify-content-between mb-3">
                  <strong>Total</strong>
                  <strong>Rs. {totalPrice.toLocaleString()}</strong>
                </div>
                
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                  disabled={loading || cartItems.length === 0}
                >
                  {loading ? 'Processing...' : 'Place Order'}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default CheckoutPage;