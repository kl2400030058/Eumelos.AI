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

const MENTORS = [
    { id: 1, name: 'DR. ARIS', specialty: 'AI ETHICS & NEURAL SYSTEMS', status: 'Online', rating: '4.9' },
    { id: 2, name: 'PROF. JOHNSON', specialty: 'QUANTUM COMPUTING', status: 'In Session', rating: '4.8' },
    { id: 3, name: 'DR. SMITH', specialty: 'ADVANCED ALGORITHMS', status: 'Offline', rating: '4.7' },
];

const Mentors = () => {
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
                            <h1 style={{ marginBottom: '12px' }}>Faculty Mentors</h1>
                            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Connect with institutional domain experts and neural mentors for academic uplink.</p>
                        </header>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                            {MENTORS.map(mentor => (
                                <div key={mentor.id} className="card" style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
                                    <div style={{ marginBottom: '24px' }}>
                                        <span style={{
                                            fontSize: '10px',
                                            fontWeight: 700,
                                            padding: '4px 10px',
                                            background: mentor.status === 'Online' ? '#111' : 'transparent',
                                            border: '1px solid #222',
                                            color: mentor.status === 'Online' ? 'var(--text-primary)' : 'var(--text-muted)',
                                            borderRadius: '4px'
                                        }}>
                                            {mentor.status.toUpperCase()}
                                        </span>
                                    </div>
                                    <h3 style={{ marginBottom: '8px', fontSize: '22px' }}>{mentor.name}</h3>
                                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '32px', minHeight: '40px' }}>{mentor.specialty}</p>

                                    <div className="intel-popover">
                                        <div style={{ color: 'var(--accent-blue)', fontWeight: 700, marginBottom: '8px', fontSize: '10px' }}>MENTOR_INTELLIGENCE</div>
                                        <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>
                                            Responsiveness: {mentor.rating} / 5.0<br />
                                            Active Consultations: 12<br />
                                            Syllabus Depth: High
                                        </div>
                                    </div>

                                    <button className="btn-secondary" style={{ width: '100%', fontSize: '13px', border: '1px solid #222', color: 'var(--text-primary)' }}>
                                        Establish Uplink
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Mentors;
