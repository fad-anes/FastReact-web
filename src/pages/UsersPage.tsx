import React, { useEffect, useState } from 'react';
import { Container, Table, Badge, Row, Col } from 'react-bootstrap';
import { allusers, toggle_user_status } from '../services/services'; 
import AdminHeader from '../components/AdminHeader'; 
import AdminSidebar from '../components/Sidebar'; 
import AdminFooter from '../components/Footer'; 
import './UsersPage.css'; 

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await allusers();
        setUsers(data); // Set the fetched users data to the state
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  // Handle status toggle for a user
  const handleToggleStatus = async (userId: number) => {
    try {
      await toggle_user_status(userId);
      // Refetch users after toggling to update the UI
      const data = await allusers();
      setUsers(data);
    } catch (error:any) {
      console.error(error.response.data.detail);
    }
  };

  return (
    <div className="users-page">
      <AdminHeader />
      <Row>
        <Col md={3}>
          <AdminSidebar /> {/* Sidebar */}
        </Col>
        <Col md={9}>
          <Container>
            <h2 className="mt-4 text-center">Users List</h2>
            <Table striped bordered hover responsive className="custom-table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <Badge
                        pill
                        bg={user.isactive  ? 'success' : 'danger'}
                        className="cursor-pointer"
                        onClick={() => handleToggleStatus(user.id)}
                      >
                        {user.isactive  ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>
        </Col>
      </Row>
      <AdminFooter /> {/* Footer */}
    </div>
  );
};

export default UsersPage;
