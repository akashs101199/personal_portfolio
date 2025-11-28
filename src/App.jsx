import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import * as THREE from 'three';
import {
    Github, Linkedin, Mail, FileText, Download, ExternalLink,
    ChevronDown, Database, Server, Cpu, Globe, Shield, Zap,
    Code, Terminal, Layout, BarChart, Calendar, Activity,
    CheckCircle, ArrowRight, MapPin
} from 'lucide-react';

// --- 3D Background: Neural Network ---

const NeuralNetwork = () => {
    const ref = useRef();
    const { viewport, mouse } = useThree();

    // Generate random points
    const [positions] = useState(() => {
        const pos = random.inSphere(new Float32Array(300), { radius: 12 }); // 100 points
        return pos;
    });

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 20;
            ref.current.rotation.y -= delta / 25;

            // Subtle mouse interaction
            const x = (mouse.x * viewport.width) / 50;
            const y = (mouse.y * viewport.height) / 50;
            ref.current.position.x += (x - ref.current.position.x) * 0.05;
            ref.current.position.y += (y - ref.current.position.y) * 0.05;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#34d399"
                    size={0.05}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.6}
                />
            </Points>
            {/* Connections would be expensive to calculate in JS every frame for 100 points without a shader, 
          so we'll use a visual trick with a second layer of points moving differently to create depth */}
            <Points positions={positions} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#60a5fa"
                    size={0.03}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.3}
                />
            </Points>
        </group>
    );
};

const Scene = () => {
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#0B1020]">
            <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
                <fog attach="fog" args={['#0B1020', 5, 20]} />
                <ambientLight intensity={0.5} />
                <NeuralNetwork />
            </Canvas>
        </div>
    );
};

// --- UI Components ---

const SpotlightCard = ({ children, className = "" }) => {
    const divRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`spotlight-card glass rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 ${className}`}
            style={{
                '--mouse-x': `${position.x}px`,
                '--mouse-y': `${position.y}px`,
            }}
        >
            <div className="relative z-10 h-full flex flex-col">{children}</div>
        </div>
    );
};

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Experience', href: '#experience' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0B1020]/80 backdrop-blur-xl border-b border-white/10 py-3' : 'py-5'}`}>
            <div className="mx-auto max-w-7xl px-4 md:px-8 flex items-center justify-between">
                <a href="#" className="group inline-flex items-center gap-3 text-lg font-bold tracking-wide">
                    <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-500/20 to-blue-500/20 border border-emerald-500/30 group-hover:border-emerald-500/50 transition-all">
                        <span className="text-emerald-400 font-mono">AS</span>
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-slate-200 text-sm font-bold group-hover:text-white transition-colors">Akash S.</span>
                        <span className="text-[10px] text-emerald-400 uppercase tracking-wider font-medium">System Online</span>
                    </div>
                </a>

                <nav className="hidden md:flex gap-8 text-sm font-medium">
                    {navLinks.map(link => (
                        <a key={link.name} href={link.href} className="text-slate-400 hover:text-emerald-300 transition-colors relative group py-2">
                            {link.name}
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
                        </a>
                    ))}
                </nav>

                <div className="hidden md:flex items-center gap-4">
                    <a href="/Akash_Shanmuganathan_Resume.pdf" className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white hover:border-slate-600 transition-all">
                        <Download size={14} />
                        Resume
                    </a>
                    <a href="#contact" className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-2 text-sm font-bold text-white hover:from-emerald-400 hover:to-emerald-500 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105">
                        <Mail size={14} />
                        Hire Me
                    </a>
                </div>

                <button className="md:hidden text-slate-300" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    <div className="space-y-1.5">
                        <span className={`block w-6 h-0.5 bg-current transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                        <span className={`block w-6 h-0.5 bg-current transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`block w-6 h-0.5 bg-current transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                    </div>
                </button>
            </div>

            {mobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden absolute top-full left-0 w-full bg-[#0B1020]/95 backdrop-blur-xl border-b border-white/10 p-4"
                >
                    <div className="flex flex-col gap-4">
                        {navLinks.map(link => (
                            <a key={link.name} href={link.href} className="text-slate-300 hover:text-emerald-300 py-2 border-b border-white/5" onClick={() => setMobileMenuOpen(false)}>
                                {link.name}
                            </a>
                        ))}
                    </div>
                </motion.div>
            )}
        </header>
    );
};

const Hero = () => {
    return (
        <section className="relative mx-auto max-w-7xl px-4 py-20 md:px-8 lg:py-32 flex flex-col md:flex-row items-center gap-12">
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex-1"
            >
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium text-emerald-300 animate-float">
                    <Shield size={12} />
                    <span>AWS Certified Data & AI Engineer</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 tracking-tight">
                    Architecting <br />
                    <span className="grad-text">Intelligent Agents</span>
                </h1>

                <p className="mb-8 max-w-xl text-lg text-slate-400 leading-relaxed">
                    I build production-grade AI systems that actually work. From governed data platforms to autonomous agents that cut costs and speed up decisions.
                </p>

                <div className="flex flex-wrap gap-4 mb-12">
                    <a href="#projects" className="inline-flex items-center gap-2 rounded-lg bg-white text-slate-900 px-6 py-3.5 font-bold hover:bg-emerald-50 transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                        View Work
                        <ArrowRight size={16} />
                    </a>
                    <a href="https://github.com/akashs101199" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/50 px-6 py-3.5 text-slate-300 hover:bg-slate-800 hover:text-white hover:border-emerald-500/50 transition-all">
                        <Github size={18} />
                        GitHub
                    </a>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                        { label: "Workloads", val: "200+" },
                        { label: "Daily Volume", val: "10M+" },
                        { label: "Cost Cut", val: "30%" },
                        { label: "Efficiency", val: "80%" }
                    ].map((stat, i) => (
                        <div key={i} className="border-l-2 border-slate-800 pl-4">
                            <div className="text-2xl font-bold text-white">{stat.val}</div>
                            <div className="text-xs text-slate-500 uppercase tracking-wider font-medium">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex-1 w-full max-w-md"
            >
                <SpotlightCard className="border-emerald-500/20 bg-gradient-to-br from-slate-900/80 to-slate-900/40">
                    <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                        <Activity className="text-emerald-400" size={20} />
                        <span className="font-mono text-sm text-emerald-300">SYSTEM_STATUS: OPTIMAL</span>
                    </div>
                    <div className="space-y-4 font-mono text-sm">
                        <div className="flex justify-between items-center">
                            <span className="text-slate-400">GenAI Core</span>
                            <span className="text-emerald-400">ONLINE</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "92%" }}
                                transition={{ duration: 1.5, delay: 0.5 }}
                                className="h-full bg-emerald-500"
                            />
                        </div>

                        <div className="flex justify-between items-center mt-4">
                            <span className="text-slate-400">Data Pipeline</span>
                            <span className="text-blue-400">PROCESSING</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "78%" }}
                                transition={{ duration: 1.5, delay: 0.7 }}
                                className="h-full bg-blue-500"
                            />
                        </div>

                        <div className="mt-6 p-3 bg-black/30 rounded border border-white/5 text-xs text-slate-400">
                            <p>&gt; Initializing Agent Swarm...</p>
                            <p>&gt; Connecting to AWS Bedrock...</p>
                            <p className="text-emerald-400">&gt; Connection Established.</p>
                        </div>
                    </div>
                </SpotlightCard>
            </motion.div>
        </section>
    );
};

const Skills = () => {
    const skills = [
        "AWS Glue", "Redshift", "S3 / Athena", "Lambda", "Bedrock / GenAI",
        "LangChain", "Python", "SQL", "Spark Streaming",
        "Kafka", "Airflow", "dbt", "Great Expectations", "LLMOps",
        "Docker", "Tableau", "OAuth 2.0"
    ];

    return (
        <section id="skills" className="mx-auto max-w-7xl px-4 py-12 md:px-8">
            <div className="flex flex-wrap gap-3 justify-center">
                {skills.map((skill, i) => (
                    <motion.div
                        key={skill}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(52, 211, 153, 0.1)" }}
                        className="px-4 py-2 rounded-full border border-slate-700 bg-slate-800/30 text-sm text-slate-300 cursor-default hover:border-emerald-500/50 transition-colors"
                    >
                        {skill}
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

const Projects = () => {
    const projects = [
        {
            title: "Agentic Data Engineering Platform",
            tag: "AI Product",
            color: "emerald",
            desc: "Open-source ETL platform with AI-powered agents for autonomous data profiling, cleaning, and optimization.",
            stats: ["Medallion Architecture", "Auto-Remediation"],
            stack: ["Polars", "DuckDB", "Prefect"],
            githubUrl: "https://github.com/akashs101199/agentic-data-engineering-platform"
        },
        {
            title: "Intelligent ATS System",
            tag: "AI Product",
            color: "blue",
            desc: "Multi-agent ATS using semantic matching and LLM reasoning for Agentic AI role evaluation.",
            stats: ["Semantic Matching", "Multi-Agent"],
            stack: ["LangChain", "Qdrant", "FastAPI"],
            githubUrl: "https://github.com/akashs101199/open-source-intelligent-ats-system"
        },
        {
            title: "Ask My Code - GenAI",
            tag: "AI Product",
            color: "purple",
            desc: "Conversational AI assistant for code exploration using RAG architecture and semantic search.",
            stats: ["RAG Architecture", "Privacy-First"],
            stack: ["Mistral", "ChromaDB", "LangChain"],
            githubUrl: "https://github.com/akashs101199/ask-my-code-gen-ai"
        },
        {
            title: "AI Scheduler Chat Bot",
            tag: "AI Product",
            color: "orange",
            desc: "Intelligent scheduling assistant with natural language understanding and Google Calendar integration.",
            stats: ["Multi-Model Support", "OAuth 2.0"],
            stack: ["FastAPI", "Mistral", "Google API"],
            githubUrl: "https://github.com/akashs101199/Ai-Scheduler-Chat-Bot"
        },
        {
            title: "Banking Customer Service Agent",
            tag: "AI Product",
            color: "cyan",
            desc: "Autonomous banking system with AI agents handling accounts, transactions, and compliance.",
            stats: ["CrewAI Integration", "Fraud Detection"],
            stack: ["LangGraph", "PostgreSQL", "Ollama"],
            githubUrl: "https://github.com/akashs101199/banking-customer-service-agent"
        }
    ];

    return (
        <section id="projects" className="mx-auto max-w-7xl px-4 py-20 md:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-12"
            >
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-slate-700"></div>
                <h2 className="text-3xl font-bold text-white">Featured Projects</h2>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-slate-700"></div>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
                {projects.map((p, i) => {
                    let iconColorClasses = '';

                    if (p.color === 'emerald') {
                        iconColorClasses = 'bg-emerald-500/10 text-emerald-400';
                    } else if (p.color === 'blue') {
                        iconColorClasses = 'bg-blue-500/10 text-blue-400';
                    } else if (p.color === 'purple') {
                        iconColorClasses = 'bg-purple-500/10 text-purple-400';
                    } else if (p.color === 'orange') {
                        iconColorClasses = 'bg-orange-500/10 text-orange-400';
                    } else if (p.color === 'cyan') {
                        iconColorClasses = 'bg-cyan-500/10 text-cyan-400';
                    }

                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                        >
                            <SpotlightCard className="h-full flex flex-col">
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`p-2 rounded-lg ${iconColorClasses}`}>
                                        <Database size={20} />
                                    </div>
                                    <span className="text-xs font-mono text-slate-500 border border-slate-700 px-2 py-1 rounded">
                                        {p.tag}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-2">{p.title}</h3>
                                <p className="text-slate-400 text-sm mb-6 flex-grow">{p.desc}</p>

                                <div className="space-y-3 mb-6">
                                    {p.stats.map((stat, j) => (
                                        <div key={j} className="flex items-center gap-2 text-xs text-slate-300">
                                            <CheckCircle size={12} className="text-emerald-400" />
                                            {stat}
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5 mb-4">
                                    {p.stack.map(s => (
                                        <span key={s} className="text-[10px] text-slate-400 bg-slate-800/50 px-2 py-1 rounded">
                                            {s}
                                        </span>
                                    ))}
                                </div>

                                <a
                                    href={p.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white hover:border-emerald-500/50 transition-all mt-auto"
                                >
                                    <Github size={16} />
                                    View on GitHub
                                </a>
                            </SpotlightCard>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
};

const Experience = () => {
    return (
        <section id="experience" className="mx-auto max-w-7xl px-4 py-20 md:px-8">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Career Timeline</h2>

            <div className="relative max-w-3xl mx-auto">
                <div className="absolute left-0 md:left-1/2 h-full w-px bg-slate-800 -translate-x-1/2"></div>

                {[
                    {
                        role: "Data & AI Engineer",
                        company: "Onedata Software Solutions",
                        period: "2025 - Present",
                        desc: "Leading GenAI initiatives and cloud modernization.",
                        side: "left"
                    },
                    {
                        role: "Data Engineer",
                        company: "Hexaware Technologies",
                        period: "2021 - 2023",
                        desc: "Migrated 200+ SQL workloads to AWS. Built real-time pipelines.",
                        side: "right"
                    },
                    {
                        role: "Prompt Engineer",
                        company: "Handshake",
                        period: "2025 - Present",
                        desc: "Optimizing LLM accuracy and prompt libraries.",
                        side: "left"
                    }
                ].map((exp, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: exp.side === 'left' ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className={`relative flex items-center justify-between md:justify-normal mb-8 ${exp.side === 'right' ? 'md:flex-row-reverse' : ''}`}
                    >
                        <div className="hidden md:block w-5/12"></div>
                        <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-emerald-500 border-4 border-[#0B1020] -translate-x-1/2 z-10"></div>
                        <div className="w-full md:w-5/12 pl-8 md:pl-0 md:px-8">
                            <SpotlightCard className="p-4">
                                <span className="text-xs text-emerald-400 font-mono mb-1 block">{exp.period}</span>
                                <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                                <div className="text-slate-400 text-sm mb-2">{exp.company}</div>
                                <p className="text-slate-500 text-xs">{exp.desc}</p>
                            </SpotlightCard>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

const Contact = () => {
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [submitStatus, setSubmitStatus] = React.useState(null); // 'success' | 'error' | null

    const contactMethods = [
        {
            icon: Mail,
            label: "Email",
            value: "akashs101199@gmail.com",
            href: "mailto:akashs101199@gmail.com",
            color: "emerald"
        },
        {
            icon: Github,
            label: "GitHub",
            value: "akashs101199",
            href: "https://github.com/akashs101199",
            color: "purple"
        },
        {
            icon: Linkedin,
            label: "LinkedIn",
            value: "akash101199",
            href: "https://www.linkedin.com/in/akash101199/",
            color: "blue"
        },
        {
            icon: MapPin,
            label: "Location",
            value: "Cary, NC",
            href: "https://www.google.com/maps/place/Cary,+NC",
            color: "orange"
        }
    ];

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmitStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="mx-auto max-w-6xl px-4 py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
            >
                <h2 className="text-3xl font-bold text-white mb-4">Let's Connect</h2>
                <p className="text-slate-400 max-w-2xl mx-auto">
                    I'm currently available for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
                {contactMethods.map((method, i) => {
                    const IconComponent = method.icon;
                    let colorClasses = '';

                    if (method.color === 'emerald') {
                        colorClasses = 'bg-emerald-500/10 text-emerald-400';
                    } else if (method.color === 'purple') {
                        colorClasses = 'bg-purple-500/10 text-purple-400';
                    } else if (method.color === 'blue') {
                        colorClasses = 'bg-blue-500/10 text-blue-400';
                    } else if (method.color === 'orange') {
                        colorClasses = 'bg-orange-500/10 text-orange-400';
                    }

                    return (
                        <motion.a
                            key={i}
                            href={method.href}
                            target={method.href.startsWith('http') ? '_blank' : undefined}
                            rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            className="block"
                        >
                            <SpotlightCard className="text-center p-6 hover:border-emerald-500/50 transition-all h-full">
                                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${colorClasses} mb-4`}>
                                    <IconComponent size={24} />
                                </div>
                                <h3 className="text-white font-bold mb-2">{method.label}</h3>
                                <p className="text-slate-400 text-sm break-all">{method.value}</p>
                            </SpotlightCard>
                        </motion.a>
                    );
                })}
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-start">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <SpotlightCard className="p-8 border-emerald-500/30 h-full flex flex-col justify-center">
                        <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-1">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                    placeholder="Your Name"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-1">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                    placeholder="your@email.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-1">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="4"
                                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                                    placeholder="How can I help you?"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 font-bold text-slate-900 hover:bg-emerald-400 transition-all hover:scale-[1.02] shadow-lg shadow-emerald-500/25 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {isSubmitting ? (
                                    <>Processing...</>
                                ) : (
                                    <>
                                        <Mail size={18} />
                                        Send Message
                                    </>
                                )}
                            </button>

                            {submitStatus === 'success' && (
                                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-sm text-center">
                                    Message sent successfully! I'll get back to you soon.
                                </div>
                            )}
                            {submitStatus === 'error' && (
                                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center">
                                    Something went wrong. Please try again or email me directly.
                                </div>
                            )}
                        </form>
                    </SpotlightCard>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="h-full"
                >
                    <SpotlightCard className="p-8 border-emerald-500/30 h-full flex flex-col justify-center items-center text-center">
                        <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Prefer to Call?</h3>
                        <p className="text-slate-400 mb-8">
                            I'm available for calls during business hours. Feel free to reach out directly if you prefer a conversation.
                        </p>
                        <a
                            href="tel:+18576938403"
                            className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/50 px-8 py-4 text-lg text-slate-300 hover:bg-slate-800 hover:text-white hover:border-emerald-500/50 transition-all w-full justify-center"
                        >
                            (857) 693-8403
                        </a>
                    </SpotlightCard>
                </motion.div>
            </div>
        </section>
    );
};

const Footer = () => (
    <footer className="border-t border-slate-800 bg-[#0B1020] py-8 text-center text-slate-500 text-sm">
        <div className="flex justify-center gap-6 mb-4">
            <a href="https://github.com/akashs101199" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/akash101199/" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                <Linkedin size={20} />
            </a>
        </div>
        <p>© {new Date().getFullYear()} Akash Shanmuganathan. Built with React & Three.js.</p>
    </footer>
);

export default function App() {
    return (
        <div className="min-h-screen text-slate-200 selection:bg-emerald-500/30">
            <Scene />
            <Navbar />
            <main>
                <Hero />
                <Skills />
                <Projects />
                <Experience />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}
