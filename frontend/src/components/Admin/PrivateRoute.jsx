import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  // Note: For extra security, user role verification is also done heavily on the backend
  return userInfo && userInfo.isAdmin ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default PrivateRoute;
