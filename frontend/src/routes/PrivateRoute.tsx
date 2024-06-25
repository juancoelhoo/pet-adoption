import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface PrivateRouteProps {
    element: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
    const { isAuthenticated, isLoading } = useAuth();

    return isLoading ? <h1>Carregando...</h1> : isAuthenticated ? element : <Navigate to="/" />;
};

export default PrivateRoute;
