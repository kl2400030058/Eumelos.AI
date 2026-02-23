import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';

const studentLinks = [
    { path: '/student/dashboard', label: 'Dashboard' },
    { path: '/student/courses', label: 'My Courses' },
    { path: '/student/schedule', label: 'My Schedule' },
    { path: '/student/mentors', label: 'Mentors' },
    { path: '/student/assignments', label: 'Assignments' },
    { path: '/student/attendance', label: 'Attendance' },
];

const ATTENDANCE_LOG = [
    { date: '2026-02-18', course: 'CS101', status: 'PRESENT', time: '09:02' },
    { date: '2026-02-17', course: 'MATH201', status: 'PRESENT', time: '10:28' },
    { date: '2026-02-16', course: 'CS101', status: 'LATE', time: '09:15' },
    { date: '2026-02-15', course: 'PHYS101', status: 'PRESENT', time: '14:00' },
];

const Attendance = () => {
    return (
        <div style={{ display: 'flex', minHeight: '100vh', position: 'relative' }}>
            <Sidebar links={studentLinks} />
            <div style={{ flex: 1, padding: '40px 40px 40px 104px', overflowY: 'auto' }}>
                <div className="container" style={{ margin: '0', maxWidth: '1000px' }}>
                    <div className="animate-fade-in">
                        <header style={{ marginBottom: '64px' }}>
                            <div style={{ display: 'flex', gap: '6px', marginBottom: '24px' }}>
                                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--accent-blue)' }}></div>
                                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }}></div>
                                <div style={{ width: '16px', height: '4px', borderRadius: '2px', background: 'var(--accent-red)' }}></div>
                            </div>
                            <h1 style={{ marginBottom: '12px' }}>Attendance Records</h1>
                            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Track your daily course attendance and punctuality records.</p>
                        </header>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '48px' }}>
                            <div className="card" style={{ position: 'relative' }}>
                                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '12px' }}>OVERALL_LOG</span>
                                <div style={{ fontSize: '32px', fontWeight: 700 }}>96.4%</div>
                                <div className="intel-popover">
                                    <div style={{ color: 'var(--accent-blue)', fontWeight: 700, marginBottom: '8px', fontSize: '10px' }}>ATTENDANCE_STATS</div>
                                    <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>
                                        Stability Ratio: 0.98<br />
                                        Protocol Adherence: High
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '12px' }}>PUNCTUALITY</span>
                                <div style={{ fontSize: '32px', fontWeight: 700 }}>92.1%</div>
                            </div>
                            <div className="card">
                                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '12px' }}>SESSION_COUNT</span>
                                <div style={{ fontSize: '32px', fontWeight: 700 }}>12 DAYS</div>
                            </div>
                        </div>

                        <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid #111' }}>
                                        <th style={{ padding: '20px 24px', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)' }}>DATE</th>
                                        <th style={{ padding: '20px 24px', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)' }}>COURSE</th>
                                        <th style={{ padding: '20px 24px', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)' }}>STATUS</th>
                                        <th style={{ padding: '20px 24px', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textAlign: 'right' }}>CHECK_IN_TIME</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ATTENDANCE_LOG.map((log, idx) => (
                                        <tr key={idx} style={{ borderBottom: '1px solid #0a0a0a' }} className="hover-row">
                                            <td style={{ padding: '20px 24px', fontSize: '13px', color: 'var(--text-muted)' }}>{log.date}</td>
                                            <td style={{ padding: '20px 24px', fontSize: '14px', fontWeight: 600 }}>{log.course}</td>
                                            <td style={{ padding: '20px 24px' }}>
                                                <span style={{
                                                    fontSize: '11px',
                                                    fontWeight: 700,
                                                    color: log.status === 'PRESENT' ? 'var(--accent-blue)' : 'var(--accent-red)'
                                                }}>
                                                    {log.status}
                                                </span>
                                            </td>
                                            <td style={{ padding: '20px 24px', textAlign: 'right', fontSize: '13px' }}>{log.time}</td>
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

export default Attendance;
