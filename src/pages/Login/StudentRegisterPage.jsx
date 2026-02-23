import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const StudentRegisterPage = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [captchaInput, setCaptchaInput] = useState('');
    const [captchaChallenge, setCaptchaChallenge] = useState('');
    const [error, setError] = useState('');
    const { login, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
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

    const generateCaptcha = () => {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let result = '';
        for (let i = 0; i < 6; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setCaptchaChallenge(result);
    };

    useEffect(() => {
        generateCaptcha();
    }, []);

    const validateForm = () => {
        if (fullName.length < 3) {
            setError('Please enter your full name');
            return false;
        }

        const emailRegex = /^2\d{9}@eumelos\.ai$/;
        if (!emailRegex.test(email)) {
            setError('Valid Eumelos.AI email required (2XXXXXXXXX@eumelos.ai)');
            return false;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters long');
            return false;
        }

        if (captchaInput.toUpperCase() !== captchaChallenge) {
            setError('Identity verification failed');
            generateCaptcha();
            return false;
        }

        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) return;

        const userData = {
            email,
            role: 'student',
            name: fullName,
            streak: 0
        };
        login(userData);
        navigate('/student/dashboard');
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>

            <div className="container animate-fade-in" style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="card liquid-glass" style={{ width: '100%', maxWidth: '440px' }}>
                    <header style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <h2 style={{ marginBottom: '12px' }}>Registration</h2>
                        <p style={{ fontSize: '14px' }}>Create your student credentials for Eumelos.AI</p>
                    </header>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Full Name</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Your full name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Eumelos.AI Email</label>
                            <input
                                type="email"
                                className="form-input"
                                placeholder="2XXXXXXXXX@eumelos.ai"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Create Password</label>
                            <input
                                type="password"
                                className="form-input"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div style={{
                            background: 'rgba(255, 255, 255, 0.02)',
                            border: '1px solid var(--border-main)',
                            borderRadius: '12px',
                            padding: '20px',
                            marginBottom: '32px'
                        }}>
                            <div style={{
                                letterSpacing: '6px',
                                fontSize: '18px',
                                textAlign: 'center',
                                marginBottom: '16px',
                                color: 'var(--text-primary)',
                                fontFamily: 'monospace',
                                background: 'rgba(255, 255, 255, 0.05)',
                                padding: '12px',
                                borderRadius: '6px'
                            }}>
                                {captchaChallenge}
                            </div>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Security Code"
                                value={captchaInput}
                                style={{ textAlign: 'center' }}
                                onChange={(e) => {
                                    setCaptchaInput(e.target.value.toUpperCase());
                                    setError('');
                                }}
                                required
                            />
                        </div>

                        {error && (
                            <div className="animate-fade-in" style={{
                                marginBottom: '24px',
                                fontSize: '13px',
                                color: '#FF4B4B',
                                textAlign: 'center',
                                padding: '12px',
                                border: '1px solid rgba(255, 75, 75, 0.2)',
                                background: 'rgba(255, 75, 75, 0.05)',
                                borderRadius: '8px'
                            }}>
                                {error}
                            </div>
                        )}

                        <button type="submit" className="btn-primary" style={{ width: '100%', marginBottom: '16px' }}>
                            Initialize Account
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate('/login/student')}
                            className="btn-secondary"
                            style={{ width: '100%' }}
                        >
                            Log In Instead
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default StudentRegisterPage;
