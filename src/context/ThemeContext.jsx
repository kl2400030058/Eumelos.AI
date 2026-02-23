import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(localStorage.getItem('eumelos_theme') || 'dark');
    const [variant, setVariant] = useState(localStorage.getItem('eumelos_variant') || 'void');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('eumelos_theme', theme);
    }, [theme]);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme-variant', variant);
        localStorage.setItem('eumelos_variant', variant);
    }, [variant]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    return (
        <ThemeContext.Provider value={{ theme, variant, setTheme, setVariant, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
