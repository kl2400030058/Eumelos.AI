import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    // MOCK DATA FOR ENTERPRISE FUNCTIONALITY
    const [students, setStudents] = useState([
        { id: '2400030001', name: 'Sarah Valance', email: 'sarah@eumelos.ai', department: 'Computer Science', status: 'ACTIVE', alerts: 0, verification: 'APPROVED', lastLogin: '2026-02-20 10:42', gpa: 3.84, attendance: 98, documents: ['ID_FRONT.JPG', 'CERT_1.PDF'], ip: '192.168.1.42', warnings: 0 },
        { id: '2400030002', name: 'Julian Marks', email: 'julian@eumelos.ai', department: 'Biotechnology', status: 'ACTIVE', alerts: 2, verification: 'PENDING', lastLogin: '2026-02-19 15:10', gpa: 3.2, attendance: 75, documents: [], ip: '10.0.0.8', warnings: 2 },
        { id: '2400030003', name: 'Elena Vance', email: 'elena@eumelos.ai', department: 'Computer Science', status: 'SUSPENDED', alerts: 5, verification: 'REJECTED', lastLogin: '2026-02-10 09:00', gpa: 2.1, attendance: 40, documents: ['FAKE_ID.JPG'], ip: '172.16.0.1', warnings: 5 },
    ]);

    const [courses, setCourses] = useState([
        { id: 1, code: 'CS101', name: 'Introduction to Computing', instructor: 'DR. GR KOTESWARA RAO', day: 'MONDAY' },
        { id: 2, code: 'MATH201', name: 'Advanced Mathematics', instructor: 'DR. SURYA KIRAN J', day: 'TUESDAY' },
        { id: 3, code: 'ENG102', name: 'English Communication', instructor: 'DR. BALA M', day: 'WEDNESDAY' },
    ]);

    const [announcements, setAnnouncements] = useState([
        { id: 1, title: 'Semester Registration Open', content: 'All students must complete their course registration by Friday.', target: 'ALL', date: '2026-02-18', status: 'SENT', readCount: 120 },
    ]);

    const [auditLogs, setAuditLogs] = useState([
        { timestamp: '2026-02-20 09:30:12', action: 'LOGIN_ATTEMPT', user: 'ADMIN_ROOT', status: 'SUCCESS', ip: '1.1.1.1', device: 'Desktop Chrome' },
        { timestamp: '2026-02-20 08:15:44', action: 'STUDENT_SUSPEND', user: 'Julian Marks', admin: 'ADMIN_VERIFIER', reason: 'High Absenteeism', ip: '1.1.1.1' },
    ]);

    const [systemSettings, setSystemSettings] = useState({
        platformName: 'Eumelos.AI Portal',
        buildVersion: '2.0.0',
        maintenanceMode: false,
        passwordPolicy: 'STANDARD',
        twoFactorMandatory: false,
        smtpConfig: { host: 'mail.eumelos.ai', port: 587 }
    });

    const [adminRoles] = useState([
        { name: 'Portal Admin', permissions: ['ALL'] },
        { name: 'Department Head', permissions: ['EDIT_STUDENTS', 'VIEW_LOGS'] },
        { name: 'Verifier', permissions: ['VERIFY_DOCS'] },
    ]);

    // ACTIONS
    const updateStudentStatus = (id, status) => {
        setStudents(prev => prev.map(s => s.id === id ? { ...s, status } : s));
        logAction('STUDENT_STATUS_CHANGE', `${id} set to ${status}`);
    };

    const verifyStudent = (id, result, reason = '') => {
        setStudents(prev => prev.map(s => s.id === id ? { ...s, verification: result } : s));
        logAction('VERIFICATION_RESULT', `${id} marked as ${result}. Reason: ${reason}`);
    };

    const logAction = (action, details) => {
        const newLog = {
            timestamp: new Date().toISOString().replace('T', ' ').split('.')[0],
            action,
            details,
            admin: 'CURRENT_ADMIN_NODE',
            ip: '127.0.0.1'
        };
        setAuditLogs(prev => [newLog, ...prev]);
    };

    const createAnnouncement = (data) => {
        setAnnouncements(prev => [{ ...data, id: Date.now(), status: 'SENT', readCount: 0 }, ...prev]);
        logAction('COMMUNICATION_BROADCAST', data.title);
    };

    const deployCourse = (data) => {
        setCourses(prev => [...prev, { ...data, id: Date.now() }]);
        logAction('COURSE_DEPLOYMENT', data.code);
    };

    const terminateCourse = (id) => {
        const course = courses.find(c => c.id === id);
        setCourses(prev => prev.filter(c => c.id !== id));
        if (course) logAction('COURSE_TERMINATION', course.code);
    };

    const exportData = (type) => {
        console.log(`Exporting ${type} as CSV...`);
        // Logic for generation would go here
    };

    const value = {
        students,
        courses,
        announcements,
        auditLogs,
        systemSettings,
        adminRoles,
        updateStudentStatus,
        verifyStudent,
        logAction,
        createAnnouncement,
        deployCourse,
        terminateCourse,
        exportData,
        setSystemSettings
    };

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (!context) throw new Error('useAdmin must be used within AdminProvider');
    return context;
};
