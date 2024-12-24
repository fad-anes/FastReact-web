import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ role }: { role: string }) => {
  const token = localStorage.getItem('access_token');
  const userRole = localStorage.getItem('user-role');

  // If no token or user role is not 'admin', redirect to login page
  if (!token || userRole !== role) {
    return <Navigate to="/login" />;
  }

  // If authenticated and role is correct, allow access to the route
  return <Outlet />;
};

export default ProtectedRoute;
