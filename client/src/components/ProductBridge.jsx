import React from 'react';
import { motion } from 'framer-motion';
import {
    Lightbulb, Rocket, Settings, RefreshCw,
    Database, Cpu, MessageSquare, Zap
} from 'lucide-react';

const ProductBridge = () => {
    return (
        <div className="relative w-full aspect-[4/3] bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden flex flex-col">
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    <span className="text-xs font-bold text-slate-500 tracking-wider">GEN-AI ACCELERATOR ACTIVE</span>
                </div>
                <div className="text-xs font-mono text-blue-600 font-bold">5X VELOCITY</div>
            </div>

            {/* Main Visualizer Area */}
            <div className="flex-1 relative p-6 flex items-center justify-between gap-4">

                {/* 1. INPUT: Business Vision (Left) */}
                <div className="w-1/4 flex flex-col gap-4 relative z-10">
                    <div className="text-xs font-bold text-slate-400 uppercase text-center mb-2">My Vision</div>
                    {['Growth Goals', 'User Needs', 'Market Strategy'].map((tag, i) => (
                        <motion.div
                            key={i}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: i * 0.2 }}
                            className="p-3 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center gap-2 text-xs font-bold text-slate-600"
                        >
                            <Lightbulb size={14} className="text-amber-500" /> {tag}
                        </motion.div>
                    ))}
                </div>

                {/* 2. PROCESSOR: The AI Engine (Center) */}
                <div className="flex-1 relative h-full flex items-center justify-center">
                    {/* Connecting Pipes */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-slate-200" style={{ opacity: 0.5 }}>
                        <line x1="0%" y1="20%" x2="50%" y2="50%" strokeWidth="2" strokeDasharray="4 4" />
                        <line x1="0%" y1="50%" x2="50%" y2="50%" strokeWidth="2" strokeDasharray="4 4" />
                        <line x1="0%" y1="80%" x2="50%" y2="50%" strokeWidth="2" strokeDasharray="4 4" />
                        <line x1="50%" y1="50%" x2="100%" y2="20%" strokeWidth="2" strokeDasharray="4 4" />
                        <line x1="50%" y1="50%" x2="100%" y2="50%" strokeWidth="2" strokeDasharray="4 4" />
                        <line x1="50%" y1="50%" x2="100%" y2="80%" strokeWidth="2" strokeDasharray="4 4" />
                    </svg>

                    {/* The Core */}
                    <div className="relative z-20 w-32 h-32 bg-slate-900 rounded-2xl flex flex-col items-center justify-center shadow-2xl shadow-blue-500/20 border border-white/20">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-[-4px] rounded-2xl border border-blue-500/30 border-dashed"
                        />
                        <Zap className="text-blue-400 w-8 h-8 mb-2" fill="currentColor" />
                        <span className="text-white text-[10px] font-bold tracking-widest text-center">AI ENGINE</span>

                        {/* Floating Hot Topic Tags */}
                        <motion.div
                            animate={{ y: [40, -60] }} // Float UP from center
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="absolute text-[8px] font-bold text-purple-300 bg-purple-900/50 px-1 rounded top-0"
                        >
                            LLMs
                        </motion.div>
                        <motion.div
                            animate={{ y: [30, -70], x: 30 }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 0.5 }}
                            className="absolute text-[8px] font-bold text-emerald-300 bg-emerald-900/50 px-1 rounded top-0"
                        >
                            RAG
                        </motion.div>
                        <motion.div
                            animate={{ y: [50, -50], x: -30 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }}
                            className="absolute text-[8px] font-bold text-cyan-300 bg-cyan-900/50 px-1 rounded top-0"
                        >
                            AGENTS
                        </motion.div>
                    </div>

                    {/* Particles Flowing Through */}
                    <motion.div
                        className="absolute w-2 h-2 bg-blue-500 rounded-full blur-[2px]"
                        animate={{
                            x: [-100, 0, 100],
                            opacity: [0, 1, 0],
                            scale: [1, 2, 0.5]
                        }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>

                {/* 3. OUTPUT: Shipped Product (Right) */}
                <div className="w-1/4 flex flex-col gap-3 relative z-10">
                    <div className="text-xs font-bold text-slate-400 uppercase text-center mb-2">Shipped (5x)</div>
                    {[
                        { label: 'Deployed App', icon: <Rocket size={14} />, color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
                        { label: 'Active Pipeline', icon: <Settings size={14} />, color: 'bg-blue-50 text-blue-600 border-blue-200' },
                        { label: 'User Value', icon: <Database size={14} />, color: 'bg-purple-50 text-purple-600 border-purple-200' }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                                delay: 1 + (i * 0.3),
                                repeat: Infinity,
                                repeatDelay: 2
                            }}
                            className={`p-3 border rounded-xl shadow-sm flex items-center gap-2 text-xs font-bold ${item.color}`}
                        >
                            {item.icon} {item.label}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Bottom Metrics */}
            <div className="bg-slate-50 p-4 flex justify-between text-xs font-mono border-t border-slate-100">
                <div className="text-slate-500">Latency: <span className="text-emerald-600 font-bold">12ms</span></div>
                <div className="text-slate-500">Scale: <span className="text-blue-600 font-bold">Global</span></div>
                <div className="text-slate-500">Architecture: <span className="text-purple-600 font-bold">Resilient</span></div>
            </div>
        </div>
    );
};

export default ProductBridge;
