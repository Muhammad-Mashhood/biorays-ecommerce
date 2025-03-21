import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import ProductCard from './ProductCard';

const FeaturedCollection = () => {
  const products = [
    {
      id: 1,
      name: "BLOOD BANK REFRIGERATOR 2~6°C",
      price: "0.00",
      image: "/images/DLC.webp",
      onSale: false
    },
    {
      id: 2,
      name: "Agglutination viewer Biolite for slide | Biorays",
      price: "2,200.00",
      image: "/images/Agglutination-viewer-Biolite-for-slide.webp",
      onSale: false
    },
    {
      id: 3,
      name: "Centrifuge | Biorays",
      price: "4,500.00",
      image: "/images/Centrifuge.webp",
      onSale: false
    },
    {
      id: 4,
      name: "Tube Stripper for tube sealing",
      price: "12,500.00",
      image: "/images/TubeStripperfortubesealing.webp",
      onSale: false
    }
  ];

  return (
    <section className="featured-collection container my-5">
      <h2 className="mb-4">Featured collection</h2>
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

export default FeaturedCollection;