import React, { useEffect, useState } from 'react';
import './LoadingScreen.css';
import Starfield from '../Effects/Starfield';
import FluidBackground from '../Effects/FluidBackground';
import Logo from '../Logo/Logo';

const directives = [
    "Manage your time effectively between classes and study sessions.",
    "Always check your course syllabus for important deadlines.",
    "Participation in class discussions improves your understanding.",
    "Form study groups to collaborate with your peers.",
    "Library resources are available 24/7 for your research.",
    "Regular attendance is the key to academic success.",
    "Keep track of your grades and feedback throughout the semester.",
    "Don't hesitate to visit your mentor during office hours.",
    "Stay organized with a digital or physical planner.",
    "Balance your academics with co-curricular activities."
];

const bootSequences = [
    "Starting Student Portal...",
    "Loading Your Courses...",
    "Syncing Your Schedule...",
    "Preparing Your Dashboard...",
    "Connecting to University Servers...",
    "Updating Attendance Records...",
    "Checking New Announcements...",
    "Finalizing Interface..."
];

const LoadingScreen = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [statusText, setStatusText] = useState(bootSequences[0]);

    useEffect(() => {
        const totalDuration = 6000;
        const intervalTime = 50;
        const totalSteps = totalDuration / intervalTime;
        const stepIncrement = 100 / totalSteps;

        const timer = setInterval(() => {
            setProgress((prev) => {
                const next = prev + stepIncrement;

                const sequenceIndex = Math.min(
                    Math.floor((next / 100) * bootSequences.length),
                    bootSequences.length - 1
                );
                setStatusText(bootSequences[sequenceIndex]);

                if (next >= 100) {
                    clearInterval(timer);
                    setTimeout(onComplete, 300);
                    return 100;
                }
                return next;
            });
        }, intervalTime);

        return () => clearInterval(timer);
    }, [onComplete]);

    const dailyTip = directives[new Date().getDate() % directives.length];

    return (
        <div className="loading-overlay" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)' }}>
            <div className="loading-container liquid-glass" style={{
                position: 'relative',
                zIndex: 10,
                textAlign: 'center',
                padding: '60px',
                maxWidth: '500px',
                border: '1px solid rgba(255,255,255,0.1)',
                margin: '20px'
            }}>
                <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'center' }}>
                    <Logo size={64} />
                </div>

                <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '8px', color: 'var(--text-primary)' }}>EUMELOS.AI</h2>
                <div style={{ fontSize: '11px', color: 'var(--accent-main)', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '40px' }}>
                    MANAGEMENT PORTAL v2.0
                </div>

                <div style={{ fontSize: '14px', color: 'var(--text-primary)', marginBottom: '24px', minHeight: '1.4em' }}>
                    {statusText}
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.05)', height: '2px', width: '100%', marginBottom: '16px', position: 'relative', overflow: 'hidden' }}>
                    <div
                        style={{ width: `${progress}%`, background: 'var(--accent-main)', height: '100%', transition: 'width 0.1s linear' }}
                    />
                </div>

                <div style={{ color: 'var(--text-muted)', fontSize: '11px', fontWeight: 700, marginBottom: '60px' }}>
                    {Math.round(progress)}% LOADED
                </div>

                <div style={{
                    fontSize: '13px',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.6',
                    padding: '20px',
                    background: 'rgba(255,255,255,0.02)',
                    borderRadius: '12px',
                    textAlign: 'left',
                    borderLeft: '2px solid var(--accent-main)',
                    marginBottom: '40px'
                }}>
                    <span style={{ color: 'var(--accent-main)', display: 'block', fontSize: '10px', fontWeight: 800, marginBottom: '8px', textTransform: 'uppercase' }}>Student Tip of the Day</span>
                    "{dailyTip}"
                </div>

                <div className="team-credits" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '24px' }}>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 800, letterSpacing: '0.1em', marginBottom: '16px', textTransform: 'uppercase' }}>Development Team</div>
                    <div style={{ display: 'grid', gap: '12px', textAlign: 'left' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '12px', color: 'var(--text-primary)', fontWeight: 600 }}>Gangadhar <span style={{ color: 'var(--text-muted)', fontSize: '10px', fontWeight: 400 }}>(2400030058)</span></span>
                            <span style={{ fontSize: '10px', color: 'var(--accent-main)', fontWeight: 700, textTransform: 'uppercase' }}>UI/UX</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '12px', color: 'var(--text-primary)', fontWeight: 600 }}>Pranav <span style={{ color: 'var(--text-muted)', fontSize: '10px', fontWeight: 400 }}>(2400030353)</span></span>
                            <span style={{ fontSize: '10px', color: 'var(--accent-main)', fontWeight: 700, textTransform: 'uppercase' }}>Architecture</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '12px', color: 'var(--text-primary)', fontWeight: 600 }}>Rushi <span style={{ color: 'var(--text-muted)', fontSize: '10px', fontWeight: 400 }}>(2400030748)</span></span>
                            <span style={{ fontSize: '10px', color: 'var(--accent-main)', fontWeight: 700, textTransform: 'uppercase' }}>Testing</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoadingScreen;
