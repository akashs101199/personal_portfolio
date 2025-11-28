import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CyberCursor = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Smooth spring animation for the main cursor
    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    const [isClicking, setIsClicking] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [coords, setCoords] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            setCoords({ x: e.clientX, y: e.clientY });
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        const handleMouseOver = (e) => {
            // Check if hovering over interactive elements
            if (
                e.target.tagName === 'BUTTON' ||
                e.target.tagName === 'A' ||
                e.target.closest('.interactive') ||
                e.target.closest('.cursor-pointer')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    return (
        <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
            <motion.div
                className="absolute top-0 left-0"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: '-50%',
                    translateY: '-50%'
                }}
            >
                {/* Main Reticle */}
                <div className={`relative flex items-center justify-center transition-all duration-150 ${isHovering ? 'scale-150' : 'scale-100'}`}>
                    {/* Center Dot */}
                    <div className="w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]" />

                    {/* Outer Ring */}
                    <div className={`absolute border border-cyan-500/50 rounded-full transition-all duration-300 ${isClicking ? 'w-8 h-8 border-pink-500 bg-pink-500/10' : 'w-6 h-6'}`} />

                    {/* Crosshair Lines */}
                    <div className={`absolute w-10 h-[1px] bg-cyan-500/30 transition-all duration-300 ${isHovering ? 'w-16 bg-cyan-400/50' : ''}`} />
                    <div className={`absolute h-10 w-[1px] bg-cyan-500/30 transition-all duration-300 ${isHovering ? 'h-16 bg-cyan-400/50' : ''}`} />
                </div>

                {/* Dynamic "Graph" Data Visualization */}
                <div className="absolute top-6 left-6 flex flex-col gap-1 pointer-events-none opacity-80">
                    {/* Animated Bar Graph */}
                    <div className="flex items-end gap-0.5 h-6 p-1 border-l border-b border-cyan-500/30 bg-black/40 backdrop-blur-sm">
                        {[...Array(8)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="w-1 bg-pink-500/70"
                                animate={{
                                    height: [4, Math.random() * 16 + 4, 4],
                                    backgroundColor: ["rgba(244, 114, 182, 0.7)", "rgba(34, 211, 238, 0.7)", "rgba(244, 114, 182, 0.7)"]
                                }}
                                transition={{
                                    duration: 0.5 + Math.random() * 0.5,
                                    repeat: Infinity,
                                    delay: i * 0.05,
                                    ease: "easeInOut"
                                }}
                            />
                        ))}
                    </div>

                    {/* Coordinate Data */}
                    <div className="text-[8px] font-mono text-cyan-500/90 whitespace-nowrap bg-black/60 px-1 border-l-2 border-cyan-500">
                        X:{coords.x.toString().padStart(4, '0')} <br />
                        Y:{coords.y.toString().padStart(4, '0')}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default CyberCursor;
