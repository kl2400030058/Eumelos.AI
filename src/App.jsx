import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Navbar from './components/Navbar/Navbar';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import Starfield from './components/Effects/Starfield';
import FluidBackground from './components/Effects/FluidBackground';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import { useTheme } from './context/ThemeContext';



// Pages
import LandingPage from './pages/LandingPage';
import TermsAndConditions from './pages/TermsAndConditions';
import RoleSelection from './pages/RoleSelection';
import StudentLoginPage from './pages/Login/StudentLoginPage';
import StudentRegisterPage from './pages/Login/StudentRegisterPage';
import AdminLoginPage from './pages/Login/AdminLoginPage';
import ThemeSelector from './components/ThemeSelector/ThemeSelector';

// Student Pages
import StudentDashboard from './pages/Student/StudentDashboard';
import CourseList from './pages/Student/CourseList';
import MySchedule from './pages/Student/MySchedule';
import Mentors from './pages/Student/Mentors';
import Assignments from './pages/Student/Assignments';
import Attendance from './pages/Student/Attendance';

// Admin Pages
import AdminDashboard from './pages/Admin/AdminDashboard';
import ManageCourses from './pages/Admin/ManageCourses';
import StudentManagement from './pages/Admin/StudentManagement';
import VerificationSystem from './pages/Admin/VerificationSystem';
import SecurityMonitoring from './pages/Admin/SecurityMonitoring';
import SystemSettings from './pages/Admin/SystemSettings';
import Profile from './pages/Profile';

import { AdminProvider } from './context/AdminContext';

const MetricsFooter = () => {
  const { user } = useAuth();
  if (!user || user.role !== 'student') return null;

  return (
    <div className="metrics-footer">
      <div className="metrics-footer-content">
        <div className="metric-item">TOTAL CREDITS: <b>124</b></div>
        <div className="metric-item">REMAINING: <b>36</b></div>
        <div className="metric-item">GRADUATION: <b>78%</b></div>
        <div className="metric-item">STANDING: <b style={{ color: '#10B981' }}>EXEMPLARY</b></div>
      </div>
    </div>
  );
};

const AppContent = ({ isThemeSelected, onThemeSelect }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.altKey || e.metaKey) return;
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;

      const key = e.key.toLowerCase();
      if (user?.role === 'student') {
        if (key === 'g') navigate('/student/dashboard');
        if (key === 'c') navigate('/student/courses');
        if (key === 's') navigate('/student/schedule');
        if (key === 'a') navigate('/student/assignments');
        if (key === 'p') navigate('/profile');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [user, navigate]);

  // Intercept flow: If user tries to go to portal routes but theme is not select, show ThemeSelector
  if (!isThemeSelected && location.pathname !== '/') {
    return <ThemeSelector onSelect={onThemeSelect} />;
  }

  const isDashboard = location.pathname.includes('/student/') || location.pathname.includes('/admin/');

  return (
    <div className="app-container" style={{
      paddingBottom: (user && user.role === 'student') ? '32px' : '0',
      background: isDashboard ? 'var(--bg-primary)' : 'transparent', // Masking background for dashboard
      minHeight: '100vh',
      position: 'relative',
      zIndex: 1
    }}>
      <Navbar branding="EUMELOS.AI" />
      <main className="main-content" style={{
        background: isDashboard ? 'var(--bg-primary)' : 'transparent',
        minHeight: 'calc(100vh - 80px)',
        position: 'relative'
      }}>
        <div key={location.pathname}>
          <Routes location={location}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/roles" element={<RoleSelection />} />
            <Route path="/login/student" element={<StudentLoginPage />} />
            <Route path="/register/student" element={<StudentRegisterPage />} />
            <Route path="/login/admin" element={<AdminLoginPage />} />

            <Route path="/profile" element={
              <ProtectedRoute allowedRoles={['student', 'admin']}>
                <Profile />
              </ProtectedRoute>
            } />

            <Route path="/student/dashboard" element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentDashboard />
              </ProtectedRoute>
            } />
            <Route path="/student/courses" element={
              <ProtectedRoute allowedRoles={['student']}>
                <CourseList />
              </ProtectedRoute>
            } />
            <Route path="/student/schedule" element={
              <ProtectedRoute allowedRoles={['student']}>
                <MySchedule />
              </ProtectedRoute>
            } />
            <Route path="/student/mentors" element={
              <ProtectedRoute allowedRoles={['student']}>
                <Mentors />
              </ProtectedRoute>
            } />
            <Route path="/student/assignments" element={
              <ProtectedRoute allowedRoles={['student']}>
                <Assignments />
              </ProtectedRoute>
            } />
            <Route path="/student/attendance" element={
              <ProtectedRoute allowedRoles={['student']}>
                <Attendance />
              </ProtectedRoute>
            } />

            <Route path="/admin/dashboard" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/courses" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <ManageCourses />
              </ProtectedRoute>
            } />
            <Route path="/admin/students" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <StudentManagement />
              </ProtectedRoute>
            } />
            <Route path="/admin/verification" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <VerificationSystem />
              </ProtectedRoute>
            } />
            <Route path="/admin/security" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <SecurityMonitoring />
              </ProtectedRoute>
            } />
            <Route path="/admin/settings" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <SystemSettings />
              </ProtectedRoute>
            } />

            <Route path="*" element={<Navigate to="/roles" replace />} />
          </Routes>
        </div>
      </main>
      <MetricsFooter />
    </div>
  );
};

function App() {
  const [isTermsAccepted, setIsTermsAccepted] = useState(false); // Reset to false to show EVERY time as requested
  const [isThemeSelected, setIsThemeSelected] = useState(
    localStorage.getItem('eumelos_theme_initialized') === 'true'
  );
  const [isAppLoading, setIsAppLoading] = useState(true);
  const { setTheme, setVariant } = useTheme();

  const handleTermsAccept = React.useCallback(() => {
    setIsTermsAccepted(true);
  }, []);

  const handleThemeSelection = React.useCallback((theme, variant) => {
    setTheme(theme);
    setVariant(variant);
    localStorage.setItem('eumelos_theme_initialized', 'true');
    setIsThemeSelected(true);
  }, [setTheme, setVariant]);

  const handleLoadingComplete = React.useCallback(() => {
    setIsAppLoading(false);
  }, []);

  return (
    <Router>
      <AuthProvider>
        <AdminProvider>
          <div className="app-main-wrapper" style={{
            minHeight: '100vh',
            position: 'relative',
            backgroundColor: '#000',
            color: 'var(--text-primary)',
            transition: 'background-color 0.4s ease, color 0.4s ease'
          }}>
            {/* Space background visible for Rules, Loading, and AppContent handles masking for dashboard */}
            <Starfield />
            <FluidBackground />

            {(() => {
              // 1. Stage: User Agreement (Rules & Regulations)
              if (!isTermsAccepted) {
                return (
                  <div style={{ position: 'relative', zIndex: 10 }}>
                    <TermsAndConditions onAccept={handleTermsAccept} />
                  </div>
                );
              }

              // 2. Stage: Application Loading (Boot Sequence)
              if (isAppLoading) {
                return <LoadingScreen onComplete={handleLoadingComplete} />;
              }

              // 3. Stage: Main Application Flow
              return (
                <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
                  <ThemeToggle />
                  <AppContent
                    isThemeSelected={isThemeSelected}
                    onThemeSelect={handleThemeSelection}
                  />
                </div>
              );
            })()}
          </div>
        </AdminProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
