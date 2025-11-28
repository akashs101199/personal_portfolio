import React from 'react';

const GlitchText = ({ text, className, color = "text-cyan-400" }) => {
    return (
        <div className={`relative group inline-block ${className}`}>
            <span className={`relative z-10 ${color}`}>{text}</span>
            <span className="absolute top-0 left-0 -z-10 w-full h-full text-pink-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-[3px] group-hover:translate-y-[1px] transition-all duration-75 select-none">{text}</span>
            <span className="absolute top-0 left-0 -z-10 w-full h-full text-yellow-400 opacity-0 group-hover:opacity-100 group-hover:-translate-x-[3px] group-hover:-translate-y-[1px] transition-all duration-75 select-none">{text}</span>
        </div>
    );
};

export default GlitchText;
