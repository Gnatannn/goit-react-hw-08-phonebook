import { Navigate } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';

// in case of private route and successfull log in - should render the component
// Otherwise render <Navigate> to redirectTo

export const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
  const { isLoggedIn, isRefreshing } = useAuth();
  const shouldRedirect = !isLoggedIn && !isRefreshing;
  return shouldRedirect ? <Navigate to={redirectTo} /> : Component;
};
