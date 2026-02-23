import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RoleSelection = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        // Check if terms are accepted
        const termsAccepted = localStorage.getItem('eumelos_terms_accepted');
        if (!termsAccepted) {
            navigate('/terms');
            return;
        }

        if (user) {
            const path = user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard';
            navigate(path);
        }
    }, [user, navigate]);

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative' }}>
            <div className="container animate-fade-in">
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '32px' }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-blue)' }}></div>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }}></div>
                        <div style={{ width: '24px', height: '6px', borderRadius: '3px', background: 'var(--accent-red)' }}></div>
                    </div>
                    <h1 style={{ margin: '0 auto 24px', fontSize: 'clamp(40px, 8vw, 64px)' }}>Portal Selection</h1>
                    <p style={{ margin: '0 auto', color: 'var(--text-muted)', fontSize: '16px', letterSpacing: 'normal', maxWidth: '800px', lineHeight: '1.8' }}>
                        Please select your role to proceed to the appropriate dashboard.
                        This portal provides secure access to course registration, academic records, and administrative tools.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                    gap: '32px',
                    maxWidth: '1000px',
                    margin: '0 auto'
                }}>
                    {/* Student Card */}
                    <div className="card liquid-glass" onClick={() => navigate('/login/student')} style={{
                        cursor: 'pointer',
                        padding: '40px'
                    }}>
                        <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-blue)' }}></div>
                            <span style={{ fontSize: '12px', fontWeight: 600, letterSpacing: 'normal', color: 'var(--accent-blue)' }}>STUDENT PORTAL</span>
                        </div>
                        <h2 style={{ marginBottom: '16px', fontSize: '28px', letterSpacing: 'normal' }}>Student Access</h2>
                        <p style={{ marginBottom: '40px', fontSize: '15px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                            View your enrolled courses, manage your weekly schedule, and track your academic progress and credits in one place.
                        </p>
                        <button className="btn-primary" style={{ width: '100%', padding: '16px', fontSize: '14px', letterSpacing: 'normal' }}>
                            LOG IN AS STUDENT
                        </button>
                    </div>

                    {/* Employee Card */}
                    <div className="card liquid-glass" onClick={() => navigate('/login/admin')} style={{
                        cursor: 'pointer',
                        padding: '40px'
                    }}>
                        <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-red)' }}></div>
                            <span style={{ fontSize: '12px', fontWeight: 600, letterSpacing: 'normal', color: 'var(--accent-red)' }}>ADMIN PORTAL</span>
                        </div>
                        <h2 style={{ marginBottom: '16px', fontSize: '28px', letterSpacing: 'normal' }}>Administrator Access</h2>
                        <p style={{ marginBottom: '40px', fontSize: '15px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                            Manage student records, coordinate course registrations, and oversee institutional settings and academic reports.
                        </p>
                        <button className="btn-secondary" style={{ width: '100%', padding: '16px', fontSize: '14px', letterSpacing: 'normal', borderColor: 'var(--accent-red)', color: 'var(--accent-red)' }}>
                            LOG IN AS ADMIN
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default RoleSelection;
