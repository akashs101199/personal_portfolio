import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Database, Globe, Layers, Terminal, Shield, Zap, Code, Server, Wifi } from 'lucide-react';
import GlitchText from './GlitchText';

const SkillCard = ({ skill, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    // Map skills to icons (simple heuristic or random if not found)
    const getIcon = (name) => {
        const n = name.toLowerCase();
        if (n.includes('react') || n.includes('node') || n.includes('js')) return <Code size={20} />;
        if (n.includes('aws') || n.includes('cloud')) return <Globe size={20} />;
        if (n.includes('db') || n.includes('sql') || n.includes('data')) return <Database size={20} />;
        if (n.includes('ai') || n.includes('agent') || n.includes('gpt')) return <Cpu size={20} />;
        if (n.includes('python')) return <Terminal size={20} />;
        if (n.includes('security') || n.includes('auth')) return <Shield size={20} />;
        return <Layers size={20} />;
    };

    return (
        <motion.div
            className="relative w-full h-32 bg-slate-900 border border-slate-700 group cursor-pointer overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            style={{
                clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)'
            }}
        >
            {/* Background Tech Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(6,182,212,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:10px_10px]" />

            {/* Hover Glow */}
            <div className={`absolute inset-0 bg-cyan-500/10 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

            {/* Content Container */}
            <div className="relative h-full p-4 flex flex-col justify-between z-10">

                {/* Header: Tech Specs & Icon */}
                <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-1">
                        <span className="text-[8px] text-slate-500 font-mono tracking-widest">MOD_ID_{index.toString().padStart(3, '0')}</span>
                        <div className={`text-cyan-500 transition-all duration-300 ${isHovered ? 'scale-110 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]' : 'opacity-50'}`}>
                            {getIcon(skill.name)}
                        </div>
                    </div>
                    {/* Decorative Barcode */}
                    <div className="flex gap-0.5 h-4 items-end opacity-30">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="w-0.5 bg-cyan-500" style={{ height: `${Math.random() * 100}%` }} />
                        ))}
                    </div>
                </div>

                {/* Footer: Skill Name & Usage */}
                <div className="relative">
                    {/* Label */}
                    <div className="text-[8px] text-pink-500 font-mono mb-1 opacity-70">
                        {isHovered ? 'DEPLOYMENT_CONTEXT' : 'CAPABILITY_MODULE'}
                    </div>

                    {/* Name with Glitch Reveal */}
                    <div className="font-mono font-bold text-lg text-white tracking-tight leading-none">
                        {isHovered ? (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-xs text-cyan-300 block leading-tight"
                            >
                                {skill.usage}
                            </motion.span>
                        ) : (
                            <span className="opacity-80">{skill.name}</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Corner Accents */}
            <div className={`absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500 transition-all duration-300 ${isHovered ? 'w-full h-full opacity-100' : 'w-2 h-2 opacity-50'}`} />
            <div className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500 transition-all duration-300 ${isHovered ? 'w-full h-full opacity-100' : 'w-2 h-2 opacity-50'}`} />

            {/* Scanning Line Effect on Hover */}
            {isHovered && (
                <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent z-20 pointer-events-none"
                    initial={{ y: '-100%' }}
                    animate={{ y: '100%' }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    style={{ height: '20%' }}
                />
            )}
        </motion.div>
    );
};

export default SkillCard;
