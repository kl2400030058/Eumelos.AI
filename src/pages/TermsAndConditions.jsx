import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo/Logo';
import './TermsAndConditions.css';

const TermsAndConditions = ({ onAccept }) => {
    const [agreed, setAgreed] = useState(false);
    const navigate = useNavigate();

    const handleAccept = () => {
        if (agreed) {
            localStorage.setItem('eumelos_terms_accepted', 'true');
            if (onAccept) {
                onAccept();
            } else {
                navigate('/roles');
            }
        }
    };

    return (
        <div className="terms-wrapper">
            <div className="container animate-page-entry" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '40px 20px' }}>
                <div className="card liquid-glass" style={{ maxWidth: '800px', width: '100%', padding: '48px', position: 'relative' }}>
                    <header style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                            <Logo size={48} />
                        </div>
                        <h1 style={{ fontSize: '36px', marginBottom: '8px', letterSpacing: '0.05em' }}>ACADEMIC RULES AND REGULATIONS</h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>EUMELOS.AI // v2.0</p>
                    </header>

                    <div className="terms-content" style={{
                        maxHeight: '400px',
                        overflowY: 'auto',
                        padding: '32px',
                        background: 'rgba(255,255,255,0.01)',
                        borderRadius: '16px',
                        border: '1px solid var(--border-main)',
                        fontSize: '14px',
                        lineHeight: '1.8',
                        color: 'var(--text-secondary)',
                        marginBottom: '32px'
                    }}>
                        <section style={{ marginBottom: '32px' }}>
                            <h4 style={{ color: 'var(--text-primary)', marginBottom: '16px', fontSize: '16px' }}>1. GENERAL USE</h4>
                            <p>This Student Portal is provided by Eumelos.AI to help you manage your course selection, view your weekly schedule, and keep track of your academic performance. By using this portal, you agree to follow the standard Eumelos.AI guidelines for digital conduct and academic integrity.</p>
                        </section>

                        <section style={{ marginBottom: '32px' }}>
                            <h4 style={{ color: 'var(--text-primary)', marginBottom: '16px', fontSize: '16px' }}>2. ACCOUNT SECURITY</h4>
                            <p>You are responsible for keeping your login ID and password private. Do not share your credentials with anyone else. If you notice any unusual activity on your account, please report it to the IT Desk immediately.</p>
                        </section>

                        <section style={{ marginBottom: '32px' }}>
                            <h4 style={{ color: 'var(--text-primary)', marginBottom: '16px', fontSize: '16px' }}>3. DATA AND PRIVACY</h4>
                            <p>The portal stores your personal information, grades, and attendance for official Eumelos.AI use only. Your data is handled according to our privacy policy and is not shared with outside parties without your permission.</p>
                        </section>

                        <section style={{ marginBottom: '32px' }}>
                            <h4 style={{ color: 'var(--text-primary)', marginBottom: '16px', fontSize: '16px' }}>4. STUDENT CONDUCT</h4>
                            <p>All students are expected to use the portal in a professional manner. Any attempt to tamper with grades, bypass registration dates, or interfere with the portal's operation is considered a violation of Eumelos.AI policy and may lead to disciplinary action.</p>
                        </section>

                        <section style={{ marginBottom: '32px' }}>
                            <h4 style={{ color: 'var(--text-primary)', marginBottom: '16px', fontSize: '16px' }}>5. SYSTEM AVAILABILITY</h4>
                            <p>While we aim to keep the portal available 24/7, there may be times when it is down for scheduled maintenance or updates. Please check the notifications for any planned downtime before important deadlines.</p>
                        </section>

                        <section style={{ marginBottom: '32px' }}>
                            <h4 style={{ color: 'var(--text-primary)', marginBottom: '16px', fontSize: '16px' }}>6. INTELLECTUAL PROPERTY</h4>
                            <p>The content and software of this portal belong to the Eumelos.AI development team. Students are granted access for academic purposes only.</p>
                        </section>

                        <section>
                            <h4 style={{ color: 'var(--text-primary)', marginBottom: '16px', fontSize: '16px' }}>7. TERMINATION OF ACCESS</h4>
                            <p>Eumelos.AI reserves the right to suspend or disable portal access for any student who violates these terms or no longer has an active enrollment status.</p>
                        </section>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
                        <div
                            onClick={() => setAgreed(!agreed)}
                            style={{
                                width: '22px',
                                height: '22px',
                                borderRadius: '6px',
                                border: `2px solid ${agreed ? 'var(--accent-blue)' : 'var(--border-main)'}`,
                                background: agreed ? 'var(--accent-blue)' : 'transparent',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            {agreed && (
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            )}
                        </div>
                        <label
                            onClick={() => setAgreed(!agreed)}
                            style={{ fontSize: '14px', cursor: 'pointer', color: agreed ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                        >
                            I HAVE READ AND ACCEPT THE TERMS AND CONDITIONS.
                        </label>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <button
                            className="btn-secondary"
                            onClick={() => navigate('/')}
                            style={{ width: '100%' }}
                        >
                            DECLINE
                        </button>
                        <button
                            className="btn-primary"
                            disabled={!agreed}
                            onClick={handleAccept}
                            style={{
                                width: '100%',
                                opacity: agreed ? 1 : 0.5,
                                cursor: agreed ? 'pointer' : 'not-allowed'
                            }}
                        >
                            PROCEED TO PORTAL
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;
