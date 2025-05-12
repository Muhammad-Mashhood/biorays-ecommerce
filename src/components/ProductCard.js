import React, { useState } from 'react';
import { Card, Badge, Button, Toast, ToastContainer } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const ProductCard = ({ product, addToCart }) => {
  const [showToast, setShowToast] = useState(false);
  
  // Ensure product exists before accessing properties
  if (!product) return null;
  
  // Get _id or id, since static products in FeaturedProducts use 'id' instead of '_id'
  const productId = product._id || product.id;
  const { image, name, price, salePrice, onSale } = product;
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    if (addToCart) {
      // Make sure the product has a consistent ID field before adding to cart
      const productWithId = {
        ...product,
        _id: productId // Ensure _id exists
      };
      addToCart(productWithId);
      setShowToast(true);
    }
  };

  // Format price to handle both string and number values
  const formatPrice = (value) => {
    if (value === undefined || value === null) return "0";
    
    // If already a string with formatting, just return it
    if (typeof value === 'string') {
      // Remove any commas to avoid parsing issues
      const cleanValue = value.replace(/,/g, '');
      // If it's a valid number string, format it
      if (!isNaN(cleanValue)) {
        return parseInt(cleanValue).toLocaleString();
      }
      return value; // Return as is if not a number
    }
    
    // If it's a number, format it
    return typeof value === 'number' 
      ? value.toLocaleString() 
      : "0";
  };
  
  return (
    <>
      <ToastContainer position="top-end" className="p-3" style={{zIndex: 1070}}>
        <Toast 
          onClose={() => setShowToast(false)} 
          show={showToast} 
          delay={2000} 
          autohide 
          bg="success"
        >
          <Toast.Header>
            <FontAwesomeIcon icon={faCheckCircle} className="me-2 text-success" />
            <strong className="me-auto">Added to Cart</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            {name} has been added to your cart!
          </Toast.Body>
        </Toast>
      </ToastContainer>

      <Card className="product-card h-100">
        {/* Only create a link if we have a valid ID */}
        {productId ? (
          <Link to={`/product/${productId}`} className="text-decoration-none">
            <div className="position-relative">
              <Card.Img 
                variant="top" 
                src={image} 
                className="product-image" 
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = "/images/product-placeholder.png";
                }}
              />
              {onSale && <Badge bg="danger" className="sale-badge">Sale</Badge>}
            </div>
            <Card.Body>
              <Card.Title className="product-title">{name}</Card.Title>
              <Card.Text className="price">
                {onSale ? (
                  <>
                    <span className="original-price">Rs.{formatPrice(price)} PKR</span>
                    <span className="sale-price">Rs.{formatPrice(salePrice)} PKR</span>
                  </>
                ) : (
                  `Rs.${formatPrice(price)} PKR`
                )}
              </Card.Text>
            </Card.Body>
          </Link>
        ) : (
          // If no ID, just render the card without a link
          <>
            <div className="position-relative">
              <Card.Img 
                variant="top" 
                src={image} 
                className="product-image" 
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = "/images/product-placeholder.png";
                }}
              />
              {onSale && <Badge bg="danger" className="sale-badge">Sale</Badge>}
            </div>
            <Card.Body>
              <Card.Title className="product-title">{name}</Card.Title>
              <Card.Text className="price">
                {onSale ? (
                  <>
                    <span className="original-price">Rs.{formatPrice(price)} PKR</span>
                    <span className="sale-price">Rs.{formatPrice(salePrice)} PKR</span>
                  </>
                ) : (
                  `Rs.${formatPrice(price)} PKR`
                )}
              </Card.Text>
            </Card.Body>
          </>
        )}
        <Card.Footer className="bg-white border-0 pt-0">
          <Button 
            variant="outline-primary" 
            className="w-100 add-to-cart-btn"
            onClick={handleAddToCart}
          >
            <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
            Add to Cart
          </Button>
        </Card.Footer>
      </Card>
    </>
  );
};

export default ProductCard;