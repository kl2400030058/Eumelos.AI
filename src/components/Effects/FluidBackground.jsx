import React from 'react';
import './FluidBackground.css';

const FluidBackground = () => {
    return (
        <div className="fluid-background-container">
            <div className="fluid-blob blob-1"></div>
            <div className="fluid-blob blob-2"></div>
            <div className="fluid-blob blob-3"></div>
            <div className="fluid-overlay"></div>
        </div>
    );
};

export default FluidBackground;
