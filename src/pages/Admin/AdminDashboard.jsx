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

const AdminDashboard = () => {
    const { students, auditLogs, announcements, exportData } = useAdmin();

    const stats = {
        total: students.length,
        active: students.filter(s => s.status === 'ACTIVE').length,
        pending: students.filter(s => s.verification === 'PENDING').length,
        avgAttendance: 92,
    };
    return (
        <div style={{ display: 'flex', minHeight: '100vh', position: 'relative' }}>
            <Sidebar links={adminLinks} />
            <div style={{ flex: 1, padding: '60px 60px 60px calc(var(--sidebar-width) + 30px)', overflowY: 'auto' }}>
                <div className="container" style={{ margin: '0', maxWidth: '1400px' }}>
                    <div className="animate-fade-in">
                        <header style={{ marginBottom: '80px' }}>
                            <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
                                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-red)' }}></div>
                                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }}></div>
                                <div style={{ width: '24px', height: '6px', borderRadius: '3px', background: 'var(--accent-blue)' }}></div>
                            </div>
                            <h1 style={{ marginBottom: '16px', fontSize: '56px' }}>College Administration</h1>
                            <p style={{ color: 'var(--text-muted)', fontSize: '18px', maxWidth: '800px' }}>Comprehensive management of academic records, student status, and institutional data.</p>
                        </header>

                        <div style={{ display: 'grid', gap: '64px' }}>
                            {/* Stats Grid */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
                                <div className="card liquid-glass">
                                    <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '16px' }}>TOTAL STUDENTS</span>
                                    <div style={{ fontSize: '42px', fontWeight: 700 }}>{stats.total}</div>
                                    <p style={{ marginTop: '12px', fontSize: '13px', color: 'var(--accent-blue)' }}>{stats.active} Students currently active</p>
                                </div>

                                <div className="card liquid-glass">
                                    <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '16px' }}>PENDING VERIFICATIONS</span>
                                    <div style={{ fontSize: '42px', fontWeight: 700 }}>{stats.pending}</div>
                                    <p style={{ marginTop: '12px', fontSize: '13px', color: 'var(--accent-red)' }}>Applications awaiting review</p>
                                </div>

                                <div className="card liquid-glass">
                                    <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '16px' }}>AVERAGE ATTENDANCE</span>
                                    <div style={{ fontSize: '42px', fontWeight: 700 }}>{stats.avgAttendance}%</div>
                                    <p style={{ marginTop: '12px', fontSize: '13px', color: '#10B981' }}>Across all departments</p>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr', gap: '24px' }}>
                                {/* Intelligence Insights */}
                                <div className="card liquid-glass">
                                    <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '24px' }}>ACADEMIC INSIGHTS</span>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                                        <InsightItem label="MOST POPULAR COURSE" value="NEURAL SYSTEMS" />
                                        <InsightItem label="LOW ATTENDANCE ALERTS" value="8 Students" />
                                        <InsightItem label="MONTHLY ENROLLMENT" value="+12.4%" />
                                        <InsightItem label="SYSTEM ALERTS" value="ACTION REQUIRED" color="var(--accent-red)" />
                                    </div>
                                    <div style={{ marginTop: '40px', pt: '24px', borderTop: '1px solid #111' }}>
                                        <h4 style={{ fontSize: '12px', marginBottom: '16px', color: 'var(--text-muted)' }}>ADMINISTRATIVE TASKS</h4>
                                        <div style={{ display: 'flex', gap: '12px' }}>
                                            <button className="btn-secondary" style={{ fontSize: '10px' }}>SEND NOTIFICATION</button>
                                            <button className="btn-secondary" style={{ fontSize: '10px' }} onClick={() => exportData('SYSTEM_AUDIT')}>GENERATE REPORT</button>
                                            <button className="btn-primary" style={{ fontSize: '10px' }}>MANAGE ACCESS</button>
                                        </div>
                                    </div>
                                </div>

                                {/* Activity Log */}
                                <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '24px' }}>RECENT SYSTEM LOGS</span>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1, overflowY: 'auto', maxHeight: '300px' }}>
                                        {auditLogs.slice(0, 5).map((log, i) => (
                                            <div key={i} style={{ padding: '12px', background: '#080808', border: '1px solid #111', borderRadius: '8px' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                                    <span style={{ fontSize: '11px', fontWeight: 700 }}>{log.action}</span>
                                                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{log.timestamp.split(' ')[1]}</span>
                                                </div>
                                                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>BY: {log.admin || log.user}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

const InsightItem = ({ label, value, color }) => (
    <div>
        <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '8px' }}>{label}</div>
        <div style={{ fontSize: '16px', fontWeight: 700, color: color }}>{value}</div>
    </div>
);

const LeaderRow = ({ name, streak, role }) => (
    <div style={{
        padding: '20px',
        background: '#080808',
        border: '1px solid #111',
        borderRadius: '12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    }}>
        <div>
            <div style={{ fontSize: '15px', fontWeight: 700 }}>{name}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>{role.toUpperCase()}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--accent-blue)' }}>{streak}</div>
            <div style={{ fontSize: '9px', color: 'var(--text-muted)', fontWeight: 600 }}>STREAK</div>
        </div>
    </div>
);

export default AdminDashboard;
