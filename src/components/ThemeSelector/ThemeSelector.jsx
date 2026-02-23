import React, { useState } from 'react';
import './ThemeSelector.css';
import Logo from '../Logo/Logo';

const themes = [
    { id: 'void', name: 'Void', color: '#FFFFFF', desc: 'Classic High-Contrast' },
    { id: 'indigo', name: 'Indigo', color: '#6366f1', desc: 'Deep Ocean Blue' },
    { id: 'forest', name: 'Forest', color: '#10b981', desc: 'Natural Green' },
    { id: 'rose', name: 'Rose', color: '#f43f5e', desc: 'Modern Crimson' },
    { id: 'amber', name: 'Amber', color: '#f59e0b', desc: 'Golden Academic' },
    { id: 'arctic', name: 'Arctic', color: '#06b6d4', desc: 'Crystal Cyan' },
    { id: 'violet', name: 'Violet', color: '#8b5cf6', desc: 'Regal Purple' },
    { id: 'slate', name: 'Slate', color: '#64748b', desc: 'Minimal Gray' },
    { id: 'obsidian', name: 'Obsidian', color: '#d4af37', desc: 'Deep Gold' },
    { id: 'crimson', name: 'Crimson', color: '#dc2626', desc: 'Strong Red' },
];

const ThemeSelector = ({ onSelect }) => {
    const [selectedTheme, setSelectedTheme] = useState('dark');
    const [selectedVariant, setSelectedVariant] = useState('void');

    const handleConfirm = () => {
        onSelect(selectedTheme, selectedVariant);
    };

    return (
        <div className="theme-selector-overlay">
            <div className="theme-selector-content animate-fade-in">
                <header className="theme-header">
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                        <Logo size={40} />
                    </div>
                    <div className="badge">PERSONALIZE YOUR PORTAL</div>
                    <h1>Choose Your Visual Style</h1>
                    <p className="muted">Select your preferred colors and theme mode for a better study environment.</p>
                </header>

                <div className="selection-area">
                    <section className="mode-toggle">
                        <h3>1. Select Theme Mode</h3>
                        <div className="mode-buttons">
                            <button
                                className={`mode-btn ${selectedTheme === 'light' ? 'active' : ''}`}
                                onClick={() => setSelectedTheme('light')}
                            >
                                LIGHT MODE
                            </button>
                            <button
                                className={`mode-btn ${selectedTheme === 'dark' ? 'active' : ''}`}
                                onClick={() => setSelectedTheme('dark')}
                            >
                                DARK MODE
                            </button>
                        </div>
                    </section>

                    <section className="variant-grid-section">
                        <h3>2. Choose a Color Accent</h3>
                        <div className="variant-grid">
                            {themes.map((t) => (
                                <div
                                    key={t.id}
                                    className={`variant-card ${selectedVariant === t.id ? 'active' : ''}`}
                                    onClick={() => setSelectedVariant(t.id)}
                                    style={{ '--variant-color': t.color }}
                                >
                                    <div className="variant-preview">
                                        <div className="preview-dot"></div>
                                    </div>
                                    <div className="variant-info">
                                        <span className="variant-name">{t.name}</span>
                                        <span className="variant-desc">{t.desc}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <footer className="theme-footer">
                    <button className="confirm-btn" onClick={handleConfirm}>
                        CONTINUE TO DASHBOARD
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default ThemeSelector;
