import React from 'react';
import { Container, Row, Col, Table, Button, Card, Image, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faArrowLeft, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cartItems, totalPrice, removeFromCart, updateQuantity, clearCart } = useCart();

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) quantity = 1;
    updateQuantity(id, parseInt(quantity));
  };

  return (
    <Container className="my-5">
      <h1 className="mb-4">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-5">
          <h3>Your cart is empty</h3>
          <p className="text-muted mb-4">Add some products to your cart to see them here.</p>
          <Link to="/shop" className="btn btn-primary">
            <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
            Continue Shopping
          </Link>
        </div>
      ) : (
        <Row>
          <Col lg={8}>
            <Table responsive borderless className="cart-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => {
                  const itemPrice = item.onSale ? item.salePrice : item.price;
                  return (
                    <tr key={item._id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <Image src={item.image} alt={item.name} width={80} height={80} className="me-3" />
                          <div>
                            <h6 className="mb-0">{item.name}</h6>
                            <small className="text-muted">{item.category}</small>
                          </div>
                        </div>
                      </td>
                      <td>Rs. {typeof itemPrice === 'number' ? itemPrice.toLocaleString() : itemPrice}</td>
                      <td style={{ width: '120px' }}>
                        <Form.Control
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                          className="quantity-input"
                        />
                      </td>
                      <td>
                        <strong>
                          Rs. {typeof itemPrice === 'number' 
                            ? (itemPrice * item.quantity).toLocaleString() 
                            : parseInt(itemPrice) * item.quantity}
                        </strong>
                      </td>
                      <td>
                        <Button 
                          variant="link" 
                          className="text-danger p-0" 
                          onClick={() => removeFromCart(item._id)}
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
            <div className="d-flex justify-content-between mt-4">
              <Link to="/shop" className="btn btn-outline-primary">
                <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                Continue Shopping
              </Link>
              <div>
                <Button 
                  variant="outline-secondary" 
                  className="me-2"
                  onClick={() => clearCart()}
                >
                  <FontAwesomeIcon icon={faTrash} className="me-2" />
                  Clear Cart
                </Button>
              </div>
            </div>
          </Col>
          <Col lg={4}>
            <Card className="cart-summary">
              <Card.Header as="h5">Order Summary</Card.Header>
              <Card.Body>
                <div className="d-flex justify-content-between mb-3">
                  <span>Subtotal</span>
                  <span>Rs. {typeof totalPrice === 'number' ? totalPrice.toLocaleString() : totalPrice}</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span>Tax</span>
                  <span>Calculated at checkout</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-3">
                  <strong>Total</strong>
                  <strong>Rs. {typeof totalPrice === 'number' ? totalPrice.toLocaleString() : totalPrice}</strong>
                </div>
                <Button 
                  variant="primary" 
                  className="w-100 mt-3" 
                  disabled={cartItems.length === 0}
                  as={Link}
                  to="/checkout"
                >
                  Proceed to Checkout
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default CartPage;