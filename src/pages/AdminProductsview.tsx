import React, { useState, useEffect } from "react";
import { getAllProducts } from "../services/services";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/Sidebar";
import AdminFooter from "../components/Footer";
import { Container, Table, Row, Col } from 'react-bootstrap';
import './UsersPage.css'; 
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  user: string; 
}

const AdminPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  

  return ( <div className="users-page">
    <AdminHeader />
    <Row>
      <Col md={3}>
        <AdminSidebar /> {/* Sidebar */}
      </Col>
      <Col md={9}>
        <Container>
          <h2 className="mt-4 text-center">Products List</h2>
          <Table striped bordered hover responsive className="custom-table">
            <thead>
            <tr>
                <th>Product Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Category</th>
                <th>Username</th>
                
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.price} Dt</td>
                  <td>{product.category}</td>
                  <td>{product.user}</td>
                 
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

export default AdminPage;
