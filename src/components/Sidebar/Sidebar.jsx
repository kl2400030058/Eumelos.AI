import React, { useState, useEffect, useRef, useCallback } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Logo from '../Logo/Logo';
import './Sidebar.css';

const Sidebar = ({ links }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [width, setWidth] = useState(parseInt(localStorage.getItem('sidebar_width')) || 260);
    const [isResizing, setIsResizing] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(width < 160);
    const sidebarRef = useRef(null);

    const startResizing = useCallback((e) => {
        setIsResizing(true);
        e.preventDefault();
    }, []);

    const stopResizing = useCallback(() => {
        setIsResizing(false);
    }, []);

    const resize = useCallback((e) => {
        if (isResizing) {
            let newWidth = e.clientX;
            if (newWidth < 80) newWidth = 80;
            if (newWidth > 450) newWidth = 450;

            setWidth(newWidth);
            setIsCollapsed(newWidth < 160);
            localStorage.setItem('sidebar_width', newWidth);
            document.documentElement.style.setProperty('--sidebar-width', `${newWidth}px`);
        }
    }, [isResizing]);

    useEffect(() => {
        window.addEventListener('mousemove', resize);
        window.addEventListener('mouseup', stopResizing);
        document.documentElement.style.setProperty('--sidebar-width', `${width}px`);
        return () => {
            window.removeEventListener('mousemove', resize);
            window.removeEventListener('mouseup', stopResizing);
        };
    }, [resize, stopResizing, width]);

    const Icons = {
        Plus: () => (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
        ),
        History: () => (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                <path d="M3 3v5h5"></path>
                <path d="M12 7v5l4 2"></path>
            </svg>
        ),
        Discover: () => (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
        ),
        Spaces: () => (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
        )
    };

    const getIcon = (label) => {
        const key = label.toLowerCase();
        if (key.includes('dashboard')) return <Icons.History />;
        if (key.includes('courses')) return <Icons.Discover />;
        if (key.includes('schedule')) return <Icons.Spaces />;
        if (key.includes('assignments')) return <Icons.Plus />;
        if (key.includes('attendance')) return <Icons.History />;
        return <Icons.Spaces />;
    };

    return (
        <aside
            ref={sidebarRef}
            className={`sidebar-wrapper ${isCollapsed ? 'collapsed' : ''} ${isResizing ? 'resizing' : ''}`}
            style={{ width: `${width}px` }}
        >
            <div className="sidebar-header">
                <div className="sidebar-logo">
                    <Logo size={24} />
                    {!isCollapsed && <span className="logo-text">EUMELOS.AI</span>}
                </div>
            </div>

            <div className="sidebar-top">
                <button className="sidebar-new-btn">
                    <Icons.Plus />
                    {!isCollapsed && <span>Quick Actions</span>}
                </button>
            </div>

            <nav className="sidebar-nav">
                {links.map((link, index) => (
                    <NavLink
                        key={index}
                        to={link.path}
                        className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                    >
                        <div className="sidebar-link-icon">
                            {getIcon(link.label)}
                        </div>
                        {!isCollapsed && <span className="sidebar-link-label">{link.label}</span>}
                    </NavLink>
                ))}
            </nav>

            <div className="sidebar-bottom">
                <div
                    className="sidebar-profile-section clickable"
                    onClick={() => navigate('/profile')}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px',
                        cursor: 'pointer',
                        borderRadius: '12px',
                        transition: 'background 0.2s',
                        background: 'rgba(255, 255, 255, 0.02)'
                    }}
                >
                    <div className="sidebar-profile-avatar" style={{
                        width: '40px',
                        height: '40px',
                        background: '#3B82F6',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px',
                        fontWeight: '800',
                        color: 'white',
                        flexShrink: 0
                    }}>
                        {user?.name?.[0] || '2'}
                    </div>
                    {!isCollapsed && (
                        <div className="sidebar-profile-info" style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            <span className="profile-name" style={{
                                fontSize: '15px',
                                fontWeight: '700',
                                color: 'white',
                                letterSpacing: '0.01em'
                            }}>
                                {user?.name || '2400030058'}
                            </span>
                            <span className="profile-role" style={{
                                fontSize: '10px',
                                color: 'rgba(255, 255, 255, 0.4)',
                                fontWeight: '600',
                                letterSpacing: '0.05em'
                            }}>
                                {user?.role?.toUpperCase() || 'STUDENT'}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            <div
                className="sidebar-resizer"
                onMouseDown={startResizing}
            />
        </aside>
    );
};

export default Sidebar;
