import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useAuth } from '../../context/AuthContext';

const studentLinks = [
    { path: '/student/dashboard', label: 'Dashboard' },
    { path: '/student/courses', label: 'My Courses' },
    { path: '/student/schedule', label: 'My Schedule' },
    { path: '/student/mentors', label: 'Mentors' },
    { path: '/student/assignments', label: 'Assignments' },
    { path: '/student/attendance', label: 'Attendance' },
];

const Sparkline = () => (
    <div className="sparkline-container">
        {[40, 60, 45, 80, 70, 90].map((h, i) => (
            <div key={i} className="spark-bar" style={{ height: `${h}%` }} />
        ))}
    </div>
);

const IntelPopover = ({ content }) => (
    <div className="intel-popover">
        <div style={{ color: 'var(--accent-blue)', fontWeight: 700, marginBottom: '8px', fontSize: '10px' }}>HELPFUL TIP</div>
        {content}
    </div>
);

const StudentDashboard = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [density, setDensity] = useState(localStorage.getItem('eumelos_density') || 'standard');
    const [focus, setFocus] = useState(localStorage.getItem('eumelos_focus') || 'standard');

    useEffect(() => {
        document.documentElement.setAttribute('data-density', density);
        localStorage.setItem('eumelos_density', density);
    }, [density]);

    useEffect(() => {
        document.documentElement.setAttribute('data-focus', focus);
        localStorage.setItem('eumelos_focus', focus);
    }, [focus]);

    const toggleDensity = () => setDensity(prev => prev === 'standard' ? 'dense' : 'standard');
    const toggleFocus = () => setFocus(prev => prev === 'standard' ? 'discipline' : 'standard');

    return (
        <div style={{ display: 'flex', minHeight: '100vh', position: 'relative' }}>
            <Sidebar links={studentLinks} />

            <div style={{ flex: 1, padding: '60px 60px 60px calc(var(--sidebar-width) + 30px)', overflowY: 'auto' }}>
                <div className="container" style={{ margin: '0', maxWidth: '1400px' }}>

                    {/* Header with Mode Toggles */}
                    <header className="animate-fade-in" style={{ marginBottom: '80px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <div>
                            <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
                                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-blue)' }}></div>
                                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }}></div>
                                <div style={{ width: '24px', height: '6px', borderRadius: '3px', background: 'var(--accent-red)' }}></div>
                            </div>
                            <h1 style={{ marginBottom: '16px', fontSize: '56px' }}>Student Dashboard</h1>
                            <p style={{ color: 'var(--text-muted)', fontSize: '18px', maxWidth: '800px' }}>Welcome back, {user?.name || 'Student'}. Here is an overview of your academic performance and upcoming schedule.</p>
                        </div>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button onClick={toggleDensity} style={{ background: 'none', border: '1px solid var(--border-main)', color: 'var(--text-muted)', padding: '8px 16px', borderRadius: '4px', fontSize: '11px', cursor: 'pointer' }}>
                                LAYOUT: {density.toUpperCase()}
                            </button>
                            <button onClick={toggleFocus} style={{
                                background: focus === 'discipline' ? 'var(--accent-blue)' : 'none',
                                border: '1px solid var(--accent-blue)',
                                color: focus === 'discipline' ? '#FFF' : 'var(--accent-blue)',
                                padding: '8px 16px',
                                borderRadius: '4px',
                                fontSize: '11px',
                                cursor: 'pointer',
                                boxShadow: focus === 'discipline' ? '0 0 15px var(--accent-blue-dim)' : 'none'
                            }}>
                                {focus === 'discipline' ? 'EXIT FOCUS MODE' : 'FOCUS MODE'}
                            </button>
                        </div>
                    </header>

                    <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '32px' }}>

                        <div style={{ display: 'grid', gap: '32px' }}>
                            {/* Stats Grid Enriched */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                                <div className="card active">
                                    <span style={{ fontSize: '10px', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '12px' }}>MY CURRENT GPA</span>
                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                                        <div style={{ fontSize: '36px', fontWeight: '700' }}>3.84</div>
                                        <div style={{ fontSize: '12px', color: '#10B981' }}>Ranked: 4th</div>
                                    </div>
                                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>Excellent academic standing.</div>
                                    <Sparkline />
                                    <IntelPopover content="Based on your latest internal marks." />
                                </div>

                                <div className="card">
                                    <span style={{ fontSize: '10px', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '12px' }}>OVERALL ATTENDANCE</span>
                                    <div style={{ fontSize: '36px', fontWeight: '700' }}>96.2%</div>
                                    <div style={{ marginTop: '12px', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', position: 'relative' }}>
                                        <div style={{ width: '96%', height: '100%', background: '#10B981', borderRadius: '2px' }} />
                                        <div style={{ position: 'absolute', left: '85%', top: '-2px', width: '1px', height: '8px', background: 'var(--accent-red)' }} title="Minimum Required" />
                                    </div>
                                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '12px' }}>Classes Present: 48/50</div>
                                    <IntelPopover content="Your attendance is well above the required limit." />
                                </div>

                                <div className="card">
                                    <span style={{ fontSize: '10px', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '12px' }}>COURSE PROGRESS</span>
                                    <div style={{ fontSize: '36px', fontWeight: '700' }}>78.4%</div>
                                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>EXPECTED GRADUATION: 2026</div>
                                    <div style={{ marginTop: '16px', display: 'flex', gap: '4px' }}>
                                        <div style={{ flex: 1, padding: '4px', background: 'var(--accent-blue-dim)', fontSize: '9px', textAlign: 'center', borderRadius: '2px', color: 'var(--accent-blue)' }}>WELL ON TRACK</div>
                                    </div>
                                    <IntelPopover content="You need 36 more credits to finish your course." />
                                </div>
                            </div>

                            {/* Academic Summary */}
                            <section className="card liquid-glass" style={{ padding: '32px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                                    <div>
                                        <h3 style={{ fontSize: '18px', marginBottom: '4px' }}>My Academic Status</h3>
                                        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>A quick look at your semester performance.</p>
                                    </div>
                                    <div style={{ padding: '8px 16px', background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', borderRadius: '4px', fontSize: '12px', fontWeight: 700 }}>
                                        STATUS: ACTIVE
                                    </div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                                    <div>
                                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px' }}>GRADE PROGRESS</div>
                                        <div style={{ fontWeight: 600 }}>IMPROVING (↑)</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px' }}>ATTENDANCE</div>
                                        <div style={{ fontWeight: 600 }}>GREAT</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px' }}>CREDIT LOAD</div>
                                        <div style={{ fontWeight: 600 }}>STABLE</div>
                                    </div>
                                </div>
                            </section>

                            {/* Personal Trajectory Map */}
                            <section className="card">
                                <span style={{ fontSize: '10px', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '24px' }}>SEMESTER-WISE PERFORMANCE</span>
                                <div style={{ height: '100px', display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
                                    {[20, 30, 45, 40, 60, 55, 80, 75, 95].map((h, i) => (
                                        <div key={i} style={{ flex: 1, background: i === 8 ? 'var(--accent-blue)' : 'var(--border-main)', height: `${h}%`, borderRadius: '2px 2px 0 0' }} />
                                    ))}
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', fontSize: '10px', color: 'var(--text-muted)' }}>
                                    <span>SEM 1</span>
                                    <span>SEM 2</span>
                                    <span>SEM 3</span>
                                    <span>CURRENT</span>
                                </div>
                            </section>
                        </div>

                        {/* Right Sidebar Widgets */}
                        <div style={{ display: 'grid', gap: '24px' }}>
                            {/* Exam Radar */}
                            <div className="card" style={{ padding: '24px', borderLeft: '2px solid var(--accent-red)' }}>
                                <span style={{ fontSize: '10px', fontWeight: '700', color: 'var(--accent-red)', display: 'block', marginBottom: '16px' }}>EXAM REMINDER</span>
                                <div style={{ marginBottom: '20px' }}>
                                    <div style={{ fontSize: '24px', fontWeight: 700 }}>14 DAYS</div>
                                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>UNTIL SEMESTER FINALS</div>
                                </div>
                                <div style={{ fontSize: '12px', marginBottom: '8px' }}>SYLLABUS COVERED: <b style={{ color: 'var(--accent-blue)' }}>72%</b></div>
                                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Keep up the good work!</div>
                            </div>

                            {/* Activity Log */}
                            <div className="card liquid-glass" style={{ padding: '24px', position: 'sticky', top: '24px' }}>
                                <span style={{ fontSize: '10px', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '20px' }}>RECENT UPDATES</span>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontFamily: 'monospace', fontSize: '10px' }}>
                                    <div style={{ borderLeft: '1px solid var(--border-main)', paddingLeft: '12px' }}>
                                        <div style={{ color: 'var(--text-muted)' }}>12:42 PM</div>
                                        <div>Materials Uploaded: CS101</div>
                                    </div>
                                    <div style={{ borderLeft: '1px solid var(--border-main)', paddingLeft: '12px' }}>
                                        <div style={{ color: 'var(--text-muted)' }}>09:15 AM</div>
                                        <div>Assignment Submitted: MATH201</div>
                                    </div>
                                    <div style={{ borderLeft: '1px solid var(--border-main)', paddingLeft: '12px' }}>
                                        <div style={{ color: 'var(--text-muted)' }}>YESTERDAY</div>
                                        <div>New Group Meeting Assigned</div>
                                    </div>
                                    <div style={{ borderLeft: '1px solid var(--border-main)', paddingLeft: '12px' }}>
                                        <div style={{ color: 'var(--text-muted)' }}>YESTERDAY</div>
                                        <div>Attendance Record Updated</div>
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

export default StudentDashboard;
