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

const SecurityMonitoring = () => {
    const { auditLogs } = useAdmin();

    return (
        <div style={{ display: 'flex', minHeight: '100vh', position: 'relative' }}>
            <Sidebar links={adminLinks} />
            <div style={{ flex: 1, padding: '40px 40px 40px 104px', overflowY: 'auto' }}>
                <div className="container" style={{ margin: '0', maxWidth: '1200px' }}>
                    <header style={{ marginBottom: '48px' }}>
                        <h1 style={{ marginBottom: '12px' }}>Security & Monitoring</h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Real-time threat detection and institutional audit trails.</p>
                    </header>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '48px' }}>
                        <SecurityTile label="FAILED_LOGINS" value="12" meta="Last 24h" color="var(--accent-red)" />
                        <SecurityTile label="ACTIVE_SESSIONS" value="45" meta="Across grid" color="#10B981" />
                        <SecurityTile label="THREAT_INDEX" value="LOW" meta="No breaches" color="#10B981" />
                        <SecurityTile label="ADMIN_UPLINKS" value="3" meta="Active moderators" color="var(--accent-blue)" />
                    </div>

                    <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                        <div style={{ padding: '24px 32px', borderBottom: '1px solid #111', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ fontSize: '14px', fontWeight: 700 }}>CHRONOLOGICAL AUDIT LEDGER</h3>
                            <button className="btn-secondary" style={{ fontSize: '10px' }}>EXPORT_AUDIT_PDF</button>
                        </div>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid #111' }}>
                                        <th style={{ padding: '20px 32px', fontSize: '10px', color: 'var(--text-muted)' }}>TIMESTAMP</th>
                                        <th style={{ padding: '20px 32px', fontSize: '10px', color: 'var(--text-muted)' }}>ACTION_NODE</th>
                                        <th style={{ padding: '20px 32px', fontSize: '10px', color: 'var(--text-muted)' }}>IDENTITY</th>
                                        <th style={{ padding: '20px 32px', fontSize: '10px', color: 'var(--text-muted)' }}>IP_ADDR</th>
                                        <th style={{ padding: '20px 32px', fontSize: '10px', color: 'var(--text-muted)', textAlign: 'right' }}>STATUS</th>
                                    </tr>
                                </thead>
                                <tbody style={{ fontFamily: 'monospace', fontSize: '12px' }}>
                                    {auditLogs.map((log, i) => (
                                        <tr key={i} style={{ borderBottom: '1px solid #080808' }}>
                                            <td style={{ padding: '20px 32px', color: 'var(--text-muted)' }}>{log.timestamp}</td>
                                            <td style={{ padding: '20px 32px', fontWeight: 700 }}>{log.action}</td>
                                            <td style={{ padding: '20px 32px' }}>{log.user || log.admin}</td>
                                            <td style={{ padding: '20px 32px', color: 'var(--accent-blue)' }}>{log.ip}</td>
                                            <td style={{ padding: '20px 32px', textAlign: 'right' }}>
                                                <span style={{ fontSize: '9px', padding: '4px 8px', borderRadius: '4px', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-blue)' }}>SUCCESS</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SecurityTile = ({ label, value, meta, color }) => (
    <div className="card" style={{ padding: '24px' }}>
        <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block', marginBottom: '12px', fontWeight: 700 }}>{label}</span>
        <div style={{ fontSize: '32px', fontWeight: 700, color: color }}>{value}</div>
        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '8px' }}>{meta}</div>
    </div>
);

export default SecurityMonitoring;
