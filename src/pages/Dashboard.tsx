import React from 'react';
import { Container } from 'react-bootstrap';
import AdminHeader from '../components/AdminHeader';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

const Dashboard: React.FC = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="content" style={{ flex: 1 }}>
        <AdminHeader />
        <Container className="mt-5 d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
          <h1>Welcome to the Admin Dashboard!</h1>
        </Container>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
