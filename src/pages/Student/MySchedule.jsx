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

const REGISTERED_COURSES = [
    { id: 1, code: 'CS101', name: 'Quantum Computing', day: 'MON', time: '09:00 - 11:00' },
    { id: 3, code: 'ENG102', name: 'Applied Semantics', day: 'WED', time: '13:00 - 15:00' },
    { id: 4, code: 'PHYS101', name: 'Theoretical Physics', day: 'FRI', time: '11:00 - 13:00' },
];

const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI'];

const MySchedule = () => {
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
                            <h1 style={{ marginBottom: '12px' }}>Temporal Grid</h1>
                            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Weekly synchronization matrix and session load mapping.</p>
                        </header>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
                            {DAYS.map(day => (
                                <div key={day} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    <div style={{
                                        padding: '12px',
                                        fontSize: '11px',
                                        fontWeight: 700,
                                        color: 'var(--text-muted)',
                                        textAlign: 'center',
                                        borderBottom: '1px solid #111',
                                        marginBottom: '8px',
                                        letterSpacing: '0.1em'
                                    }}>
                                        {day}
                                    </div>
                                    {REGISTERED_COURSES.filter(c => c.day === day).map(course => (
                                        <div key={course.id} className="card" style={{ padding: '16px', background: '#050505', borderRadius: '12px', position: 'relative' }}>
                                            <div style={{ fontSize: '10px', color: 'var(--accent-blue)', fontWeight: 600, marginBottom: '4px' }}>{course.code}</div>
                                            <div style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: 600, marginBottom: '12px' }}>{course.name}</div>
                                            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{course.time}</div>
                                            <div className="intel-popover">
                                                <div style={{ color: 'var(--accent-blue)', fontWeight: 700, marginBottom: '8px', fontSize: '10px' }}>TEMPORAL_INTEL</div>
                                                <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>
                                                    Session Priority: High<br />
                                                    Attendance Weight: 1.5x
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MySchedule;
