import React from 'react';
import './Logo.css';

const Logo = ({ size = 40, className = "" }) => {
    return (
        <div
            className={`eumelos-logo-sphere ${className}`}
            style={{
                '--logo-size': `${size}px`,
                width: size,
                height: size
            }}
        >
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Glow layer */}
                <circle cx="50" cy="50" r="45" fill="url(#logoGlow)" fillOpacity="0.3" />

                {/* Sphere base */}
                <circle cx="50" cy="50" r="40" fill="url(#sphereGradient)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />

                {/* Highlight/Reflections */}
                <ellipse cx="50" cy="30" rx="20" ry="10" fill="url(#highlightGradient)" fillOpacity="0.6" />

                {/* The Letter E */}
                <text
                    x="50%"
                    y="52%"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    className="logo-text-e"
                >
                    E
                </text>

                <defs>
                    <radialGradient id="sphereGradient" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(50 50) rotate(90) scale(40)">
                        <stop offset="0%" stopColor="var(--accent-blue)" stopOpacity="0.1" />
                        <stop offset="100%" stopColor="#050505" />
                    </radialGradient>

                    <radialGradient id="logoGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(50 50) rotate(90) scale(45)">
                        <stop offset="0%" stopColor="var(--accent-blue)" />
                        <stop offset="100%" stopColor="transparent" />
                    </radialGradient>

                    <linearGradient id="highlightGradient" x1="50" y1="20" x2="50" y2="40" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="white" />
                        <stop offset="100%" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
};

export default Logo;
