import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown, Cpu, Terminal } from 'lucide-react';
import StartupDashboard from './StartupDashboard';

const HeroSection = () => {
    const containerRef = useRef(null);
    const { scrollY } = useScroll();

    // Parallax Effects
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <section
            id="hero"
            ref={containerRef}
            className="min-h-screen relative flex items-center justify-center pt-24 pb-20 overflow-hidden bg-[#fafafa]"
        >
            {/* Abstract Background Meshes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    style={{ y: y1 }}
                    className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] bg-gradient-to-br from-indigo-100/40 to-purple-100/40 rounded-full blur-[100px]"
                />
                <motion.div
                    style={{ y: y2 }}
                    className="absolute top-[40%] -left-[10%] w-[600px] h-[600px] bg-gradient-to-tr from-blue-100/40 to-emerald-100/40 rounded-full blur-[80px]"
                />
            </div>

            <div className="container-pro relative z-10 w-full grid lg:grid-cols-2 gap-12 items-center">

                {/* Text Content - The Architect */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-left"
                >
                    {/* Status Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-full shadow-sm mb-8"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-xs font-bold text-slate-600 tracking-wide uppercase">Open to New Opportunities</span>
                    </motion.div>

                    <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-slate-900 mb-6 leading-[0.9]">
                        BUILDING <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 animate-gradient-x bg-[length:200%_auto]">
                            INTELLIGENCE
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-600 max-w-xl leading-relaxed font-light mb-10">
                        I architect <span className="font-semibold text-slate-900">production AI systems</span> that solve complex problems.
                        Bridging the gap between <span className="text-indigo-600 font-semibold">Visionary Product Strategy</span> and <span className="text-blue-600 font-semibold">Technical Execution</span>.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href="#experience"
                            className="px-8 py-4 bg-slate-900 text-white rounded-xl font-bold text-lg shadow-lg shadow-slate-900/20 hover:bg-slate-800 transition-colors flex items-center gap-2 group"
                        >
                            Explore My Work
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </motion.a>

                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href="#about"
                            className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold text-lg shadow-sm hover:shadow-md transition-all"
                        >
                            My Philosophy
                        </motion.a>
                    </div>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-3 gap-6 mt-16 pt-8 border-t border-slate-200/60">
                        <div>
                            <div className="text-3xl font-bold text-slate-900">4+</div>
                            <div className="text-sm text-slate-500 font-medium">Years Experience</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-slate-900">$180K+</div>
                            <div className="text-sm text-slate-500 font-medium">Cost Savings</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-slate-900">10x</div>
                            <div className="text-sm text-slate-500 font-medium">Efficiency Gain</div>
                        </div>
                    </div>
                </motion.div>

                {/* Visual - Dashboard Hologram */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
                    animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                    transition={{ duration: 1, delay: 0.4, type: "spring" }}
                    className="relative hidden lg:block perspective-1000"
                >
                    <div className="relative z-10 transform transition-transform hover:scale-[1.02] duration-500 ease-out preserve-3d">
                        <div className="absolute inset-0 bg-indigo-500/10 blur-3xl -z-10 rounded-full" />
                        <StartupDashboard />
                    </div>

                    {/* Floating Tech Badges */}
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -top-12 -right-12 bg-white p-4 rounded-xl shadow-xl border border-slate-100 flex items-center gap-3 z-20"
                    >
                        <div className="p-2 bg-purple-100 rounded-lg text-purple-600"><Cpu size={24} /></div>
                        <div>
                            <div className="text-xs font-bold text-slate-400 uppercase">Model</div>
                            <div className="font-bold text-slate-900">Claude 3.5 Sonnet</div>
                        </div>
                    </motion.div>

                    <motion.div
                        animate={{ y: [0, 20, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute -bottom-8 -left-8 bg-white p-4 rounded-xl shadow-xl border border-slate-100 flex items-center gap-3 z-20"
                    >
                        <div className="p-2 bg-blue-100 rounded-lg text-blue-600"><Terminal size={24} /></div>
                        <div>
                            <div className="text-xs font-bold text-slate-400 uppercase">System</div>
                            <div className="font-bold text-slate-900">Multi-Agent Swarm</div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                style={{ opacity }}
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-400 flex flex-col items-center gap-2"
            >
                <div className="text-xs uppercase tracking-widest font-bold">Scroll</div>
                <ChevronDown size={20} />
            </motion.div>
        </section>
    );
};

export default HeroSection;
