import React from 'react';

const Footer = () => {
  return (
    <footer className="footer mt-5">
      <div className="container">
        <div className="footer-content text-center">
          <span>© 2025, </span>
          <a href="/" className="footer-link">BIORAYS</a>
          <span> Designed by faheela </span>
          <div className="footer-links">
            <a href="/policies/refund-policy" className="footer-link">Refund policy</a>
            <span className="separator">·</span>
            <a href="/policies/privacy-policy" className="footer-link">Privacy policy</a>
            <span className="separator">·</span>
            <a href="/policies/terms-of-service" className="footer-link">Terms of service</a>
            <span className="separator">·</span>
            <a href="/pages/contact" className="footer-link">Contact information</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;