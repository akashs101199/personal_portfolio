import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';

const ModernHero = () => {
    return (
        <section className="min-h-screen relative flex items-center justify-center overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

            {/* Ambient Glows */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px] mix-blend-screen animate-pulse delay-700" />

            <div className="container-pro relative z-10 w-full grid lg:grid-cols-2 gap-16 items-center">

                {/* Content Side */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-semibold tracking-wide uppercase mb-6 backdrop-blur-sm">
                        <Sparkles size={12} />
                        <span>AI Product Architect</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-6 leading-[0.95]">
                        Neural <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 text-glow">
                            Architect
                        </span>
                    </h1>

                    <p className="text-xl text-slate-400 max-w-lg leading-relaxed mb-10 font-light border-l border-indigo-500/30 pl-6">
                        Bridging the divide between <strong className="text-slate-200">strategic vision</strong> and <strong className="text-slate-200">engineered reality</strong>. Building production-grade AI systems that scale.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <a href="#projects" className="px-8 py-4 bg-white text-slate-900 rounded-lg font-bold text-sm tracking-wide hover:bg-slate-200 transition-all flex items-center gap-2 group">
                            Explore Work <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a href="#about" className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-lg font-bold text-sm tracking-wide hover:bg-white/10 transition-all backdrop-blur-sm">
                            Philosophy
                        </a>
                    </div>
                </motion.div>

                {/* Abstract Visual Side - Neural Network Visualization */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative hidden lg:block"
                >
                    {/* Glass Card Container */}
                    <div className="glass-card rounded-2xl p-8 transform rotate-y-12 rotate-x-6 hover:rotate-0 transition-transform duration-700 perspective-1000">
                        {/* Abstract Data Visualization */}
                        <div className="relative aspect-square">
                            <svg viewBox="0 0 200 200" className="w-full h-full">
                                <defs>
                                    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                                        <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.8" />
                                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                                    </linearGradient>
                                </defs>

                                {/* Connecting Lines */}
                                {[...Array(15)].map((_, i) => (
                                    <motion.path
                                        key={i}
                                        d={`M${50 + Math.random() * 100},${50 + Math.random() * 100} Q100,100 ${50 + Math.random() * 100},${50 + Math.random() * 100}`}
                                        stroke="url(#lineGrad)"
                                        strokeWidth="0.5"
                                        fill="none"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{ pathLength: 1, opacity: 1 }}
                                        transition={{ duration: 2, delay: i * 0.1, repeat: Infinity, repeatType: "reverse" }}
                                    />
                                ))}

                                {/* Nodes */}
                                {[...Array(8)].map((_, i) => (
                                    <motion.circle
                                        key={i}
                                        cx={50 + Math.random() * 100}
                                        cy={50 + Math.random() * 100}
                                        r="2"
                                        fill="#fff"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
                                    />
                                ))}
                            </svg>

                            {/* Overlay Stats */}
                            <div className="absolute bottom-4 left-4 right-4 flex justify-between text-[10px] font-mono text-indigo-300">
                                <div>SYS.OPTIMIZED</div>
                                <div className="animate-pulse">RUNNING</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500"
            >
                <ChevronDown />
            </motion.div>
        </section>
    );
};

export default ModernHero;
