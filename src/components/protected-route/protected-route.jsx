import { useSelector } from "react-redux";
import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ isPrivate, element }) {
  const { isAuth } = useSelector((state) => state.user);
  const location = useLocation();

  if (!isPrivate && isAuth) {
    return <Navigate to={location.state ? location.state.from.pathname : "/"} replace state={{ from: location }} />;
  }
  if (isPrivate && !isAuth) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return element;
}

export default ProtectedRoute;