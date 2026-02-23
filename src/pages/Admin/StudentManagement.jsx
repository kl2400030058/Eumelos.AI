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

const StudentManagement = () => {
    const { students, updateStudentStatus, exportData } = useAdmin();
    const [search, setSearch] = useState('');
    const [filterDept, setFilterDept] = useState('ALL');
    const [selectedStudent, setSelectedStudent] = useState(null);

    const filteredStudents = students.filter(s =>
        (s.name.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase())) &&
        (filterDept === 'ALL' || s.department === filterDept)
    );

    return (
        <div style={{ display: 'flex', minHeight: '100vh', position: 'relative' }}>
            <Sidebar links={adminLinks} />
            <div style={{ flex: 1, padding: '40px 40px 40px 104px', overflowY: 'auto' }}>
                <div className="container" style={{ margin: '0', maxWidth: '1200px' }}>
                    <header style={{ marginBottom: '48px' }}>
                        <h1 style={{ marginBottom: '12px' }}>Student Management</h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Deep audit and behavioral tracking for all institutional nodes.</p>
                    </header>

                    <div style={{ display: 'grid', gridTemplateColumns: selectedStudent ? '1fr 400px' : '1fr', gap: '32px' }}>
                        <div style={{ display: 'grid', gap: '32px' }}>
                            {/* Toolbar */}
                            <div className="card liquid-glass" style={{ display: 'flex', gap: '20px', alignItems: 'center', padding: '16px 24px' }}>
                                <input
                                    type="text"
                                    placeholder="Search by ID or Name..."
                                    className="form-input"
                                    style={{ flex: 1 }}
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <select
                                    className="form-input"
                                    style={{ width: '200px' }}
                                    value={filterDept}
                                    onChange={(e) => setFilterDept(e.target.value)}
                                >
                                    <option value="ALL">ALL DEPARTMENTS</option>
                                    <option value="NEURAL SYSTEMS">NEURAL SYSTEMS</option>
                                    <option value="QUANTUM BIO">QUANTUM BIO</option>
                                </select>
                                <button className="btn-secondary" onClick={() => exportData('STUDENTS')}>EXPORT_CSV</button>
                            </div>

                            {/* Student Table */}
                            <section className="card liquid-glass" style={{ padding: '0', overflow: 'hidden' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '1px solid #111' }}>
                                            <th style={{ padding: '20px 32px', fontSize: '10px', color: 'var(--text-muted)' }}>MEMBER_ID</th>
                                            <th style={{ padding: '20px 32px', fontSize: '10px', color: 'var(--text-muted)' }}>DESIGNATION</th>
                                            <th style={{ padding: '20px 32px', fontSize: '10px', color: 'var(--text-muted)' }}>RISK_SCORE</th>
                                            <th style={{ padding: '20px 32px', fontSize: '10px', color: 'var(--text-muted)' }}>STATUS</th>
                                            <th style={{ padding: '20px 32px', fontSize: '10px', color: 'var(--text-muted)', textAlign: 'right' }}>ACTION</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredStudents.map(student => (
                                            <tr key={student.id} style={{ borderBottom: '1px solid #080808', cursor: 'pointer' }} onClick={() => setSelectedStudent(student)}>
                                                <td style={{ padding: '20px 32px', fontSize: '13px', fontFamily: 'monospace' }}>{student.id}</td>
                                                <td style={{ padding: '20px 32px' }}>
                                                    <div style={{ fontWeight: 700 }}>{student.name}</div>
                                                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{student.email}</div>
                                                </td>
                                                <td style={{ padding: '20px 32px' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        <div style={{ width: '40px', height: '4px', background: '#111', borderRadius: '2px' }}>
                                                            <div style={{ width: `${student.riskScore}%`, height: '100%', background: student.riskScore > 70 ? 'var(--accent-red)' : student.riskScore > 30 ? '#F59E0B' : '#10B981', boxShadow: '0 0 10px currentColor' }}></div>
                                                        </div>
                                                        <span style={{ fontSize: '11px', fontWeight: 600 }}>{student.riskScore}</span>
                                                    </div>
                                                </td>
                                                <td style={{ padding: '20px 32px' }}>
                                                    <span style={{ fontSize: '10px', fontWeight: 700, color: student.status === 'ACTIVE' ? '#10B981' : 'var(--accent-red)' }}>[{student.status}]</span>
                                                </td>
                                                <td style={{ padding: '20px 32px', textAlign: 'right' }}>
                                                    <button className="btn-secondary" style={{ fontSize: '10px', padding: '6px 12px' }}>INSPECT</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </section>
                        </div>

                        {/* Deep Detail Panel */}
                        {selectedStudent && (
                            <div className="card liquid-glass" style={{ padding: '32px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                                    <h2 style={{ fontSize: '20px' }}>Node Profile</h2>
                                    <button onClick={() => setSelectedStudent(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>CLOSE</button>
                                </div>
                                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#111', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                                        {selectedStudent.name[0]}
                                    </div>
                                    <div style={{ fontWeight: 700, fontSize: '18px' }}>{selectedStudent.name}</div>
                                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>STANDING: <span style={{ color: '#10B981' }}>EXEMPLARY</span></div>
                                </div>

                                <div style={{ display: 'grid', gap: '24px' }}>
                                    <DetailRow label="ACADEMIC_GPA" value={selectedStudent.gpa} />
                                    <DetailRow label="PRESENCE_INTEGRITY" value={`${selectedStudent.attendance}%`} />
                                    <DetailRow label="IP_UPLINK" value={selectedStudent.ip} />
                                    <DetailRow label="LAST_SYNC" value={selectedStudent.lastLogin} />
                                    <DetailRow label="WARNINGS" value={selectedStudent.warnings} />
                                </div>

                                <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    <button
                                        className="btn-primary"
                                        style={{ width: '100%', background: selectedStudent.status === 'ACTIVE' ? 'var(--accent-red)' : '#10B981' }}
                                        onClick={() => updateStudentStatus(selectedStudent.id, selectedStudent.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE')}
                                    >
                                        {selectedStudent.status === 'ACTIVE' ? 'SUSPEND_UPLINK' : 'ACTIVATE_UPLINK'}
                                    </button>
                                    <button className="btn-secondary" style={{ width: '100%' }}>SEND_DIRECTIVE</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const DetailRow = ({ label, value }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #111', paddingBottom: '12px' }}>
        <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 600 }}>{label}</span>
        <span style={{ fontSize: '13px', fontWeight: 600 }}>{value}</span>
    </div>
);

export default StudentManagement;
