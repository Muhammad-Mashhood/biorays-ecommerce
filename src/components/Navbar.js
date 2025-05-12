import React from 'react';
import { Navbar, Container, Nav, NavDropdown, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const NavbarComponent = () => {
  const { totalItems } = useCart();
  
  return (
    <Navbar expand="lg" className="navbar">
      <Container>
        <Navbar.Brand as={Link} to="/">BIORAYS</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/shop">Shop</Nav.Link>
            <NavDropdown title="Services" id="servicesDropdown">
              <NavDropdown.Item as={Link} to="/services/laboratory">Laboratory Services</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/services/maintenance">Equipment Maintenance</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/contact">Contact us</Nav.Link>
          </Nav>
          <div className="nav-icons">
            <Link to="/search" className="nav-icon"><FontAwesomeIcon icon={faSearch} /></Link>
            <Link to="/signin" className="nav-icon"><FontAwesomeIcon icon={faUser} /></Link>
            <Link to="/cart" className="nav-icon position-relative">
              <FontAwesomeIcon icon={faShoppingCart} />
              {totalItems > 0 && (
                <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle">
                  {totalItems}
                </Badge>
              )}
            </Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;