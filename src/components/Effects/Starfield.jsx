import React, { useEffect, useRef } from 'react';

const Starfield = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resize);
        resize();

        // Star properties
        const starCount = 400; // Increased count
        const stars = [];

        // Nebula properties
        const nebulae = [
            { x: 0.2, y: 0.3, color: 'rgba(59, 130, 246, 0.08)', size: 0.6 },
            { x: 0.8, y: 0.7, color: 'rgba(99, 102, 241, 0.08)', size: 0.7 },
            { x: 0.5, y: 0.5, color: 'rgba(239, 68, 68, 0.05)', size: 0.8 }
        ];

        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 1.8,
                opacity: Math.random(),
                speed: Math.random() * 0.04 + 0.01,
                direction: Math.random() * Math.PI * 2,
                depth: Math.random() // For parallax-like feel
            });
        }

        const draw = () => {
            const isLight = document.documentElement.getAttribute('data-theme') === 'light';

            ctx.fillStyle = isLight ? '#ffffff' : '#000000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw Nebulae (Galaxy Dust / Sky Clouds)
            nebulae.forEach(neb => {
                const nx = neb.x * canvas.width;
                const ny = neb.y * canvas.height;
                const rad = neb.size * Math.max(canvas.width, canvas.height);
                const grd = ctx.createRadialGradient(nx, ny, 0, nx, ny, rad);

                // Theme aware nebula colors
                const color = isLight
                    ? neb.color.replace('0.08', '0.04').replace('0.05', '0.03') // Subtle in light
                    : neb.color;

                grd.addColorStop(0, color);
                grd.addColorStop(1, isLight ? 'rgba(255, 255, 255, 0)' : 'rgba(0, 0, 0, 0)');
                ctx.fillStyle = grd;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            });

            stars.forEach(star => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);

                // Theme aware star colors
                const starColor = isLight
                    ? `rgba(59, 130, 246, ${star.opacity * 0.3})` // Light blue specks
                    : `rgba(255, 255, 255, ${star.opacity})`;

                ctx.fillStyle = starColor;
                ctx.fill();

                // Update position
                const moveSpeed = star.speed * (1 + star.depth);
                star.x += Math.cos(star.direction) * moveSpeed;
                star.y += Math.sin(star.direction) * moveSpeed;

                // Subtle twinkle
                if (Math.random() > 0.98) {
                    star.opacity = Math.random() * 0.6 + 0.2;
                }

                // Wrap around screen
                if (star.x < 0) star.x = canvas.width;
                if (star.x > canvas.width) star.x = 0;
                if (star.y < 0) star.y = canvas.height;
                if (star.y > canvas.height) star.y = 0;
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -2,
                pointerEvents: 'none',
                background: 'transparent'
            }}
        />
    );
};

export default Starfield;
