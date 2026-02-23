import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import './Assignments.css';

const studentLinks = [
    { path: '/student/dashboard', label: 'Dashboard' },
    { path: '/student/courses', label: 'My Courses' },
    { path: '/student/schedule', label: 'My Schedule' },
    { path: '/student/mentors', label: 'Mentors' },
    { path: '/student/assignments', label: 'Assignments' },
    { path: '/student/attendance', label: 'Attendance' },
];

const ASSIGNMENTS = [
    {
        id: 1,
        title: 'Web Development Project',
        course: 'CS101',
        deadline: '24h Left',
        status: 'Pending',
        type: 'Urgent'
    },
    {
        id: 2,
        title: 'Quantum Physics Lab',
        course: 'PHYS101',
        deadline: '3 Days',
        status: 'Pending',
        type: 'Upcoming'
    },
    {
        id: 3,
        title: 'Technical Writing Essay',
        course: 'ENG102',
        deadline: 'Submitted',
        status: 'Completed',
        type: 'Submitted'
    },
];

const Assignments = () => {
    const getStatusBadge = (type) => {
        const variants = {
            'Urgent': 'badge-urgent',
            'Upcoming': 'badge-upcoming',
            'Submitted': 'badge-submitted'
        };
        return `status-badge ${variants[type] || ''}`;
    };

    return (
        <div className="assignments-container">
            <Sidebar links={studentLinks} />
            <div className="assignments-main">
                <div className="assignments-content">
                    <div className="animate-fade-in">
                        <header className="assignments-header">
                            <div className="dot-decoration">
                                <div className="dot dot-blue"></div>
                                <div className="dot dot-dim"></div>
                                <div className="dot dot-pill"></div>
                            </div>
                            <h1>Assignments</h1>
                            <p>Manage and submit your coursework tasks through the secure portal.</p>
                        </header>

                        <div className="assignments-card">
                            <table className="assignments-table">
                                <thead>
                                    <tr>
                                        <th>Task Name</th>
                                        <th>Course</th>
                                        <th>Status</th>
                                        <th>Deadline</th>
                                        <th style={{ textAlign: 'right' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ASSIGNMENTS.map(task => (
                                        <tr key={task.id} className="assignment-row">
                                            <td style={{ fontWeight: 600 }}>{task.title}</td>
                                            <td style={{ color: 'var(--text-muted)' }}>{task.course}</td>
                                            <td>
                                                <span className={getStatusBadge(task.type)}>
                                                    {task.type.toUpperCase()}
                                                </span>
                                            </td>
                                            <td style={{
                                                fontWeight: 600,
                                                color: task.type === 'Urgent' ? 'var(--accent-red)' : 'inherit'
                                            }}>
                                                {task.deadline}
                                            </td>
                                            <td style={{ textAlign: 'right' }}>
                                                <button className={task.status === 'Completed' ? 'btn-view' : 'btn-submit'}>
                                                    {task.status === 'Completed' ? 'View' : 'Submit'}
                                                </button>
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

export default Assignments;
