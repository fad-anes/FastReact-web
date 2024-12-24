import React, { useState } from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AdminHeader: React.FC = () => {
  const [showLogout, setShowLogout] = useState(false);
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
    <Navbar 
      bg="light"  // Header background color set to light (gray can be achieved with a custom class)
      variant="dark"  // Using dark variant to make the text and icons stand out
      expand="lg" 
      className="border-bottom p-3 bg-light"  // Custom background color for gray
    >
      <Nav className="ms-auto"> {/* Aligning the icon to the right */}
        {isLoggedIn && (
          <Dropdown align="end">
            <Dropdown.Toggle
              variant="link"
              className="d-flex align-items-center p-0"
              id="dropdown-custom-components"
            >
              <FaUserCircle size={30} style={{ color: 'black' }} /> {/* Person icon color set to black */}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as="button" onClick={handleLogout}>
                <FaSignOutAlt className="mr-2" style={{ color: '#FF6347' }} /> Logout {/* Tomato red for logout */}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </Nav>
    </Navbar>
  );
};

export default AdminHeader;
