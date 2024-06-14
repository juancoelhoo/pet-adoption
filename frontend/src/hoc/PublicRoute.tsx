import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface PublicRouteProps {
    element: React.ReactElement;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ element }) => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? <Navigate to="/posts" /> : element;
};

export default PublicRoute;
