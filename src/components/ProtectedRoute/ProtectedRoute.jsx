import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return <div>Loading...</div>;

    if (!user) {
        // Redirect to login if not authenticated
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // Redirect to respective dashboard if role not allowed
        const redirectPath = user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard';
        return <Navigate to={redirectPath} replace />;
    }

    return children;
};

export default ProtectedRoute;
