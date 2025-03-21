import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const NavbarComponent = () => {
  return (
    <Navbar expand="lg" className="navbar">
      <Container>
        <Navbar.Brand as={Link} to="/">BIORAYS</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="active">Home</Nav.Link>
            <NavDropdown title="Shop" id="shopDropdown">
              {/* Add dropdown items here */}
            </NavDropdown>
            <NavDropdown title="Services" id="servicesDropdown">
              {/* Add dropdown items here */}
            </NavDropdown>
            <Nav.Link as={Link} to="/contact">Contact us</Nav.Link>
          </Nav>
          <div className="nav-icons">
            <Link to="/search" className="nav-icon"><FontAwesomeIcon icon={faSearch} /></Link>
            <Link to="/signin" className="nav-icon"><FontAwesomeIcon icon={faUser} /></Link>
            <Link to="/cart" className="nav-icon"><FontAwesomeIcon icon={faShoppingCart} /></Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;