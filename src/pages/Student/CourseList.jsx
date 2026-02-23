import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import './CourseList.css';

const studentLinks = [
    { path: '/student/dashboard', label: 'Dashboard' },
    { path: '/student/courses', label: 'My Courses' },
    { path: '/student/schedule', label: 'My Schedule' },
    { path: '/student/mentors', label: 'Mentors' },
    { path: '/student/assignments', label: 'Assignments' },
    { path: '/student/attendance', label: 'Attendance' },
];

const NEW_COURSES = [
    {
        id: 1,
        code: 'CS101',
        name: 'Quantum Computing',
        instructor: 'Dr. Vjay Varma',
        day: 'Mon',
        time: '09:00 - 10:00',
        status: 'on-track'
    },
    {
        id: 2,
        code: 'MATH201',
        name: 'Calculus II',
        instructor: 'Dr. Bhargava',
        day: 'Tue',
        time: '10:30 - 11:30',
        status: 'at-risk'
    },
    {
        id: 3,
        code: 'ENG102',
        name: 'English Communication',
        instructor: 'Dr. Bala M',
        day: 'Wed',
        time: '13:00 - 14:00',
        status: 'on-track'
    },
    {
        id: 4,
        code: 'PHYS101',
        name: 'Theoretical Physics',
        instructor: 'Dr. Shasthry Baba',
        day: 'Thu',
        time: '14:30 - 15:30',
        status: 'on-track'
    },
];

const CourseList = () => {
    const handleRegister = (courseName) => {
        alert(`${courseName} enrollment request received.`);
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', position: 'relative' }}>
            <Sidebar links={studentLinks} />
            <div style={{ flex: 1, padding: '40px 40px 40px 104px', overflowY: 'auto' }}>
                <div className="container" style={{ margin: '0', maxWidth: '1000px' }}>
                    <div className="animate-fade-in">
                        <header style={{ marginBottom: '48px' }}>
                            <div style={{ display: 'flex', gap: '6px', marginBottom: '20px' }}>
                                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--accent-red)' }}></div>
                                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }}></div>
                                <div style={{ width: '16px', height: '4px', borderRadius: '2px', background: 'var(--accent-blue)' }}></div>
                            </div>
                            <h1 style={{ marginBottom: '12px' }}>Course Catalog</h1>
                            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Explore and enroll in the latest modules for this academic semester.</p>
                        </header>

                        <div className="course-stack">
                            {NEW_COURSES.map((course) => (
                                <div key={course.id} className="course-card" style={{ position: 'relative', overflow: 'hidden' }}>
                                    <div className="course-info">
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                                            <div className={`status-dot status-${course.status}`}></div>
                                            <div className="course-code-badge">{course.code}</div>
                                        </div>
                                        <h3 style={{ fontSize: '20px' }}>{course.name}</h3>
                                        <div className="course-details">
                                            Instructor: <strong>{course.instructor}</strong><br />
                                            Schedule: {course.day} • {course.time}
                                        </div>
                                    </div>
                                    <div className="intel-popover">
                                        <div style={{ color: 'var(--accent-blue)', fontWeight: 700, marginBottom: '8px', fontSize: '10px' }}>COURSE_INFO</div>
                                        <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>
                                            Performance Impact: High<br />
                                            Deadline Pressure: Medium<br />
                                            Historical Success: 84%
                                        </div>
                                    </div>
                                    <button
                                        className="btn-primary"
                                        onClick={() => handleRegister(course.name)}
                                        style={{ fontSize: '13px' }}
                                    >
                                        Enroll
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

export default CourseList;
