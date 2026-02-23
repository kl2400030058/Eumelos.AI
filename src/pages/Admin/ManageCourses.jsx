import React, { useState } from 'react';
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

const ManageCourses = () => {
    const { courses, deployCourse, terminateCourse } = useAdmin();
    const [newCourse, setNewCourse] = useState({
        code: '', name: '', instructor: '', day: '', start: '', end: ''
    });

    const handleInputChange = (e) => {
        setNewCourse({ ...newCourse, [e.target.name]: e.target.value.toUpperCase() });
    };

    const handleAddCourse = (e) => {
        e.preventDefault();
        deployCourse(newCourse);
        setNewCourse({ code: '', name: '', instructor: '', day: '', start: '', end: '' });
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', position: 'relative' }}>
            <Sidebar links={adminLinks} />
            <div style={{ flex: 1, padding: '40px 40px 40px 104px', overflowY: 'auto' }}>
                <div className="container" style={{ margin: '0', maxWidth: '1000px' }}>
                    <div className="animate-fade-in">
                        <header style={{ marginBottom: '64px' }}>
                            <div style={{ display: 'flex', gap: '6px', marginBottom: '24px' }}>
                                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--accent-red)' }}></div>
                                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }}></div>
                                <div style={{ width: '16px', height: '4px', borderRadius: '2px', background: 'var(--accent-blue)' }}></div>
                            </div>
                            <h1 style={{ marginBottom: '12px' }}>Course Management</h1>
                            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Architect and deploy academic modules for the Institutional Intelligence Layer.</p>
                        </header>

                        <div style={{ display: 'grid', gap: '48px' }}>
                            <section className="card liquid-glass">
                                <h3 style={{ marginBottom: '32px', fontSize: '20px' }}>Create Module</h3>
                                <form onSubmit={handleAddCourse} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
                                    <div>
                                        <label className="form-label">Module Code</label>
                                        <input type="text" name="code" className="form-input" value={newCourse.code} onChange={handleInputChange} placeholder="E.G. CS101" required />
                                    </div>
                                    <div>
                                        <label className="form-label">Module Name</label>
                                        <input type="text" name="name" className="form-input" value={newCourse.name} onChange={handleInputChange} placeholder="E.G. QUANTUM COMPUTING" required />
                                    </div>
                                    <div>
                                        <label className="form-label">Instructor</label>
                                        <input type="text" name="instructor" className="form-input" value={newCourse.instructor} onChange={handleInputChange} placeholder="DR. NAME" required />
                                    </div>
                                    <div>
                                        <label className="form-label">Day</label>
                                        <select name="day" className="form-input" value={newCourse.day} onChange={handleInputChange} required>
                                            <option value="">SELECT DAY</option>
                                            <option value="MONDAY">MONDAY</option>
                                            <option value="TUESDAY">TUESDAY</option>
                                            <option value="WEDNESDAY">WEDNESDAY</option>
                                            <option value="THURSDAY">THURSDAY</option>
                                            <option value="FRIDAY">FRIDAY</option>
                                        </select>
                                    </div>
                                    <div style={{ gridColumn: 'span 2', marginTop: '12px' }}>
                                        <button type="submit" className="btn-primary" style={{ width: '100%' }}>Deploy Module</button>
                                    </div>
                                </form>
                            </section>

                            <section className="card liquid-glass" style={{ padding: '0', overflow: 'hidden' }}>
                                <div style={{ padding: '24px 32px', borderBottom: '1px solid #111' }}>
                                    <h3 style={{ fontSize: '18px' }}>Deployment List</h3>
                                </div>
                                <div style={{ overflowX: 'auto' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                        <thead>
                                            <tr style={{ borderBottom: '1px solid #111' }}>
                                                <th style={{ padding: '20px 32px', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)' }}>CODE</th>
                                                <th style={{ padding: '20px 32px', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)' }}>MODULE</th>
                                                <th style={{ padding: '20px 32px', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)' }}>INSTRUCTOR</th>
                                                <th style={{ padding: '20px 32px', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)' }}>DAY</th>
                                                <th style={{ padding: '20px 32px', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textAlign: 'right' }}>ACTION</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {courses.map(course => (
                                                <tr key={course.id} style={{ borderBottom: '1px solid #0a0a0a' }}>
                                                    <td style={{ padding: '20px 32px', fontSize: '13px', color: 'var(--accent-blue)', fontWeight: 600 }}>{course.code}</td>
                                                    <td style={{ padding: '20px 32px', fontSize: '15px', fontWeight: 700 }}>{course.name}</td>
                                                    <td style={{ padding: '20px 32px', fontSize: '13px', color: 'var(--text-muted)' }}>{course.instructor}</td>
                                                    <td style={{ padding: '20px 32px' }}>
                                                        <span style={{ fontSize: '11px', fontWeight: 700 }}>{course.day}</span>
                                                    </td>
                                                    <td style={{ padding: '20px 32px', textAlign: 'right' }}>
                                                        <button
                                                            onClick={() => terminateCourse(course.id)}
                                                            style={{ background: 'none', border: 'none', color: 'var(--accent-red)', cursor: 'pointer', fontSize: '11px', fontWeight: 700 }}
                                                        >
                                                            TERMINATE
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageCourses;
