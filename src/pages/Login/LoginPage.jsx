import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login Form Data:', formData);

        // Determine dummy role based on email or just default to student
        const role = formData.email.includes('admin') ? 'admin' : 'student';

        login({
            email: formData.email,
            name: formData.email.split('@')[0],
            role: role
        });

        navigate(role === 'admin' ? '/admin/dashboard' : '/student/dashboard');
    };

    return (
        <div className="auth-container">
            <div className="card auth-card">
                <h2 className="page-title" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Student Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            placeholder="e.g. gaddy@student.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                            Tip: Use 'admin' in email for Admin role.
                        </p>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                        Sign In
                    </button>
                </form>
                <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem' }}>
                    Don't have an account? <span
                        style={{ color: 'var(--primary-color)', fontWeight: '600', cursor: 'pointer' }}
                        onClick={() => navigate('/register')}
                    >Register here</span>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
