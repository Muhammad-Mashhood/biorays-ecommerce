import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner, Form, Alert, Toast, ToastContainer } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faShoppingCart, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data.product);
        setError(null);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Failed to load product details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      const productWithQuantity = { ...product, quantity };
      addToCart(productWithQuantity);
      setShowToast(true);
    }
  };

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading product details...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">{error}</Alert>
        <Link to="/shop" className="btn btn-primary">
          <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
          Back to Shop
        </Link>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="my-5">
        <Alert variant="warning">Product not found</Alert>
        <Link to="/shop" className="btn btn-primary">
          <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
          Back to Shop
        </Link>
      </Container>
    );
  }

  return (
    <Container className="my-5 product-detail">
      <ToastContainer position="top-end" className="p-3" style={{zIndex: 1070}}>
        <Toast 
          onClose={() => setShowToast(false)} 
          show={showToast} 
          delay={3000} 
          autohide 
          bg="success"
        >
          <Toast.Header>
            <FontAwesomeIcon icon={faCheckCircle} className="me-2 text-success" />
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            {product.name} has been added to your cart!
          </Toast.Body>
        </Toast>
      </ToastContainer>

      <Link to="/shop" className="btn btn-outline-primary mb-4">
        <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
        Back to Shop
      </Link>
      
      <Row>
        <Col md={6} className="mb-4">
          <div className="product-image-container">
            <img src={product.image} alt={product.name} className="img-fluid product-detail-image" />
          </div>
        </Col>
        
        <Col md={6}>
          <h1 className="product-title mb-3">{product.name}</h1>
          
          <div className="product-price mb-4">
            {product.onSale ? (
              <>
                <span className="regular-price text-muted text-decoration-line-through me-3">
                  Rs. {product.price.toLocaleString()} PKR
                </span>
                <span className="sale-price">
                  Rs. {product.salePrice.toLocaleString()} PKR
                </span>
              </>
            ) : (
              <span>Rs. {product.price.toLocaleString()} PKR</span>
            )}
          </div>
          
          <div className="product-description mb-4">
            <h5>Description</h5>
            <p>{product.description}</p>
          </div>
          
          <div className="product-meta mb-4">
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Availability:</strong> {product.countInStock > 0 ? `In Stock (${product.countInStock})` : 'Out of Stock'}</p>
          </div>
          
          <div className="d-flex align-items-center mb-4">
            <Form.Group className="me-3" style={{ width: '100px' }}>
              <Form.Control
                type="number"
                min="1"
                max={product.countInStock}
                value={quantity}
                onChange={handleQuantityChange}
                disabled={product.countInStock === 0}
              />
            </Form.Group>
            
            <Button 
              variant="primary" 
              size="lg"
              onClick={handleAddToCart}
              disabled={product.countInStock === 0}
            >
              <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
              Add to Cart
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;