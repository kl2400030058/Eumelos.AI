import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar/Sidebar';
import './Profile.css';

const Profile = () => {
    const { user, updateUser, logout, isAdmin } = useAuth();
    const [activeTab, setActiveTab] = useState('overview');
    const [isEditing, setIsEditing] = useState(false);
    const [flipped, setFlipped] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        id: user?.id || user?.email?.split('@')[0] || 'STU-9928-X',
        department: user?.department || 'Department of Neural Systems',
        semester: 'Semester 4',
        phone: '+1 (555) 012-9920'
    });
    const [profileImage, setProfileImage] = useState(user?.profileImage || null);
    const fileInputRef = useRef(null);

    const studentLinks = [
        { path: '/student/dashboard', label: 'Dashboard' },
        { path: '/student/courses', label: 'My Courses' },
        { path: '/student/schedule', label: 'My Schedule' },
        { path: '/student/mentors', label: 'Mentors' },
        { path: '/student/assignments', label: 'Assignments' },
        { path: '/student/attendance', label: 'Attendance' },
    ];

    const adminLinks = [
        { path: '/admin/dashboard', label: 'Admin Dashboard' },
        { path: '/admin/courses', label: 'Manage Courses' },
        { path: '/admin/students', label: 'Student Management' },
        { path: '/admin/verification', label: 'Document Verification' },
        { path: '/admin/security', label: 'Security & Access' },
        { path: '/admin/settings', label: 'System Settings' },
    ];

    const links = isAdmin ? adminLinks : studentLinks;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        updateUser({
            ...formData,
            profileImage
        });
        setIsEditing(false);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
                updateUser({ profileImage: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'academic', label: 'Academic' },
        { id: 'idcard', label: 'ID Card' },
        { id: 'security', label: 'Security' },
        { id: 'activity', label: 'Activity' }
    ];

    return (
        <div style={{ display: 'flex', minHeight: '100vh', position: 'relative' }}>
            <Sidebar links={links} />

            <div className="container" style={{ flex: 1, padding: '40px 40px 40px 104px', maxWidth: '1200px', margin: '0' }}>
                <header className="animate-fade-in" style={{ marginBottom: '40px' }}>
                    <div style={{ display: 'flex', gap: '6px', marginBottom: '24px' }}>
                        <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: isAdmin ? 'var(--accent-red)' : 'var(--accent-blue)' }}></div>
                        <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }}></div>
                        <div style={{ width: '16px', height: '4px', borderRadius: '2px', background: isAdmin ? 'var(--accent-blue)' : 'var(--accent-red)' }}></div>
                    </div>
                    <h1 style={{ fontSize: '32px' }}>Profile Settings</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Review and manage your personal academic information for User ID: {formData.id}.</p>
                </header>

                <div className="profile-tabs animate-fade-in">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`profile-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="profile-content animate-fade-in">
                    {activeTab === 'overview' && (
                        <div className="card glass-panel" style={{ padding: '48px' }}>
                            <div style={{ display: 'flex', gap: '60px', alignItems: 'flex-start' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <div
                                        style={{
                                            width: '160px',
                                            height: '160px',
                                            borderRadius: '50%',
                                            background: 'rgba(255, 255, 255, 0.05)',
                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            overflow: 'hidden',
                                            cursor: 'pointer',
                                            position: 'relative'
                                        }}
                                        onClick={() => fileInputRef.current.click()}
                                    >
                                        {profileImage ? (
                                            <img src={profileImage} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        ) : (
                                            <div style={{ fontSize: '48px', color: 'var(--text-muted)' }}>
                                                {formData.name.charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.8)', color: 'white', fontSize: '10px', padding: '6px', opacity: 0.8 }}>UPDATE</div>
                                    </div>
                                    <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="image/*" onChange={handleImageChange} />
                                    <div className="node-verified-badge">
                                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }}></div>
                                        VERIFIED UNIVERSITY MEMBER
                                    </div>
                                </div>

                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                                        <InfoBlock label="FULL NAME" value={formData.name} />
                                        <InfoBlock label="STUDENT ID" value={formData.id} mono />
                                        <InfoBlock label="DEPARTMENT" value={formData.department} />
                                        <InfoBlock label="ENROLLMENT STATUS" value={`${formData.semester} / ACTIVE`} />
                                        <InfoBlock label="UNIVERSITY EMAIL" value={formData.email} />
                                        <InfoBlock label="PHONE NUMBER" value={formData.phone} />
                                    </div>
                                    <div style={{ marginTop: '48px', display: 'flex', gap: '16px' }}>
                                        <button className="btn-primary" onClick={() => setIsEditing(true)} style={{ padding: '12px 32px' }}>Edit Details</button>
                                        <button className="btn-secondary" onClick={logout} style={{ padding: '12px 32px', borderColor: 'var(--accent-red)', color: 'var(--accent-red)' }}>Sign Out</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'academic' && (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                            <div className="card liquid-glass" style={{ padding: '40px' }}>
                                <h3 style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '32px', letterSpacing: '0.1em' }}>ACADEMIC_PROGRESS</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                                    <StatBlock label="CURRENT GPA" value="3.84" meta="+0.12 Δ" />
                                    <StatBlock label="CREDITS EARNED" value="124" meta="86%" />
                                    <StatBlock label="REMAINING" value="36" />
                                    <StatBlock label="STABILITY INDEX" value="98%" />
                                </div>
                                <div style={{ marginTop: '48px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '11px' }}>
                                        <span>GRADUATION PROGRESS</span>
                                        <span style={{ color: 'var(--accent-blue)' }}>78.4%</span>
                                    </div>
                                    <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}>
                                        <div style={{ width: '78.4%', height: '100%', background: 'var(--accent-blue)', boxShadow: '0 0 10px var(--accent-blue-dim)' }}></div>
                                    </div>
                                </div>
                            </div>
                            <div className="card liquid-glass" style={{ padding: '40px' }}>
                                <h3 style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '32px', letterSpacing: '0.1em' }}>GPA_HISTORY</h3>
                                <div style={{ height: '160px', display: 'flex', alignItems: 'flex-end', gap: '12px' }}>
                                    {[30, 45, 60, 55, 75, 85, 95].map((h, i) => (
                                        <div key={i} style={{ flex: 1, background: 'var(--accent-blue-dim)', border: '1px solid var(--accent-blue-dim)', height: `${h}%`, borderRadius: '4px' }} />
                                    ))}
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', fontSize: '10px', color: 'var(--text-muted)' }}>
                                    <span>SEM 1</span>
                                    <span>SEM 2</span>
                                    <span>SEM 3</span>
                                    <span>CURRENT</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'idcard' && (
                        <div style={{ textAlign: 'center' }}>
                            <div className="id-card-viewport">
                                <div className={`id-card-inner ${flipped ? 'flipped' : ''}`}>
                                    {/* FRONT */}
                                    <div className="id-card-front">
                                        <div className="id-card-header">
                                            <div style={{ fontSize: '16px', fontWeight: 700, letterSpacing: '0.2em' }}>EUMELOS.AI</div>
                                        </div>
                                        <div className="id-card-photo">
                                            {profileImage ? <img src={profileImage} alt="Photo" /> : <div style={{ height: '100%', background: '#111' }} />}
                                        </div>
                                        <div className="id-card-info">
                                            <h3 style={{ fontSize: '20px', marginBottom: '4px' }}>{formData.name.toUpperCase()}</h3>
                                            <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>CORE LEARNER</p>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', textAlign: 'left', marginBottom: '24px' }}>
                                                <CardDetail label="ID_NO" value={formData.id} />
                                                <CardDetail label="DEPT" value={formData.department.split(' ')[0]} />
                                            </div>
                                            <div className="id-card-qr">
                                                <div style={{ width: '100%', height: '100%', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', fontSize: '8px' }}>QR_CODE</div>
                                            </div>
                                            <p style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '12px' }}>VALID UNTIL: JUNE 2026</p>
                                        </div>
                                    </div>
                                    {/* BACK */}
                                    <div className="id-card-back">
                                        <div className="id-card-header">
                                            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>INSTITUTIONAL_PROTOCOL</div>
                                        </div>
                                        <div style={{ padding: '32px', textAlign: 'left' }}>
                                            <CardDetail label="EMERGENCY_CONTACT" value="+1 (555) 012-4400" />
                                            <CardDetail label="BLOOD_GROUP" value="O+ POSITIVE" />
                                            <CardDetail label="INSTITUTIONAL_ADDRESS" value="Central Core, Sector 7-G, Neo Campus" />
                                            <div style={{ marginTop: '48px', opacity: 0.4 }}>
                                                <div style={{ height: '40px', background: '#333', marginBottom: '8px' }}></div>
                                                <p style={{ fontSize: '8px', lineHeight: '1.4' }}>
                                                    This document is the property of Eumelos.AI institutional layer.
                                                    Unauthorized duplication or possession is a protocol violation.
                                                    Subject to remote nullification.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ marginTop: '48px', display: 'flex', gap: '16px', justifyContent: 'center' }}>
                                <button className="btn-secondary" onClick={() => setFlipped(!flipped)} style={{ padding: '10px 24px' }}>FLIP_CARD</button>
                                <button className="btn-primary" onClick={() => window.print()} style={{ padding: '10px 24px' }}>DOWNLOAD_PDF</button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="card glass-panel" style={{ maxWidth: '600px', margin: '0 auto', padding: '48px' }}>
                            <h3 style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '32px', letterSpacing: '0.1em' }}>SECURITY_PROTOCOL</h3>
                            <div style={{ display: 'grid', gap: '32px' }}>
                                <SecurityAction title="Change Matrix Password" desc="Last updated 24 days ago." action="UPDATE" />
                                <SecurityAction title="Multi-Factor Auth (2FA)" desc="Status: ENABLED" action="MANAGE" />
                                <SecurityAction title="Active Session Monitoring" desc="3 active uplinks detected." action="VIEW" />
                                <SecurityAction title="Hardware Security Keys" desc="No keys registered." action="REGISTER" />
                            </div>
                            <div style={{ marginTop: '48px', pt: '32px', borderTop: '1px solid #111' }}>
                                <button className="btn-secondary" style={{ width: '100%', borderColor: 'var(--accent-red)', color: 'var(--accent-red)' }}>LOGOUT_ALL_DEVICES</button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'activity' && (
                        <div className="card glass-panel" style={{ padding: '48px' }}>
                            <h3 style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '32px', letterSpacing: '0.1em' }}>ACTIVITY_HISTORY</h3>
                            <div className="activity-ledger">
                                <ActivityRow time="2026-02-20 | 12:42:05" event="COURSE_SYNC" desc="Enrolled in CS101: Quantum Computing" current />
                                <ActivityRow time="2026-02-19 | 15:10:22" event="ASSIGNMENT_SUBMITTED" desc="Submitted MATH201 Midterm Lab" />
                                <ActivityRow time="2026-02-18 | 09:02:15" event="ATTENDANCE_RECORDED" desc="Attendance logged: CS101" />
                                <ActivityRow time="2026-02-17 | 18:30:00" event="PROFILE_UPDATE" desc="Modified contact information" />
                                <ActivityRow time="2026-02-16 | 11:30:00" event="MENTOR_MEETING" desc="Requested consultation: DR. ARIS" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const InfoBlock = ({ label, value, mono = false }) => (
    <div>
        <label style={{ display: 'block', fontSize: '10px', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 700 }}>{label}</label>
        <div style={{ fontSize: '16px', color: 'var(--text-primary)', fontFamily: mono ? 'monospace' : 'inherit' }}>{value}</div>
    </div>
);

const StatBlock = ({ label, value, meta }) => (
    <div>
        <label style={{ display: 'block', fontSize: '10px', color: 'var(--text-muted)', marginBottom: '12px', fontWeight: 700 }}>{label}</label>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '28px', fontWeight: 700 }}>{value}</span>
            {meta && <span style={{ fontSize: '12px', color: '#10B981', fontWeight: 600 }}>{meta}</span>}
        </div>
    </div>
);

const CardDetail = ({ label, value }) => (
    <div>
        <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.4)', fontWeight: 700, marginBottom: '2px' }}>{label}</div>
        <div style={{ fontSize: '12px', fontWeight: 600 }}>{value}</div>
    </div>
);

const SecurityAction = ({ title, desc, action }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
            <div style={{ fontSize: '15px', fontWeight: 600, marginBottom: '4px' }}>{title}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{desc}</div>
        </div>
        <button style={{ background: 'none', border: '1px solid var(--border-main)', color: 'var(--text-primary)', padding: '6px 12px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, cursor: 'pointer' }}>
            {action}
        </button>
    </div>
);

const ActivityRow = ({ time, event, desc, current = false }) => (
    <div className={`activity-node ${current ? 'current' : ''}`}>
        <div style={{ fontFamily: 'monospace', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>{time}</div>
        <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '4px' }}>{event}: <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}>{desc}</span></div>
    </div>
);

export default Profile;
