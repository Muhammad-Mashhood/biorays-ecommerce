import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const FeaturedProducts = () => {
  const { addToCart } = useCart();

  // Sample product data
  const products = [
    {
      _id: '1',
      name: "Blood Bank Refrigerator",
      price: 38500,
      image: "/images/DLC.webp", // Will be resolved correctly
      category: "Lab Equipment",
      description: "Quality blood bank refrigerator for medical use",
      countInStock: 5,
      onSale: false
    },
    {
      _id: '2',
      name: "Agglutination Viewer",
      price: 22000,
      image: "/images/Agglutination-viewer-Biolite-for-slide.webp",
      category: "Lab Instruments",
      description: "Biolite slide agglutination viewer for laboratory analysis",
      countInStock: 8,
      onSale: false
    },
    {
      _id: '3',
      name: "Laboratory Centrifuge",
      price: 45000,
      image: "/images/Centrifuge.webp",
      category: "Lab Equipment",
      description: "High-speed laboratory centrifuge for sample preparation",
      countInStock: 3,
      onSale: false
    },
    {
      _id: '4',
      name: "Tube Stripper",
      price: 12500,
      image: "/images/TubeStripperfortubesealing.webp",
      category: "Lab Accessories",
      description: "Tube stripper for efficient tube sealing",
      countInStock: 12,
      onSale: false
    }
  ];

  return (
    <section className="featured-products container my-5">
      <h2 className="mb-4">Shop all</h2>
      <Row xs={1} md={2} lg={4} className="g-4">
        {products.map(product => (
          <Col key={product._id}>
            <ProductCard 
              product={product}
              addToCart={addToCart}
            />
          </Col>
        ))}
      </Row>
      <div className="text-center mt-4">
        <Button as={Link} to="/shop" variant="dark">View all</Button>
      </div>
    </section>
  );
};

export default FeaturedProducts;
