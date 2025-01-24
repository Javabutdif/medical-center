import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      element={user ? <Component /> : <Navigate to="/login" />}
    />
  );
};

export default ProtectedRoute;
