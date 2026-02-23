import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Logo from '../../components/Logo/Logo';

const StudentLoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [captchaInput, setCaptchaInput] = useState('');
    const [isRobotVerified, setIsRobotVerified] = useState(false);
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
        const emailRegex = /^2\d{9}@eumelos\.ai$/;
        if (!emailRegex.test(email)) {
            setError('Please use a valid Eumelos.AI email format (2XXXXXXXXX@eumelos.ai)');
            return false;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters long');
            return false;
        }

        if (!isRobotVerified) {
            setError('Verification required');
            return false;
        }

        if (captchaInput.toUpperCase() !== captchaChallenge) {
            setError('Captcha code verification failed');
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
            name: email.split('@')[0],
            streak: 12
        };
        login(userData);
        navigate('/student/dashboard');
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>

            <div className="container animate-fade-in" style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="card liquid-glass" style={{ width: '100%', maxWidth: '440px' }}>
                    <header style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                            <Logo size={48} />
                        </div>
                        <h2 style={{ marginBottom: '12px', fontSize: '28px', letterSpacing: 'normal' }}>Student Login</h2>
                        <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                            Please sign in with your Eumelos.AI credentials to access your dashboard.
                        </p>
                    </header>

                    <form onSubmit={handleSubmit}>
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
                            <label className="form-label">Password</label>
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
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: isRobotVerified ? '20px' : '0' }}>
                                <input
                                    type="checkbox"
                                    id="robot"
                                    style={{
                                        width: '18px',
                                        height: '18px',
                                        accentColor: 'var(--accent-blue)',
                                        cursor: 'pointer'
                                    }}
                                    checked={isRobotVerified}
                                    onChange={(e) => {
                                        setIsRobotVerified(e.target.checked);
                                        setError('');
                                    }}
                                />
                                <label htmlFor="robot" style={{ fontSize: '14px', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                                    I am not a robot
                                </label>
                            </div>

                            {isRobotVerified && (
                                <div className="animate-fade-in">
                                    <div style={{
                                        letterSpacing: 'normal',
                                        fontSize: '20px',
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
                                        placeholder="Enter code"
                                        value={captchaInput}
                                        style={{ textAlign: 'center' }}
                                        onChange={(e) => {
                                            setCaptchaInput(e.target.value.toUpperCase());
                                            setError('');
                                        }}
                                    />
                                </div>
                            )}
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
                            Sign In
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate('/register/student')}
                            className="btn-secondary"
                            style={{ width: '100%' }}
                        >
                            Create Account
                        </button>
                    </form>

                    <div style={{ marginTop: '32px', textAlign: 'center' }}>
                        <button
                            onClick={() => navigate('/roles')}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: 'var(--text-muted)',
                                cursor: 'pointer',
                                fontSize: '13px',
                                transition: 'color 0.2s'
                            }}
                            onMouseOver={(e) => e.target.style.color = 'var(--text-secondary)'}
                            onMouseOut={(e) => e.target.style.color = 'var(--text-muted)'}
                        >
                            Back to selection
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentLoginPage;
