import { useSelector } from "react-redux";
import { Navigate, useLocation } from 'react-router-dom';
import { getCookie } from "../../utils/cookie";

function ProtectedRoute({ isPrivate, element }) {
  const { isAuth, form: user } = useSelector((state) => state.user);
  const location = useLocation();
  const isAuthenticated = getCookie('accessToken')

  if (!isAuth) {
    return null
  }

  if (!isPrivate && user && isAuthenticated) {
    return <Navigate to={location.state?.from.pathname || '/'} />;
  }

  if (isPrivate && !user && !isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return element;
}

export default ProtectedRoute;