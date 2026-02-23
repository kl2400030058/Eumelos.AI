import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/Logo/Logo';
import './LandingPage.css';

const LandingPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            const path = user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard';
            navigate(path);
        }
    }, [user, navigate]);

    return (
        <div className="landing-wrapper">
            <main>
                {/* Hero Section */}
                <section className="hero container section-spacing">
                    <div className="reveal badge liquid-glass" style={{ color: 'var(--accent-blue)', borderColor: 'rgba(59, 130, 246, 0.3)', marginBottom: '32px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        <Logo size={18} />
                        OFFICIAL STUDENT PORTAL
                    </div>
                    <h1 className="reveal" style={{ fontSize: 'clamp(40px, 7vw, 64px)', maxWidth: '900px', marginBottom: '40px', lineHeight: '1.2', fontWeight: 800 }}>
                        Eumelos — Simple College Management and Course Registration.
                    </h1>
                    <p className="reveal muted max-width-text" style={{ margin: '0 auto 48px', textAlign: 'center', fontSize: '18px', lineHeight: '1.8' }}>
                        A dedicated student portal designed to simplify university life,
                        helping you manage your timetable and register for classes
                        with zero hassle.
                    </p>
                    <div className="reveal" style={{ display: 'flex', gap: '16px' }}>
                        <a href="#about" className="btn-secondary" style={{ padding: '20px 48px' }}>Learn More</a>
                        <Link to="/roles" className="btn-primary" style={{ padding: '20px 48px', fontSize: '14px', letterSpacing: '0.02em' }}>
                            Access Portal
                        </Link>
                    </div>
                </section>

                {/* Problem & Solution Section */}
                <section id="about" className="container section-spacing" style={{ borderTop: '1px solid var(--border-main)' }}>
                    <div className="grid-2" style={{ gap: '64px', alignItems: 'center' }}>
                        <div className="reveal">
                            <div className="badge" style={{ color: 'var(--accent-red)' }}>THE PROBLEM</div>
                            <h2 style={{ marginBottom: '24px' }}>Traditional Management is Broken.</h2>
                            <p className="muted" style={{ fontSize: '17px', lineHeight: '1.7' }}>
                                Most colleges still rely on manual registration and outdated ERP systems. This leads to frequent scheduling conflicts, data errors, and a frustrating experience for both students and staff. Waiting in queues and manual verification slows down the entire academic cycle.
                            </p>
                        </div>
                        <div className="reveal card glass-panel" style={{ borderLeft: '4px solid var(--accent-red)' }}>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                <li style={{ marginBottom: '16px', display: 'flex', gap: '12px' }}>
                                    <span style={{ color: 'var(--accent-red)' }}>✕</span> Manual Enrollment Errors
                                </li>
                                <li style={{ marginBottom: '16px', display: 'flex', gap: '12px' }}>
                                    <span style={{ color: 'var(--accent-red)' }}>✕</span> Overlapping Course Schedules
                                </li>
                                <li style={{ display: 'flex', gap: '12px' }}>
                                    <span style={{ color: 'var(--accent-red)' }}>✕</span> Lack of Real-time Progress Tracking
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="grid-2" style={{ gap: '64px', alignItems: 'center', marginTop: '100px' }}>
                        <div className="reveal card glass-panel" style={{ borderLeft: '4px solid var(--accent-blue)' }}>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                <li style={{ marginBottom: '16px', display: 'flex', gap: '12px' }}>
                                    <span style={{ color: '#10B981' }}>✓</span> Automated Course Validation
                                </li>
                                <li style={{ marginBottom: '16px', display: 'flex', gap: '12px' }}>
                                    <span style={{ color: '#10B981' }}>✓</span> Instant Conflict Detection
                                </li>
                                <li style={{ display: 'flex', gap: '12px' }}>
                                    <span style={{ color: '#10B981' }}>✓</span> Seamless Student-Staff Communication
                                </li>
                            </ul>
                        </div>
                        <div className="reveal" style={{ textAlign: 'right' }}>
                            <div className="badge" style={{ color: 'var(--accent-blue)' }}>OUR SOLUTION</div>
                            <h2 style={{ marginBottom: '24px' }}>Modern Academic Coordination.</h2>
                            <p className="muted" style={{ fontSize: '17px', lineHeight: '1.7' }}>
                                Eumelos automates your course selection process. Our portal checks for time conflicts and seat availability instantly, so you don't have to worry about manual errors. Everything a student needs, from attendance to assignments, is now in one place.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Comparison Section */}
                <section className="container section-spacing" style={{ borderTop: '1px solid var(--border-main)' }}>
                    <div className="reveal section-header">
                        <div className="badge">MARKET COMPARISON</div>
                        <h2>How We Compare.</h2>
                    </div>

                    <div className="reveal card glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--border-main)', background: 'rgba(255,255,255,0.02)' }}>
                                    <th style={{ padding: '24px' }}>Feature</th>
                                    <th style={{ padding: '24px' }}>Traditional ERPs</th>
                                    <th style={{ padding: '24px', color: 'var(--accent-blue)' }}>Eumelos.AI</th>
                                </tr>
                            </thead>
                            <tbody className="muted">
                                <tr style={{ borderBottom: '1px solid var(--border-main)' }}>
                                    <td style={{ padding: '20px 24px' }}>User Experience</td>
                                    <td style={{ padding: '20px 24px' }}>Complex & Cluttered</td>
                                    <td style={{ padding: '20px 24px', color: 'var(--text-primary)' }}>Clean & Focused</td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid var(--border-main)' }}>
                                    <td style={{ padding: '20px 24px' }}>Registration Speed</td>
                                    <td style={{ padding: '20px 24px' }}>Manual / Slow</td>
                                    <td style={{ padding: '20px 24px', color: 'var(--text-primary)' }}>Instant Validation</td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid var(--border-main)' }}>
                                    <td style={{ padding: '20px 24px' }}>Schedule Conflicts</td>
                                    <td style={{ padding: '20px 24px' }}>High Risk</td>
                                    <td style={{ padding: '20px 24px', color: 'var(--text-primary)' }}>0% Overlap Logic</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '20px 24px' }}>Mobile Access</td>
                                    <td style={{ padding: '20px 24px' }}>Poor Support</td>
                                    <td style={{ padding: '20px 24px', color: 'var(--text-primary)' }}>Fully Responsive</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Team Section */}
                <section className="container section-spacing" style={{ borderTop: '1px solid var(--border-main)' }}>
                    <div className="reveal section-header">
                        <div className="badge">OUR TEAM</div>
                        <h2>Designed by Students, for Students.</h2>
                        <p className="muted" style={{ margin: '0 auto' }}>Developed as a visionary project to redefine institutional workflow.</p>
                    </div>

                    <div className="grid-3" style={{ gap: '24px' }}>
                        <div className="reveal card glass-panel" style={{ textAlign: 'center' }}>
                            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--accent-blue-dim)', margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 700, color: 'var(--accent-blue)' }}>G</div>
                            <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Gangadhar</h3>
                            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>2400030058</div>
                            <p className="muted" style={{ fontSize: '14px' }}>UI/UX Designer</p>
                        </div>
                        <div className="reveal card glass-panel" style={{ textAlign: 'center' }}>
                            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--accent-blue-dim)', margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 700, color: 'var(--accent-blue)' }}>P</div>
                            <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Pranav</h3>
                            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>2400030353</div>
                            <p className="muted" style={{ fontSize: '14px' }}>Frontend Architecture</p>
                        </div>
                        <div className="reveal card glass-panel" style={{ textAlign: 'center' }}>
                            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--accent-blue-dim)', margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 700, color: 'var(--accent-blue)' }}>R</div>
                            <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Rushi</h3>
                            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>2400030748</div>
                            <p className="muted" style={{ fontSize: '14px' }}>Testing & QA</p>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="container section-spacing">
                    <div className="reveal cta-box card liquid-glass" style={{ padding: '100px 40px', textAlign: 'center' }}>
                        <div className="badge">GET STARTED</div>
                        <h2 style={{ fontSize: '48px', marginBottom: '32px' }}>Ready to experience the future of college management?</h2>
                        <p className="muted max-width-text" style={{ margin: '0 auto 56px', fontSize: '18px' }}>
                            Log in with your college credentials to access your personalized dashboard.
                        </p>
                        <Link to="/roles" className="btn-primary" style={{ padding: '24px 64px', fontSize: '16px' }}>Get Started</Link>
                    </div>
                </section>
            </main>


            <footer className="footer container">
                <div className="footer-content" style={{ opacity: 0.6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Logo size={24} />
                        <div className="logo-text" style={{ fontSize: '18px', letterSpacing: '0.05em' }}>EUMELOS.AI</div>
                    </div>
                    <div className="footer-links" style={{ gap: '60px' }}>
                        <div className="footer-group">
                            <h4 style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '20px' }}>FRAMEWORK</h4>
                            <ul>
                                <li><Link to="#" className="muted">Scheduling</Link></li>
                                <li><Link to="#" className="muted">Registration</Link></li>
                                <li><Link to="#" className="muted">Progress</Link></li>
                            </ul>
                        </div>
                        <div className="footer-group">
                            <h4 style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '20px' }}>DEVELOPERS</h4>
                            <ul>
                                <li className="muted">Gangadhar (2400030058)</li>
                                <li className="muted">Pranav (2400030353)</li>
                                <li className="muted">Rushi (2400030748)</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom muted" style={{ borderTop: '1px solid var(--border-main)', paddingTop: '40px', marginTop: '40px', fontSize: '11px' }}>
                    <div>© 2026 EUMELOS.AI // MANAGEMENT PORTAL v2.0</div>
                    <div>SYSTEM STATUS: ONLINE</div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
