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

const VerificationSystem = () => {
    const { students, verifyStudent } = useAdmin();
    const [selectedId, setSelectedId] = useState(null);
    const [rejectionReason, setRejectionReason] = useState('');

    const pendingStudents = students.filter(s => s.verification === 'PENDING' || s.verification === 'REJECTED');
    const activeStudent = students.find(s => s.id === selectedId);

    const handleAction = (status) => {
        if (status === 'REJECTED' && !rejectionReason) {
            alert('MANDATORY_REJECTION_REASON_REQUIRED');
            return;
        }
        verifyStudent(selectedId, status, rejectionReason);
        setSelectedId(null);
        setRejectionReason('');
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', position: 'relative' }}>
            <Sidebar links={adminLinks} />
            <div style={{ flex: 1, padding: '40px 40px 40px 104px', overflowY: 'auto' }}>
                <div className="container" style={{ margin: '0', maxWidth: '1200px' }}>
                    <header style={{ marginBottom: '48px' }}>
                        <h1 style={{ marginBottom: '12px' }}>Document Verification</h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Validate identity credentials and secure the Institutional Grid.</p>
                    </header>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                        {/* Queue */}
                        <section className="card liquid-glass">
                            <h3 style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '32px', letterSpacing: '0.1em' }}>PENDING_TRANSMISSIONS</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {pendingStudents.map(student => (
                                    <div key={student.id} className="liquid-glass" style={{ padding: '24px', cursor: 'pointer', border: selectedId === student.id ? '1px solid var(--accent-blue)' : '1px solid rgba(255,255,255,0.05)' }} onClick={() => setSelectedId(student.id)}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                            <span style={{ fontWeight: 700 }}>{student.name}</span>
                                            <span style={{ fontSize: '10px', color: student.verification === 'PENDING' ? '#F59E0B' : 'var(--accent-red)' }}>{student.verification}</span>
                                        </div>
                                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>ID: {student.id} // SEC: {student.department}</div>
                                    </div>
                                ))}
                                {pendingStudents.length === 0 && <p style={{ color: 'var(--text-muted)' }}>All nodes verified.</p>}
                            </div>
                        </section>

                        {/* Inspection Area */}
                        <section className="card liquid-glass" style={{ display: 'flex', flexDirection: 'column' }}>
                            <h3 style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '32px', letterSpacing: '0.1em' }}>IDENTITY_INSPECTION</h3>
                            {activeStudent ? (
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ position: 'relative', width: '100%', aspectRatio: '1.58/1', background: '#080808', borderRadius: '12px', border: '1px solid #222', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px', overflow: 'hidden' }}>
                                        <div style={{ textAlign: 'center' }}>
                                            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>[ID_DOCUMENT_DECRYPTED]</div>
                                            <div style={{ fontSize: '18px', fontWeight: 700 }}>{activeStudent.name.toUpperCase()}</div>
                                            <div style={{ fontSize: '11px' }}>{activeStudent.id}</div>
                                        </div>
                                        {/* Mock zoom feature */}
                                        <div style={{ position: 'absolute', bottom: '12px', right: '12px', fontSize: '10px', color: 'var(--accent-blue)', fontWeight: 700 }}>ZOOM_ENABLED (1.5x)</div>
                                    </div>

                                    <div style={{ marginBottom: '32px' }}>
                                        <label className="form-label">Review Protocol</label>
                                        <textarea
                                            className="form-input"
                                            placeholder="Specify rejection reason if applicable..."
                                            style={{ width: '100%', height: '80px', resize: 'none' }}
                                            value={rejectionReason}
                                            onChange={(e) => setRejectionReason(e.target.value)}
                                        />
                                    </div>

                                    <div style={{ marginTop: 'auto', display: 'flex', gap: '16px' }}>
                                        <button className="btn-primary" style={{ flex: 1, background: '#10B981' }} onClick={() => handleAction('APPROVED')}>APPROVE</button>
                                        <button className="btn-secondary" style={{ flex: 1, color: 'var(--accent-red)', borderColor: 'var(--accent-red)' }} onClick={() => handleAction('REJECTED')}>REJECT</button>
                                    </div>
                                </div>
                            ) : (
                                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                                    Select a node for identity validation.
                                </div>
                            )}
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerificationSystem;
