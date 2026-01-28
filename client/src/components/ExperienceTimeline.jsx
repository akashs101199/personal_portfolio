import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Calendar, MapPin, Building2, Code2, ArrowRight, Zap, Target, GitCommit, ChevronRight, Layers, Sparkles } from 'lucide-react';

const ProjectDisplay = ({ section, isActive }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="h-full"
        >
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                    <Zap size={20} />
                </div>
                <h4 className="text-xl font-bold text-slate-800 leading-tight">
                    {section.title}
                </h4>
            </div>

            <ul className="space-y-4">
                {section.points.map((point, idx) => (
                    <motion.li
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-start gap-3 group"
                    >
                        <div className="mt-1.5 min-w-[6px] h-[6px] rounded-full bg-blue-400 group-hover:scale-150 group-hover:bg-blue-600 transition-all duration-300" />
                        <span className="text-slate-600 text-sm leading-relaxed group-hover:text-slate-900 transition-colors">
                            {point}
                        </span>
                    </motion.li>
                ))}
            </ul>
        </motion.div>
    );
};

const ExperienceCard = ({ job, index }) => {
    const [activeProject, setActiveProject] = useState(0);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="mb-20"
        >
            {/* Role Header Card */}
            <div className="bg-white rounded-t-3xl p-8 border border-slate-200 border-b-0 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-bl-full opacity-50 pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="flex gap-4">
                        <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-lg">
                            <Building2 size={24} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900">{job.role}</h3>
                            <div className="text-lg text-blue-600 font-semibold mt-1">{job.company}</div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3 text-sm text-slate-500 font-medium">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-full">
                            <Calendar size={14} className="text-slate-400" /> {job.period}
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-full">
                            <MapPin size={14} className="text-slate-400" /> {job.location}
                        </div>
                    </div>
                </div>

                <p className="mt-6 text-slate-600 max-w-3xl leading-relaxed">
                    {job.description}
                </p>
            </div>

            {/* Interactive Project Console */}
            <div className="bg-slate-50 rounded-b-3xl border border-slate-200 shadow-xl overflow-hidden flex flex-col md:flex-row">
                {/* Sidebar Project List */}
                <div className="md:w-1/3 bg-slate-100/50 border-r border-slate-200 p-2">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-4 py-3 flex items-center gap-2">
                        <Layers size={12} /> Key Projects
                    </div>
                    <div className="space-y-1">
                        {job.sections.map((section, sIndex) => (
                            <button
                                key={sIndex}
                                onClick={() => setActiveProject(sIndex)}
                                className={`w-full text-left px-4 py-4 rounded-xl transition-all duration-300 relative group flex items-center justify-between ${activeProject === sIndex
                                    ? 'bg-white shadow-md text-blue-700'
                                    : 'hover:bg-white/50 text-slate-600 hover:text-slate-900'
                                    }`}
                            >
                                <span className={`text-sm font-bold truncate pr-4 ${activeProject === sIndex ? 'opacity-100' : 'opacity-80'}`}>
                                    {section.title}
                                </span>
                                {activeProject === sIndex && (
                                    <motion.div
                                        layoutId={`active-indicator-${index}`}
                                        className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-l-xl"
                                    />
                                )}
                                <ChevronRight size={16} className={`transition-transform duration-300 ${activeProject === sIndex ? 'translate-x-0 opacity-100 text-blue-500' : '-translate-x-2 opacity-0'}`} />
                            </button>
                        ))}
                    </div>

                    {/* Compact Tech Stack in Sidebar for visual balance */}
                    <div className="mt-8 px-4 pb-4">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <Code2 size={12} /> Tech Stack
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {job.stack.slice(0, 4).map((tech, tIndex) => (
                                <span key={tIndex} className="text-[10px] px-2 py-1 bg-white border border-slate-200 rounded text-slate-600 font-semibold">
                                    {tech}
                                </span>
                            ))}
                            {job.stack.length > 4 && (
                                <span className="text-[10px] px-2 py-1 bg-slate-200 rounded text-slate-600 font-semibold">
                                    +{job.stack.length - 4}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="md:w-2/3 bg-white p-6 md:p-8 min-h-[400px] relative">
                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                        <GitCommit size={120} />
                    </div>

                    <div className="relative z-10 h-full">
                        <AnimatePresence mode="wait">
                            <ProjectDisplay
                                key={activeProject}
                                section={job.sections[activeProject]}
                                isActive={true}
                            />
                        </AnimatePresence>
                    </div>

                    {/* Footer Gradient Fade */}
                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent" />
                </div>
            </div>
        </motion.div>
    );
};

const ExperienceTimeline = ({ experience }) => {
    return (
        <section id="experience" className="py-24 bg-gradient-to-br from-slate-50 via-white to-slate-50 relative">
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />

            <div className="container-pro relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-full text-sm font-semibold mb-6 shadow-xl shadow-blue-900/10">
                        <Sparkles size={16} className="text-blue-400" />
                        <span>Production Value Delivered</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                        Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">Experience</span>
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Interactive breakdown of my roles, where I've architected scalable AI systems and led enterprise delivery teams.
                    </p>
                </motion.div>

                <div className="max-w-5xl mx-auto">
                    {experience.map((job, index) => (
                        <ExperienceCard key={index} job={job} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExperienceTimeline;
