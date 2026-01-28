import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Database, Shield, Server, Briefcase, ChevronRight, Sparkles, TrendingUp, Lock, Layers, Code2, Globe, Award } from 'lucide-react';

const ExpertiseSection = ({ categories }) => {
    const [activeCard, setActiveCard] = useState(null);

    return (
        <section id="expertise" className="py-24 bg-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-20" />

            <div className="container-pro relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6"
                    >
                        <Sparkles size={16} />
                        <span>Full-Stack AI Expertise</span>
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                        Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Arsenal</span>
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        End-to-end capabilities spanning Generative AI, Cloud Infrastructure, Healthcare Tech, and Product Strategy
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* AI & LLM Engineering - Featured Large Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        onHoverStart={() => setActiveCard(0)}
                        onHoverEnd={() => setActiveCard(null)}
                        className="lg:col-span-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden group cursor-pointer"
                    >
                        {/* Animated Background */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700" />
                        </div>

                        <div className="relative z-10">
                            <div className="flex items-start justify-between mb-6">
                                <div className="inline-flex p-4 bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
                                    <Brain size={40} className="text-white" />
                                </div>
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: activeCard === 0 ? 1 : 0 }}
                                    className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold"
                                >
                                    PRIMARY EXPERTISE
                                </motion.div>
                            </div>

                            <h3 className="text-3xl font-bold mb-3">{categories[0].name}</h3>
                            <p className="text-blue-100 mb-6 text-lg max-w-xl">{categories[0].description}</p>

                            {/* Technologies Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                                {categories[0].skills.map((skill, idx) => (
                                    <motion.div
                                        key={skill}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.05 }}
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        className="px-3 py-2 bg-white/15 backdrop-blur-md border border-white/30 rounded-xl text-sm font-semibold text-center hover:bg-white/25 transition-colors"
                                    >
                                        {skill}
                                    </motion.div>
                                ))}
                            </div>

                            {/* Key Metrics */}
                            <div className="flex flex-wrap gap-6 pt-4 border-t border-white/20">
                                <div className="flex items-center gap-2">
                                    <TrendingUp size={20} className="text-blue-200" />
                                    <div>
                                        <p className="text-xs text-blue-200">Production Systems</p>
                                        <p className="text-lg font-bold">85% Accuracy</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Layers size={20} className="text-blue-200" />
                                    <div>
                                        <p className="text-xs text-blue-200">Multi-Agent</p>
                                        <p className="text-lg font-bold">4-Agent Systems</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Data Engineering - Tall Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        onHoverStart={() => setActiveCard(3)}
                        onHoverEnd={() => setActiveCard(null)}
                        className="lg:row-span-2 bg-white rounded-3xl p-8 border-2 border-slate-200 shadow-lg hover:shadow-2xl transition-all relative overflow-hidden group cursor-pointer"
                    >
                        <div className="absolute bottom-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Database size={180} className="text-blue-600" />
                        </div>

                        <div className="relative z-10 h-full flex flex-col">
                            <div className="inline-flex p-3 bg-blue-50 rounded-xl shadow-sm mb-6 text-blue-600 w-fit group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <Database size={32} />
                            </div>

                            <h3 className="text-2xl font-bold text-slate-900 mb-3">{categories[3].name}</h3>
                            <p className="text-slate-600 mb-6">{categories[3].description}</p>

                            {/* Impact Metrics */}
                            <div className="mb-6 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                                <p className="text-xs font-bold text-blue-600 mb-2">IMPACT DELIVERED</p>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-slate-700">Cost Savings</span>
                                        <span className="text-lg font-bold text-blue-600">$180K</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-slate-700">Performance Gain</span>
                                        <span className="text-lg font-bold text-blue-600">+45%</span>
                                    </div>
                                </div>
                            </div>

                            {/* Skills List */}
                            <div className="space-y-3 mt-auto">
                                {categories[3].skills.map((skill, idx) => (
                                    <motion.div
                                        key={skill}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="flex items-center gap-3 text-slate-700 font-medium group/item"
                                    >
                                        <div className="w-2 h-2 rounded-full bg-blue-500 group-hover/item:scale-150 transition-transform" />
                                        <span className="group-hover/item:text-blue-600 transition-colors">{skill}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Cloud Architecture */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        onHoverStart={() => setActiveCard(2)}
                        onHoverEnd={() => setActiveCard(null)}
                        className="bg-white rounded-3xl p-8 border-2 border-slate-200 shadow-lg hover:shadow-xl hover:border-slate-300 transition-all group cursor-pointer"
                    >
                        <div className="inline-flex p-3 bg-slate-100 rounded-xl shadow-sm mb-4 text-slate-600 group-hover:bg-slate-900 group-hover:text-white transition-all">
                            <Server size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">{categories[2].name}</h3>
                        <p className="text-sm text-slate-600 mb-4">{categories[2].description}</p>

                        <div className="flex flex-wrap gap-2">
                            {categories[2].skills.map((skill, idx) => (
                                <motion.span
                                    key={skill}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg hover:bg-slate-200 transition-colors"
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </div>

                        {/* AWS Badge */}
                        <div className="mt-6 pt-4 border-t border-slate-200">
                            <div className="flex items-center gap-2 text-orange-600">
                                <Shield size={16} />
                                <span className="text-xs font-bold">AWS Certified</span>
                            </div>
                        </div>
                    </motion.div>


                    {/* Healthcare AI */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        onHoverStart={() => setActiveCard(1)}
                        onHoverEnd={() => setActiveCard(null)}
                        className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-8 border-2 border-emerald-200 shadow-lg hover:shadow-xl transition-all group cursor-pointer"
                    >
                        <div className="relative z-10">
                            <div className="inline-flex p-3 bg-white rounded-xl shadow-sm mb-4 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                                <Shield size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">{categories[1].name}</h3>
                            <p className="text-sm text-slate-700 mb-4">{categories[1].description}</p>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {categories[1].skills.map((skill, idx) => (
                                    <motion.span
                                        key={skill}
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="text-xs font-bold text-emerald-700 bg-white px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition-colors"
                                    >
                                        {skill}
                                    </motion.span>
                                ))}
                            </div>

                            {/* HIPAA Badge */}
                            <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-emerald-200">
                                <Lock size={16} className="text-emerald-600" />
                                <span className="text-xs font-bold text-emerald-700">HIPAA Compliant Systems</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* AWS Certifications - Fill Gap (1 col) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden group cursor-pointer"
                    >
                        <div className="absolute top-0 right-0 p-6 opacity-10">
                            <Award size={120} className="text-white" />
                        </div>

                        <div className="relative z-10">
                            <div className="inline-flex p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm mb-4">
                                <Award size={28} className="text-white" />
                            </div>

                            <h3 className="text-xl font-bold mb-3">AWS Certified</h3>
                            <p className="text-orange-100 text-sm mb-6">Production deployment expertise</p>

                            <div className="space-y-3">
                                <div className="p-3 bg-white/10 backdrop-blur-md border border-white/30 rounded-lg">
                                    <p className="text-sm font-bold">Data Engineer</p>
                                    <p className="text-xs text-orange-100 mt-1">DEA-C01 • Active</p>
                                </div>
                                <div className="p-3 bg-white/10 backdrop-blur-md border border-white/30 rounded-lg">
                                    <p className="text-sm font-bold">Solutions Architect</p>
                                    <p className="text-xs text-orange-100 mt-1">SAA-C03 • Loading...</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Product Strategy - Wide Card (2 cols) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        onHoverStart={() => setActiveCard(4)}
                        onHoverEnd={() => setActiveCard(null)}
                        className="lg:col-span-2 bg-gradient-to-r from-slate-900 to-indigo-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden group cursor-pointer"
                    >
                        {/* Animated Background */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />

                        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8 h-full">
                            <div className="flex-1">
                                <div className="inline-flex p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm mb-4 text-indigo-300">
                                    <Briefcase size={28} />
                                </div>
                                <h3 className="text-2xl font-bold mb-3">{categories[4].name}</h3>
                                <p className="text-slate-300 mb-6 max-w-md">{categories[4].description}</p>

                                {/* Key Achievements */}
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm">
                                        <ChevronRight size={16} className="text-indigo-400" />
                                        <span className="text-indigo-200">POC to Production Pipeline</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <ChevronRight size={16} className="text-indigo-400" />
                                        <span className="text-indigo-200">C-Suite Technical Demos</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <ChevronRight size={16} className="text-indigo-400" />
                                        <span className="text-indigo-200">Cross-Functional Leadership</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 max-w-xs">
                                {categories[4].skills.map((skill, idx) => (
                                    <motion.span
                                        key={skill}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.05 }}
                                        whileHover={{ scale: 1.05 }}
                                        className="px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-xs font-semibold hover:bg-white/20 transition-colors"
                                    >
                                        {skill}
                                    </motion.span>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Industry Domains - Featured Card (3 Cols) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        onHoverStart={() => setActiveCard(5)}
                        onHoverEnd={() => setActiveCard(null)}
                        className="lg:col-span-3 bg-gradient-to-br from-sky-500 to-cyan-600 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden group cursor-pointer"
                    >
                        {/* Animated Background */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2 group-hover:scale-150 transition-transform duration-700" />
                        </div>

                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
                                        <Globe size={32} className="text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold">{categories[5].name}</h3>
                                        <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold w-fit mt-1">
                                            MULTI-DOMAIN EXPERTISE
                                        </div>
                                    </div>
                                </div>
                                <p className="text-sky-100 max-w-md text-right hidden md:block">{categories[5].description}</p>
                            </div>

                            {/* Domain Badges */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div className="p-6 bg-white/10 backdrop-blur-md border border-white/30 rounded-2xl text-center group-hover:bg-white/15 transition-all">
                                    <TrendingUp size={32} className="mx-auto mb-3 text-white" />
                                    <p className="text-lg font-bold mb-1">MarTech</p>
                                    <p className="text-sm text-sky-100">Voice Analytics</p>
                                </div>
                                <div className="p-6 bg-white/10 backdrop-blur-md border border-white/30 rounded-2xl text-center group-hover:bg-white/15 transition-all">
                                    <Database size={32} className="mx-auto mb-3 text-white" />
                                    <p className="text-lg font-bold mb-1">FinTech</p>
                                    <p className="text-sm text-sky-100">Data Lakes</p>
                                </div>
                                <div className="p-6 bg-white/10 backdrop-blur-md border border-white/30 rounded-2xl text-center group-hover:bg-white/15 transition-all">
                                    <Shield size={32} className="mx-auto mb-3 text-white" />
                                    <p className="text-lg font-bold mb-1">Healthcare</p>
                                    <p className="text-sm text-sky-100">RCM & FHIR</p>
                                </div>
                            </div>

                            {/* Skills */}
                            <div className="flex flex-wrap gap-3 justify-center">
                                {categories[5].skills.map((skill, idx) => (
                                    <motion.span
                                        key={skill}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.05 }}
                                        whileHover={{ scale: 1.05 }}
                                        className="px-4 py-2 bg-white/15 border border-white/30 rounded-xl text-sm font-semibold hover:bg-white/25 transition-colors"
                                    >
                                        {skill}
                                    </motion.span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Additional Tools Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12 p-8 bg-white rounded-3xl border-2 border-blue-100 shadow-lg"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <Code2 size={28} className="text-blue-600" />
                        <div>
                            <h3 className="text-xl font-bold text-slate-900">AI-Accelerated Development Tools</h3>
                            <p className="text-sm text-slate-600">Leveraging cutting-edge AI tools for 40% faster development</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        {['Claude Code', 'Replit Agent', 'Cursor AI', 'GitHub Copilot', 'AWS CodeWhisperer', 'ChatGPT'].map((tool, idx) => (
                            <motion.div
                                key={tool}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                whileHover={{ scale: 1.05, y: -2 }}
                                className="px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl text-sm font-bold text-blue-700 hover:border-blue-400 transition-all cursor-default"
                            >
                                {tool}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ExpertiseSection;
