import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import UsersPage from './pages/UsersPage';
import ProtectedRoute from './ProtectedRoute'; 
import ClientPage from './pages/ClientPage';  
import FavoritesPage from './pages/FavoritesPage'; 
import MyProductsPage from './pages/MyProductsPage'; 
import AdminProductsview from './pages/AdminProductsview'; 
import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protect the dashboard route */}
        <Route element={<ProtectedRoute role="admin" />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/products" element={<AdminProductsview />} />
        </Route>

         {/* Protect  route */}
         <Route element={<ProtectedRoute role="user" />}>
          <Route path="/products" element={<ClientPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/my-products" element={<MyProductsPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
