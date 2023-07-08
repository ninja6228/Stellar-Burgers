import { FC } from "react";
import { Navigate, useLocation } from 'react-router-dom';
import { getCookie } from "../../utils/cookie";
import { useSelector } from '../../services/hooks/hooks';

interface IProtectedRoute {
  isPrivate?: boolean,
  element: JSX.Element
}

const ProtectedRoute: FC<IProtectedRoute> = ({ isPrivate, element }) => {
  const { form: user } = useSelector((state) => state.user);
  const location = useLocation();
  const isAuthenticated = getCookie('accessToken')

  if (!isPrivate && user && isAuthenticated) {
    return <Navigate to={location.state?.from.pathname || '/'} />;
  }

  if (isPrivate && !user && !isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return element;
}

export default ProtectedRoute;