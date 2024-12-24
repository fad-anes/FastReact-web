import React from 'react';
import { Navbar, Nav, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

const Header: React.FC = () => {
  const navigate = useNavigate();

  // Check if the user is logged in (token in localStorage)
  const isLoggedIn = !!localStorage.getItem('access_token');

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user-name');
    localStorage.removeItem('user-role');
    localStorage.removeItem('user-id');
    navigate('/');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="border rounded shadow-sm">
      <Navbar.Brand href="/" className="ms-auto">
        <h4 style={{ color: '#f8f9fa' }}>FastReact</h4>
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="ms-auto d-flex align-items-center">
          {isLoggedIn && (
            <DropdownButton
              id="dropdown-products"
              title="Products"
              variant="info"
              className="me-3"
            >
               <Dropdown.Item as={Link} to="/products">All Products</Dropdown.Item>
              <Dropdown.Item as={Link} to="/favorites">Favorites List</Dropdown.Item>
              <Dropdown.Item as={Link} to="/my-products">My Products</Dropdown.Item>
            </DropdownButton>
          )}

          {!isLoggedIn ? (
            <Nav.Link as={Link} to="/login">
              <Button
                style={{
                  backgroundColor: '#4caf50',
                  borderColor: '#4caf50',
                  color: '#fff',
                }}
                className="d-flex align-items-center"
              >
                <FaSignInAlt className="me-2" />
                Login
              </Button>
            </Nav.Link>
          ) : (
            <Nav.Link onClick={handleLogout}>
              <Button
                style={{
                  backgroundColor: '#d32f2f',
                  borderColor: '#d32f2f',
                  color: '#fff',
                }}
                className="d-flex align-items-center"
              >
                <FaSignOutAlt className="me-2" />
                Logout
              </Button>
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
