import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useAdmin } from '../../context/AdminContext';

const adminLinks = [
    { path: '/admin/dashboard', label: 'Dashboard' },
    { path: '/admin/courses', label: 'Courses' },
    { path: '/admin/students', label: 'Students' },
    { path: '/admin/verification', label: 'Verification' },
    { path: '/admin/security', label: 'Security' },
    { path: '/admin/settings', label: 'Settings' },
    { path: '/profile', label: 'Profile' },
];

const SystemSettings = () => {
    const { systemSettings, setSystemSettings } = useAdmin();

    const handleUpdate = (key, value) => {
        setSystemSettings(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', position: 'relative' }}>
            <Sidebar links={adminLinks} />
            <div style={{ flex: 1, padding: '40px 40px 40px 104px', overflowY: 'auto' }}>
                <div className="container" style={{ margin: '0', maxWidth: '1000px' }}>
                    <header style={{ marginBottom: '48px' }}>
                        <h1 style={{ marginBottom: '12px' }}>System Settings</h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Configure core institutional parameters and protocol integrity.</p>
                    </header>

                    <div style={{ display: 'grid', gap: '48px' }}>
                        {/* Platform Configuration */}
                        <section className="card liquid-glass">
                            <h3 style={{ fontSize: '16px', marginBottom: '24px' }}>Branding & Core Identity</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                                <div className="form-group">
                                    <label className="form-label">Platform Designation</label>
                                    <input type="text" className="form-input" value={systemSettings.platformName} onChange={(e) => handleUpdate('platformName', e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Institutional Build Phase</label>
                                    <input type="text" className="form-input" value={systemSettings.buildVersion} readOnly />
                                </div>
                            </div>
                        </section>

                        {/* Security Policy */}
                        <section className="card liquid-glass">
                            <h3 style={{ fontSize: '16px', marginBottom: '24px' }}>Security & Auth Protocol</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                                <div className="form-group">
                                    <label className="form-label">Password Policy</label>
                                    <select className="form-input" value={systemSettings.passwordPolicy} onChange={(e) => handleUpdate('passwordPolicy', e.target.value)}>
                                        <option value="STANDARD">STANDARD</option>
                                        <option value="STRICT">STRICT (Monospace + Special)</option>
                                        <option value="INSTITUTIONAL">INSTITUTIONAL (Max Entropy)</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Dual-Factor Auth (2FA)</label>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '12px' }}>
                                        <input type="checkbox" checked={systemSettings.twoFactorMandatory} onChange={(e) => handleUpdate('twoFactorMandatory', e.target.checked)} />
                                        <span style={{ fontSize: '13px' }}>Enforce for all Admin Nodes</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Legal Protocols */}
                        <section className="card liquid-glass">
                            <h3 style={{ fontSize: '16px', marginBottom: '24px' }}>Institutional Compliance Edits</h3>
                            <div style={{ display: 'grid', gap: '32px' }}>
                                <div className="form-group">
                                    <label className="form-label">Terms & Conditions Editor (Markdown Area)</label>
                                    <textarea className="form-input" style={{ width: '100%', height: '120px', fontSize: '12px', fontFamily: 'monospace' }} defaultValue="# Institutional Terms of Service..." />
                                </div>
                            </div>
                        </section>

                        {/* System Maintenance */}
                        <section className="card liquid-glass" style={{ background: 'rgba(239, 68, 68, 0.05)', borderColor: 'rgba(239, 68, 68, 0.1)' }}>
                            <h3 style={{ fontSize: '16px', marginBottom: '12px', color: 'var(--accent-red)' }}>Critical Operations</h3>
                            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '24px' }}>Actions below require Super-Admin authorization and generate a permanent audit log.</p>
                            <div style={{ display: 'flex', gap: '16px' }}>
                                <button className="btn-secondary" style={{ borderColor: 'var(--accent-red)', color: 'var(--accent-red)' }}>WIPE_SESSION_STORE</button>
                                <button className="btn-secondary">BACKUP_DATABASE_UPLINK</button>
                                <button className="btn-primary" style={{ background: 'var(--accent-red)' }}>TERMINATE_PLATFORM_ACCESS</button>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SystemSettings;
