import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Logo from '../../components/Logo/Logo';

const AdminLoginPage = () => {
    const [employeeId, setEmployeeId] = useState('');
    const [department, setDepartment] = useState('');
    const [password, setPassword] = useState('');
    const [authCode, setAuthCode] = useState('');
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
        if (!/^\d{5}$/.test(employeeId)) {
            setError('Access Denied: Use a valid 5-digit Employee ID');
            return false;
        }

        if (!department) {
            setError('Selection Error: Department is required');
            return false;
        }

        if (password.length < 8) {
            setError('Security Error: Password does not meet requirements');
            return false;
        }

        if (authCode.length !== 6) {
            setError('Authentication Error: Use a valid 6-digit MFA code');
            return false;
        }

        if (captchaInput.toUpperCase() !== captchaChallenge) {
            setError('Verification failed: Captcha mismatch');
            generateCaptcha();
            return false;
        }

        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (validateForm()) {
            const userData = {
                id: employeeId,
                department,
                role: 'admin',
                name: 'Administrator',
                streak: 45
            };
            login(userData);
            navigate('/admin/dashboard');
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>

            <div className="container animate-fade-in" style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="card liquid-glass" style={{ width: '100%', maxWidth: '440px' }}>
                    <header style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                            <Logo size={48} />
                        </div>
                        <h2 style={{ marginBottom: '12px', fontSize: '28px', letterSpacing: 'normal' }}>Admin Login</h2>
                        <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                            Authorized staff login. Access the administrative dashboard to manage records.
                        </p>
                    </header>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Employee ID</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="5-digit ID (e.g. 12345)"
                                value={employeeId}
                                maxLength={5}
                                onChange={(e) => setEmployeeId(e.target.value.replace(/\D/g, ''))}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Department</label>
                            <select
                                className="form-input"
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                                style={{ appearance: 'none', background: 'var(--bg-section)' }}
                                required
                            >
                                <option value="" disabled>Select Department</option>
                                <option value="CSE">Computer Science</option>
                                <option value="ECE">Electronics & Comm.</option>
                                <option value="MECH">Mechanical Eng.</option>
                                <option value="ADMIN">Administration</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Security Password</label>
                            <input
                                type="password"
                                className="form-input"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">MFA Verification Code</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="000 000"
                                maxLength={6}
                                style={{ textAlign: 'center', fontSize: '20px', letterSpacing: 'normal', fontWeight: '600' }}
                                value={authCode}
                                onChange={(e) => setAuthCode(e.target.value.replace(/\D/g, ''))}
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
                                letterSpacing: 'normal',
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
                                placeholder="Verify Captcha"
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

                        <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                            Login to Portal
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
                                fontSize: '13px'
                            }}
                        >
                            Back to selection
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLoginPage;
