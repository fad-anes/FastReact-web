import React, { useState } from 'react';
import { Nav, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaBoxes, FaBars } from 'react-icons/fa';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleSidebarToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Toggle Button */}
      <Button
        variant="link"
        className="d-block d-lg-none p-3 position-fixed"
        onClick={handleSidebarToggle}
        style={{
          fontSize: '24px',
          top: '0px',
          left: '10px',
          zIndex: 999,
          color: '#333',
          borderRadius: '50%',
          backgroundColor: 'transparent',
        }}
      >
        <FaBars />
      </Button>

      {/* Sidebar */}
      <div
        className={`sidebar bg-light ${isOpen ? 'd-block' : 'd-none d-lg-block'}`}
        style={{
          height: '100vh',
          width: '250px',
          transition: 'all 0.3s ease-in-out',
          borderRight: '1px solid #ddd',
          position: 'fixed',
          paddingTop: '20px',
          boxShadow: '2px 0px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Nav className="flex-column p-3">
          <Nav.Link
            as={Link}
            to="/dashboard"
            className="d-flex align-items-center mb-3"
            style={{
              fontSize: '18px',
              color: '#555',
              padding: '12px 20px',
              borderRadius: '5px',
              transition: 'background-color 0.3s',
              marginBottom: '10px',
            }}
          >
            <FaTachometerAlt className="mr-2" style={{ fontSize: '20px' }} />
            Dashboard
          </Nav.Link>

          <Nav.Link
            as={Link}
            to="/users"
            className="d-flex align-items-center mb-3"
            style={{
              fontSize: '18px',
              color: '#555',
              padding: '12px 20px',
              borderRadius: '5px',
              transition: 'background-color 0.3s',
              marginBottom: '10px',
            }}
          >
            <FaUsers className="mr-2" style={{ fontSize: '20px' }} />
            Users
          </Nav.Link>

          <Nav.Link
            as={Link}
            to="/products"
            className="d-flex align-items-center mb-3"
            style={{
              fontSize: '18px',
              color: '#555',
              padding: '12px 20px',
              borderRadius: '5px',
              transition: 'background-color 0.3s',
              marginBottom: '10px',
            }}
          >
            <FaBoxes className="mr-2" style={{ fontSize: '20px' }} />
            Products
          </Nav.Link>
        </Nav>
      </div>

      {/* Main Content Area */}
      <div
        style={{
          marginLeft: isOpen ? '250px' : '0',
          transition: 'margin-left 0.3s ease',
          padding: '0px',
          paddingTop: '40px',
        }}
      >
        {/* Main content goes here */}
      </div>
    </>
  );
};

export default Sidebar;
