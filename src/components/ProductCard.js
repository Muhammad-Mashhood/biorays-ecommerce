import React from 'react';
import { Badge } from 'react-bootstrap';

const ProductCard = ({ product }) => {
  const { image, name, price, salePrice, onSale } = product;
  
  return (
    <div className="product-card">
      <div className="position-relative">
        <img src={image} alt={name} className="product-image" />
        {onSale && <Badge bg="black" className="sale-badge">Sale</Badge>}
      </div>
      <div className="product-info">
        <h3>{name}</h3>
        <p className="price">
          {salePrice ? (
            <>
              <s>Rs.{price} PKR</s> Rs.{salePrice} PKR
            </>
          ) : (
            `Rs.${price} PKR`
          )}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;