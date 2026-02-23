import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

import Logo from '../Logo/Logo';

const Navbar = () => {
    const { user } = useAuth();
    const location = useLocation();
    const [isExtended, setIsExtended] = useState(false);

    // Check if we are on an auth page (Landing/Login/Register)
    const isAuthPage = ['/roles', '/login/student', '/login/admin', '/register/student'].includes(location.pathname);

    // If user is logged in and NOT on an auth page, we hide the horizontal navbar
    // because the Sidebar handles navigation.
    if (user && !isAuthPage) {
        return null;
    }

    // Navbar only shows if we are on auth pages or root
    if (!isAuthPage && location.pathname !== '/') return null;

    return (
        <nav className={`nav-wrapper ${isExtended ? 'extended' : ''}`}>
            <div className="container nav-container">
                <div
                    className="nav-logo-trigger"
                    onClick={() => setIsExtended(!isExtended)}
                    title="Toggle Navigation"
                >
                    <Logo size={32} />
                    <span className="nav-logo">EUMELOS.AI</span>
                </div>
            </div>

            <div className="extended-links">
                <Link to="/" className="ext-link">Home</Link>
                <Link to="/roles" className="ext-link">Portal</Link>
                <a href="#about" className="ext-link">About</a>
                <Link to="/login/student" className="ext-link">Student</Link>
                <Link to="/login/admin" className="ext-link">Admin</Link>
            </div>
        </nav>
    );
};

export default Navbar;
