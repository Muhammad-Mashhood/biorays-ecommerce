import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import ProductCard from './ProductCard';

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: "3M™ Littmann® Classic III™ Monitoring Stethoscope (Original)",
      price: "38,500.00",
      image: "/images/littmann-stethoscope-classic-3_2.webp",
      onSale: true
    },
    {
      id: 2,
      name: "Agglutination viewer Biolite for slide | Biorays",
      price: "2,200.00",
      image: "/images/Agglutination-viewer-Biolite-for-slide.webp",
      onSale: false
    },
    // Add more products here
  ];

  return (
    <section className="featured-products container my-5">
      <h2 className="mb-4">Shop all</h2>
      <Row xs={1} md={2} lg={4} className="g-4">
        {products.map(product => (
          <Col key={product.id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
      <div className="text-center mt-4">
        <Button variant="dark">View all</Button>
      </div>
    </section>
  );
};

export default FeaturedProducts;
