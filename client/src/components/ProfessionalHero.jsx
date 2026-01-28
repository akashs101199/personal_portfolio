import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Briefcase, Download, TrendingUp, DollarSign, Zap, Award, Users, Building2 } from 'lucide-react';

const ProfessionalHero = () => {
    return (
        <section id="hero" className="min-h-screen flex items-center pt-24 pb-20 bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="container-pro">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                            <span>Open to New Opportunities</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-slate-900">
                            Akash Shanmuganathan
                        </h1>

                        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                            AI Implementation Specialist
                        </h2>

                        <p className="text-base text-slate-500 mb-6 font-medium">
                            Bridging Solutions & Development | MarTech • FinTech • Healthcare
                        </p>

                        <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-xl">
                            I translate business needs into <strong>production-ready AI implementations</strong> across{' '}
                            <strong>MarTech, FinTech, and Healthcare</strong>. Specializing in conversational AI,
                            multi-agent systems, and enterprise integrations—I handle both the solution design
                            and technical development at <strong className="text-slate-900">Onedata Software Solutions</strong>.
                        </p>

                        {/* Key Highlights */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="p-4 bg-white rounded-lg shadow-sm border border-slate-200">
                                <div className="flex items-center gap-2 text-emerald-600 mb-1">
                                    <DollarSign size={20} />
                                    <span className="text-2xl font-bold">$180K</span>
                                </div>
                                <p className="text-xs text-slate-600">Annual Cost Savings</p>
                            </div>
                            <div className="p-4 bg-white rounded-lg shadow-sm border border-slate-200">
                                <div className="flex items-center gap-2 text-blue-600 mb-1">
                                    <TrendingUp size={20} />
                                    <span className="text-2xl font-bold">+45%</span>
                                </div>
                                <p className="text-xs text-slate-600">Performance Gains</p>
                            </div>
                            <div className="p-4 bg-white rounded-lg shadow-sm border border-slate-200">
                                <div className="flex items-center gap-2 text-purple-600 mb-1">
                                    <Zap size={20} />
                                    <span className="text-2xl font-bold">&lt;800ms</span>
                                </div>
                                <p className="text-xs text-slate-600">Voice Latency</p>
                            </div>
                            <div className="p-4 bg-white rounded-lg shadow-sm border border-slate-200">
                                <div className="flex items-center gap-2 text-indigo-600 mb-1">
                                    <Users size={20} />
                                    <span className="text-2xl font-bold">85%</span>
                                </div>
                                <p className="text-xs text-slate-600">AI Accuracy</p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <a href="#experience" className="px-6 py-3 gradient-blue text-white rounded-lg font-semibold flex items-center gap-2 hover:shadow-lg transition-shadow">
                                View Projects <ArrowRight size={18} />
                            </a>
                            <a href="/resume.pdf" download className="px-6 py-3 bg-white border-2 border-slate-300 text-slate-700 rounded-lg font-semibold flex items-center gap-2 hover:border-blue-500 transition-colors">
                                <Download size={18} /> Resume
                            </a>
                            <a href="/portfolio.pdf" download className="px-6 py-3 bg-white border-2 border-slate-300 text-slate-700 rounded-lg font-semibold flex items-center gap-2 hover:border-blue-500 transition-colors">
                                <Briefcase size={18} /> Portfolio
                            </a>
                        </div>
                    </motion.div>

                    {/* Right: Interactive Dashboard */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-slate-900">Current Focus</h3>
                                <div className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">
                                    Active
                                </div>
                            </div>

                            {/* Core Competencies */}
                            <div className="mb-6 p-4 bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl border border-slate-200">
                                <h4 className="text-sm font-bold text-slate-900 mb-3">Core Competencies</h4>
                                <div className="space-y-2.5">
                                    <div className="flex items-start gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5" />
                                        <p className="text-xs text-slate-700"><strong>Generative AI:</strong> LLM integration, RAG systems, multi-agent orchestration</p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5" />
                                        <p className="text-xs text-slate-700"><strong>AI on Existing Systems:</strong> Integrating AI into legacy platforms</p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5" />
                                        <p className="text-xs text-slate-700"><strong>AI-Accelerated Dev:</strong> Using Claude Code, Replit, Cursor for rapid development</p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5" />
                                        <p className="text-xs text-slate-700"><strong>POC → Production:</strong> From ideation & demo to enterprise deployment</p>
                                    </div>
                                </div>
                            </div>

                            {/* Dual Project Showcase */}
                            <div className="space-y-4 mb-6">
                                {/* Healthcare AI Project */}
                                <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className="p-2 bg-blue-600 rounded-lg">
                                            <Building2 className="text-white" size={18} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-sm">Healthcare AI Platform</h4>
                                            <p className="text-xs text-slate-600">MedGemma • FHIR • Revenue Cycle Mgmt</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                        <span className="text-slate-600">Progress</span>
                                        <span className="font-semibold text-blue-600">85%</span>
                                    </div>
                                    <div className="h-1.5 bg-blue-200 rounded-full overflow-hidden mt-1">
                                        <motion.div
                                            className="h-full bg-blue-600"
                                            initial={{ width: 0 }}
                                            animate={{ width: "85%" }}
                                            transition={{ duration: 1, delay: 0.5 }}
                                        />
                                    </div>
                                </div>

                                {/* MarTech Conversational AI Project */}
                                <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className="p-2 bg-purple-600 rounded-lg">
                                            <Zap className="text-white" size={18} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-sm">MarTech Analytics AI</h4>
                                            <p className="text-xs text-slate-600">Voice AI • Multi-Agent • Enterprise</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 text-xs">
                                        <div>
                                            <span className="text-slate-600">Latency: </span>
                                            <span className="font-semibold text-purple-600">&lt;800ms</span>
                                        </div>
                                        <div>
                                            <span className="text-slate-600">Accuracy: </span>
                                            <span className="font-semibold text-purple-600">85%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Comprehensive Tech Stack */}
                            <div className="mb-6">
                                <h4 className="text-sm font-bold text-slate-700 mb-3">AI & Cloud Stack</h4>
                                <div className="flex flex-wrap gap-2">
                                    {['AWS Bedrock', 'Claude 3.5', 'MedGemma', 'Nova Sonic', 'LangChain', 'FHIR'].map((tech, i) => (
                                        <motion.div
                                            key={tech}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.6 + i * 0.05 }}
                                            className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium border border-slate-200"
                                        >
                                            {tech}
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* AWS Certifications */}
                            <div className="pt-6 border-t border-slate-200">
                                <div className="flex items-center gap-3">
                                    <Award className="text-yellow-600" size={24} />
                                    <div>
                                        <p className="font-bold text-slate-900 text-sm">AWS Certified</p>
                                        <p className="text-xs text-slate-600">Data Engineer + Solutions Architect</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ProfessionalHero;
