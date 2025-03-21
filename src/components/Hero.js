import React from 'react';
import { Button } from 'react-bootstrap';

const Hero = () => {
  return (
    <section id="hero" className="position-relative">
      <img src="/images/abc.jpg" alt="Laboratory Equipment" className="w-100" />
      <Button 
        style={{
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          background: 'rgba(255,255,255,0.9)', 
          border: 'none'
        }}
      >
        Shop All
      </Button>
    </section>
  );
};

export default Hero;