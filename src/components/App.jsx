import { Route, Routes, Navigate } from 'react-router-dom';
import { Layout } from 'components/Layout/Layout';
import { RestrictedRoute } from 'components/RestrictedRoute/RestrictedRoute';
import { PrivateRoute } from 'components/PrivateRoute/PrivateRoute';
import { Spinner } from 'components/Spinner/Spinner';

import { useDispatch } from 'react-redux';
import { useEffect, lazy } from 'react';
import { refreshUser } from 'redux/auth/operations';
import { useAuth } from 'hooks/useAuth';

const HomePage = lazy(() => import('pages/Home/Home'));
const RegisterPage = lazy(() => import('pages/Register'));
const LoginPage = lazy(() => import('pages/Login'));
const ContactsPage = lazy(() => import('pages/Contacts/Contacts'));

export const App = () => {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <Spinner />
  ) : (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route
          path="/register"
          element={
            <RestrictedRoute
              redirectTo="/contacts"
              component={<RegisterPage />}
            />
          }
        />
        <Route
          path="/login"
          element={
            <RestrictedRoute redirectTo="/contacts" component={<LoginPage />} />
          }
        />
        <Route
          path="/contacts"
          element={
            <PrivateRoute redirectTo="/login" component={<ContactsPage />} />
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
