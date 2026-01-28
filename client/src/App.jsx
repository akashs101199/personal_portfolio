import React, { useState, useEffect } from 'react';
import {
    Github, Linkedin, Mail, Download, ExternalLink,
    MapPin, Calendar, Server, Database, Brain,
    Globe, Terminal, Code, Cpu, Shield, ArrowRight,
    TrendingUp, Users, DollarSign, Award, CheckCircle,
    Briefcase, Layers, Target, Zap, Menu, X
} from 'lucide-react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import AboutSection from './components/AboutSection';
import ExpertiseSection from './components/ExpertiseSection';
import ExperienceTimeline from './components/ExperienceTimeline';
import ProjectsSection from './components/ProjectsSection';
import EducationSection from './components/EducationSection';
import CertificationsSection from './components/CertificationsSection';
import PhilosophySection from './components/PhilosophySection';
import ProfessionalHero from './components/ProfessionalHero';
import ScrollToTop from './components/ScrollToTop';
import CyberChat from './components/CyberChat';
import CyberCursor from './components/CyberCursor';

// --- Data (Extracted from Resume) ---


const SKILL_CATEGORIES = [
    {
        name: "AI & LLM Engineering",
        description: "Building production-grade autonomous agents and RAG systems.",
        icon: <Brain className="w-6 h-6 text-purple-600" />,
        skills: ["AWS Bedrock", "Claude 4.5", "MedGemma", "LangChain", "Multi-Agent Orchestration", "RAG Architecture", "Prompt Engineering", "MCP"]
    },
    {
        name: "Healthcare AI",
        description: "Ensuring interoperability and compliance in clinical tech.",
        icon: <Shield className="w-6 h-6 text-emerald-600" />,
        skills: ["Smart on FHIR", "HIPAA Compliance", "Clinical NLP", "HL7 Standards", "Revenue Cycle Mgmt", "EHR Integration"]
    },
    {
        name: "Cloud Architecture",
        description: "Designing resilient, cost-optimized distributed systems.",
        icon: <Server className="w-6 h-6 text-slate-600" />,
        skills: ["AWS Lambda", "Step Functions", "EventBridge", "S3", "DynamoDB", "Terraform", "Serverless"]
    },
    {
        name: "Data Engineering",
        description: "Architecting scalable data lakes and ETL pipelines.",
        icon: <Database className="w-6 h-6 text-blue-600" />,
        skills: ["AWS Glue", "Redshift", "PySpark", "Medallion Architecture", "Data Quality", "Apache Spark"]
    },
    {
        name: "Industry Domains",
        description: "Cross-industry AI implementation expertise across multiple verticals.",
        icon: <Globe className="w-6 h-6 text-sky-600" />,
        skills: ["MarTech Analytics", "FinTech Data Lakes", "Healthcare RCM", "Voice AI", "Enterprise Integrations", "Regulatory Compliance"]
    },
    {
        name: "Product Strategy",
        description: "Bridging technical execution with strategic business value.",
        icon: <Briefcase className="w-6 h-6 text-indigo-600" />,
        skills: ["0-to-1 Development", "Roadmapping", "Stakeholder Alignment", "Technical Demos", "Agile/Scrum"]
    }
];

const EXPERIENCE = [
    {
        role: "AI Engineer - AI Product Development & Strategy",
        company: "Onedata Software Solutions",
        location: "Fort Mill, SC",
        period: "Sep 2025 – Present",
        description: "Leading AI product development and enterprise client delivery. Driving strategy across Healthcare RCM and MarTech verticals.",
        sections: [
            {
                title: "Healthcare RCM AI Platform (0-to-1 Product Development)",
                points: [
                    "Leading full product lifecycle for Healthcare Revenue Cycle Management AI: conducting competitive analysis against Epic, Waystar, and Cerner, defining product strategy, and building business cases for stakeholder buy-in.",
                    "Building AI chatbot powered by Google MedGemma for clinical NLP capabilities: medical entity extraction, clinical reasoning, claims assistance, and healthcare-specific conversational AI to differentiate from rule-based competitors.",
                    "Architecting Smart on FHIR implementation enabling interoperability with any EHR system, designing API-first architecture for seamless healthcare data exchange and integration across provider networks.",
                    "Developing using Claude Code and Replit for rapid prototyping and iteration, championing AI-assisted development tools across engineering team to accelerate time-to-production by 40%.",
                    "Driving ideation-to-deployment workflow: pitch ideas, validate with POCs, conduct stakeholder demos, define roadmap, develop features, test, and deploy to production."
                ]
            },
            {
                title: "Speech-to-Speech Conversational Analytics (Enterprise Client Delivery)",
                points: [
                    "Architected and built 4-agent orchestration system (Query Planner, Data Retriever, Insight Generator, Visualizer) using AWS Bedrock Multi-Agent Collaboration with Claude Haiku 4.5, achieving 85% autonomous accuracy for marketing analytics.",
                    "Engineered speech-to-speech conversational AI interface with Amazon Nova Sonic, implementing bi-directional real-time audio streaming via SocketIO achieving sub-800ms latency for hands-free natural language marketing analytics.",
                    "Built Model Context Protocol (MCP) server with 5 specialized tools for autonomous schema discovery, SQL generation, and semantic retrieval with enterprise data governance and responsible AI practices.",
                    "Implemented enterprise RAG architecture with Bedrock Titan Embeddings, reducing hallucinations by 75% through semantic grounding; built evaluation frameworks to measure accuracy, latency, and hallucination rates.",
                    "Lead technical consultant for enterprise MarTech engagements: conducting discovery sessions, developing POCs, delivering technical demos, and translating AI architectures into quantifiable ROI for C-suite stakeholders."
                ]
            }
        ],
        stack: ["AWS Bedrock", "Claude 4.5", "MedGemma", "Smart on FHIR", "Nova Sonic", "LangChain"]
    },
    {
        role: "Software Engineer - Data Engineering & Client Delivery",
        company: "Hexaware Technologies",
        location: "Chennai, India",
        period: "Jan 2021 – Jul 2023",
        description: "Joined as Data Engineer delivering cloud migrations, ETL pipelines, and analytics solutions for Fortune 500 clients.",
        sections: [
            {
                title: "Key Contributions",
                points: [
                    "Delivered $180K annual cost savings by migrating 200+ SQL workloads from on-premises MySQL to AWS (RDS, Glue, Redshift), achieving 30% cost reduction and 45% performance improvement through query optimization.",
                    "Built ML training data pipelines with automated feature engineering and data preprocessing workflows supporting financial forecasting predictive models for enterprise clients.",
                    "Created automated Tableau dashboards for 21 QA teams tracking metrics across 15+ projects; conducted 15+ client-facing technical presentations demonstrating cross-functional collaboration skills."
                ]
            }
        ],
        stack: ["AWS Glue", "Redshift", "PySpark", "Tableau", "RDS"]
    }
];


const PROJECTS = [
    {
        title: "Personal Portfolio v2",
        description: "Futuristic, voice-activated portfolio built with React & Three.js. Features a cyberpunk aesthetic and real-time AI assistant.",
        tech: ["React", "Three.js", "Framer Motion", "Vite"],
        github: "https://github.com/akashs101199/personal_portfolio",
        demo: "https://akashs101199.github.io/personal_portfolio",
        featured: true
    },
    {
        title: "GCP Voice Banking Assistant",
        description: "Next-gen voice banking assistant using Vertex AI. Solves fraud & transactions autonomously with <200ms latency.",
        tech: ["Python", "Vertex AI", "BigQuery", "Cloud Speech"],
        github: "https://github.com/akashs101199/gcp-banking-personal-assistant",
        featured: true
    },
    {
        title: "AI Scheduler Chatbot",
        description: "Agentic scheduling assistant using LangChain. Integrates deeply with Google Calendar to resolve conflicts and book meetings.",
        tech: ["Python", "LangChain", "Google Calendar API", "OAuth2"],
        github: "https://github.com/akashs101199/Ai-Scheduler-Chat-Bot",
        featured: false
    },
    {
        title: "Ask-My-Code GenAI",
        description: "RAG-powered conversational code assistant. Chat with your codebase to generate documentation and understand logic.",
        tech: ["Python", "Mistral", "RAG", "Vector DB"],
        github: "https://github.com/akashs101199/ask-my-code-gen-ai",
        featured: false
    },
    {
        title: "Agentic Data Platform",
        description: "Open-source ETL platform using AI agents to autonomously profile, clean, and optimize data pipelines.",
        tech: ["HTML/Python", "AI Agents", "ETL", "Data Engineering"],
        github: "https://github.com/akashs101199/agentic-data-engineering-platform",
        featured: true
    },
    {
        title: "Intelligent ATS System",
        description: "Multi-agent recruiting system that analyzes candidates beyond keywords using semantic understanding and reasoning.",
        tech: ["Python", "Multi-Agent Systems", "NLP"],
        github: "https://github.com/akashs101199/open-source-intelligent-ats-system",
        featured: true
    }
];

const EDUCATION = [
    {
        degree: "Master of Science in Engineering Management",
        school: "Northeastern University",
        location: "Boston, MA",
        period: "Sep 2023 – May 2025",
        desc: "Focus: AI Product Management, Technology Strategy, Data-Driven Decision Making. GPA: 3.75/4.0.",
        gpa: "3.75"
    },
    {
        degree: "Bachelor of Engineering in Electrical & Electronics",
        school: "Anna University",
        location: "Chennai, India",
        period: "Jun 2017 – May 2021",
        desc: "Foundation in Signal Processing, Control Systems, and Programming Fundamentals.",
        gpa: ""
    }
];

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-slate-200 shadow-sm">
            <div className="h-24 flex items-center justify-between px-6 md:px-12 lg:px-20">
                <div className="text-2xl font-bold tracking-tight text-slate-900" style={{ fontFamily: 'var(--font-heading)' }}>
                    Akash<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">.Shanmuganathan</span>
                </div>

                {/* Desktop Navigation Links */}
                <div className="hidden xl:flex gap-10 text-sm font-semibold">
                    {[
                        { name: 'About', href: '#about' },
                        { name: 'Expertise', href: '#expertise' },
                        { name: 'Experience', href: '#experience' },
                        { name: 'Projects', href: '#projects' },
                        { name: 'Education', href: '#education' },
                        { name: 'Contact', href: '#contact' }
                    ].map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className="text-slate-600 hover:text-indigo-600 transition-colors relative group"
                        >
                            {item.name}
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
                        </a>
                    ))}
                </div>

                {/* Desktop Action Buttons */}
                <div className="hidden xl:flex items-center gap-4">
                    <a
                        href="/portfolio.pdf"
                        download
                        className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-slate-200 text-slate-700 text-sm font-semibold rounded-lg hover:border-indigo-300 hover:text-indigo-700 transition-all shadow-sm"
                    >
                        <Briefcase size={16} />
                        <span>Portfolio</span>
                    </a>
                    <a
                        href="/resume.pdf"
                        download
                        className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-slate-200 text-slate-700 text-sm font-semibold rounded-lg hover:border-indigo-300 hover:text-indigo-700 transition-all shadow-sm"
                    >
                        <Download size={16} />
                        <span>Resume</span>
                    </a>
                    <a
                        href="mailto:akashs101199@gmail.com"
                        className="flex items-center gap-2 px-4 py-2 gradient-blue text-white text-sm font-semibold rounded-lg hover:shadow-lg transition-all"
                    >
                        <Mail size={16} />
                        <span>Contact</span>
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="xl:hidden p-2 text-slate-600 hover:text-indigo-600"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="xl:hidden bg-white border-b border-slate-200 overflow-hidden"
                    >
                        <div className="flex flex-col p-6 gap-4">
                            {[
                                { name: 'About', href: '#about' },
                                { name: 'Expertise', href: '#expertise' },
                                { name: 'Experience', href: '#experience' },
                                { name: 'Projects', href: '#projects' },
                                { name: 'Education', href: '#education' },
                                { name: 'Contact', href: '#contact' }
                            ].map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-lg font-medium text-slate-700 hover:text-indigo-600"
                                >
                                    {item.name}
                                </a>
                            ))}
                            <div className="flex flex-col gap-4 mt-4 pt-4 border-t border-slate-100">
                                <a
                                    href="/portfolio.pdf"
                                    download
                                    className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl"
                                >
                                    <Briefcase size={18} /> Download Portfolio
                                </a>
                                <div className="flex gap-4">
                                    <a
                                        href="/resume.pdf"
                                        download
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl"
                                    >
                                        <Download size={18} /> Resume
                                    </a>
                                    <a
                                        href="mailto:akashs101199@gmail.com"
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white font-semibold rounded-xl"
                                    >
                                        <Mail size={18} /> Contact
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default function App() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div className="min-h-screen bg-[#fafafa] selection:bg-blue-100 selection:text-blue-900">
            {/* Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 origin-left z-[100]"
                style={{ scaleX }}
            />

            <CyberCursor />
            <CyberChat />

            <Navbar />

            <main>
                {/* Hero Section */}
                <ProfessionalHero />

                {/* Technical Arsenal (Expertise) */}
                <ExpertiseSection categories={SKILL_CATEGORIES} />

                {/* Interactive Experience Timeline */}
                <ExperienceTimeline experience={EXPERIENCE} />

                {/* Projects Section */}
                <ProjectsSection projects={PROJECTS} />

                {/* Academic Background */}
                <EducationSection education={EDUCATION} />

                {/* Certifications */}
                <CertificationsSection />

                {/* Philosophy / Why Work With Me */}
                <PhilosophySection />

                {/* CTA Section */}
                <section className="py-24 bg-slate-900 text-white">
                    <div className="container-pro text-center max-w-3xl">
                        <h2 className="text-4xl font-bold mb-6">Ready to Accelerate Your AI Strategy?</h2>
                        <p className="text-slate-300 text-lg mb-12">
                            I bring a unique combination of technical depth in Generative AI and business acumen in product management.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-6">
                            <a href="mailto:akashs101199@gmail.com" className="flex items-center justify-center gap-3 px-8 py-4 bg-white text-slate-900 rounded-xl font-bold hover:bg-blue-50 transition-colors">
                                <Mail size={20} /> Email Me
                            </a>
                            <a href="https://linkedin.com/in/akash101199" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 px-8 py-4 bg-transparent border border-slate-700 text-white rounded-xl font-bold hover:border-slate-500 transition-colors">
                                <Linkedin size={20} /> LinkedIn
                            </a>
                        </div>
                        <footer className="mt-20 pt-8 border-t border-slate-800 text-slate-500 text-sm">
                            © 2026 Akash Shanmuganathan. All Rights Reserved.
                        </footer>
                    </div>
                </section>
            </main>
        </div>
    );
}
