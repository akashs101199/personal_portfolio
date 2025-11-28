import React, { useState, useEffect, useRef, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Float, Text, Stars } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import {
    Github, Linkedin, Mail, Download, ExternalLink,
    Database, Shield, Zap, Code, Layout, BarChart,
    Activity, CheckCircle, ArrowRight, Terminal, Server, Cpu,
    Briefcase, Calendar, MapPin, Layers, Globe, Radio, MessageSquare, X, Send
} from 'lucide-react';

// --- Assets & Data ---
const SKILLS = [
    "Claude", "AWS Bedrock", "LangChain", "LangGraph", "CrewAI", "MCP",
    "AgentCore", "RAG", "Prompt Eng", "Pinecone", "ChromaDB", "FAISS",
    "OpenSearch", "Python", "TypeScript", "Node.js", "React", "FastAPI",
    "SQL", "Cursor", "Copilot", "AWS Glue", "PySpark", "ETL",
    "AWS CDK", "Docker", "RDS", "DynamoDB", "S3", "CI/CD",
    "Medallion Arch", "AppFlow", "Vector DB", "GenAI"
];

// --- 3D Components ---
const WarpTunnel = () => {
    const ref = useRef();
    const { viewport, mouse } = useThree();
    // Create a long tunnel of points
    const [positions] = useState(() => {
        const pos = new Float32Array(2000 * 3);
        for (let i = 0; i < 2000; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 50;     // x
            pos[i * 3 + 1] = (Math.random() - 0.5) * 50; // y
            pos[i * 3 + 2] = (Math.random() - 0.5) * 200; // z (depth)
        }
        return pos;
    });

    useFrame((state, delta) => {
        if (ref.current) {
            // Move points towards camera to create warp effect
            const positions = ref.current.geometry.attributes.position.array;
            for (let i = 0; i < 2000; i++) {
                positions[i * 3 + 2] += 0.5; // Speed
                if (positions[i * 3 + 2] > 10) {
                    positions[i * 3 + 2] = -200; // Reset to back
                }
            }
            ref.current.geometry.attributes.position.needsUpdate = true;

            // Rotate tunnel based on mouse
            ref.current.rotation.z += delta * 0.1;
            const x = (mouse.x * viewport.width) / 50;
            const y = (mouse.y * viewport.height) / 50;
            ref.current.rotation.x = -y * 0.2;
            ref.current.rotation.y = x * 0.2;
        }
    });

    return (
        <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#f472b6"
                size={0.15}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.4}
            />
        </Points>
    );
};

const SkillWord = ({ word, position, color }) => {
    const ref = useRef();
    const [hovered, setHovered] = useState(false);

    useFrame(({ camera }) => {
        ref.current.quaternion.copy(camera.quaternion);
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <Text
                ref={ref}
                position={position}
                fontSize={hovered ? 1.2 : 0.7}
                color={hovered ? "#facc15" : (color || "#22d3ee")} // Yellow hover, else prop/default
                anchorX="center"
                anchorY="middle"
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                {word}
            </Text>
        </Float>
    );
};

const Hexagon = ({ position, color, word }) => {
    const ref = useRef();
    const [hovered, setHovered] = useState(false);

    useFrame((state, delta) => {
        // Pulse effect
        if (hovered) {
            ref.current.position.z = THREE.MathUtils.lerp(ref.current.position.z, 0.5, 0.1);
        } else {
            ref.current.position.z = THREE.MathUtils.lerp(ref.current.position.z, 0, 0.1);
        }
    });

    return (
        <group position={position}>
            <mesh
                ref={ref}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                rotation={[Math.PI / 2, 0, 0]} // Rotate to face camera
            >
                <cylinderGeometry args={[1, 1, 0.2, 6]} />
                <meshStandardMaterial
                    color={hovered ? "#f472b6" : "#1e293b"}
                    emissive={hovered ? "#f472b6" : "#000000"}
                    emissiveIntensity={hovered ? 2 : 0}
                    transparent
                    opacity={0.9}
                    wireframe={!hovered}
                />
            </mesh>
            <Text
                position={[0, 0, 0.3]} // Slightly in front of hex
                fontSize={0.35}
                color={hovered ? "#000000" : color}
                anchorX="center"
                anchorY="middle"
                maxWidth={1.8}
                textAlign="center"
            >
                {word}
            </Text>
        </group>
    );
};

const SkillHexGrid = () => {
    const groupRef = useRef();

    // Calculate hex grid positions
    const hexes = useMemo(() => {
        const items = [];
        const radius = 1.8; // Spacing
        let count = 0;

        // Spiral algorithm for hex grid
        // Center
        if (count < SKILLS.length) items.push({ x: 0, y: 0, word: SKILLS[count++], color: "#22d3ee" });

        let layer = 1;
        while (count < SKILLS.length) {
            for (let i = 0; i < 6; i++) { // 6 sides
                // Move in direction i
                let cx = Math.cos(i * Math.PI / 3) * radius * layer;
                let cy = Math.sin(i * Math.PI / 3) * radius * layer;

                // Fill edge
                for (let j = 0; j < layer; j++) {
                    if (count >= SKILLS.length) break;

                    // Interpolate along edge for larger layers
                    // Simplified: Just placing in rings for now to ensure stability
                    // Actually, let's use a simpler ring placement for visual clarity
                }
            }
            // Simple Ring placement fallback to ensure it looks good without complex hex math debugging
            const itemsInLayer = layer * 6;
            for (let i = 0; i < itemsInLayer; i++) {
                if (count >= SKILLS.length) break;
                const angle = (i / itemsInLayer) * Math.PI * 2;
                const x = Math.cos(angle) * radius * layer;
                const y = Math.sin(angle) * radius * layer;
                items.push({
                    x, y,
                    word: SKILLS[count++],
                    color: layer % 2 === 0 ? "#f472b6" : "#22d3ee"
                });
            }
            layer++;
        }
        return items;
    }, []);

    useFrame((state) => {
        if (groupRef.current) {
            // Gentle floating
            groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
        }
    });

    return (
        <group ref={groupRef} rotation={[0, 0, 0]}>
            {hexes.map((hex, i) => (
                <Hexagon
                    key={i}
                    position={[hex.x, hex.y, 0]}
                    color={hex.color}
                    word={hex.word}
                />
            ))}
        </group>
    );
};

const Scene = () => (
    <div className="fixed inset-0 z-[-1] bg-[#050505]">
        <Canvas camera={{ position: [0, 0, 15], fov: 50 }} dpr={[1, 2]}>
            <fog attach="fog" args={['#050505', 5, 50]} />
            <ambientLight intensity={2} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <WarpTunnel />
            <SkillHexGrid />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </Canvas>
    </div>
);

// --- UI Components ---


const GlitchText = ({ text, className, color = "text-cyan-400" }) => {
    return (
        <div className={`relative group inline-block ${className}`}>
            <span className={`relative z-10 ${color}`}>{text}</span>
            <span className="absolute top-0 left-0 -z-10 w-full h-full text-pink-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-[3px] group-hover:translate-y-[1px] transition-all duration-75 select-none">{text}</span>
            <span className="absolute top-0 left-0 -z-10 w-full h-full text-yellow-400 opacity-0 group-hover:opacity-100 group-hover:-translate-x-[3px] group-hover:-translate-y-[1px] transition-all duration-75 select-none">{text}</span>
        </div>
    );
};

const Navbar = () => (
    <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10 py-4">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <div className="flex items-center gap-3 interactive group">
                <div className="w-10 h-10 bg-black border border-cyan-500 flex items-center justify-center text-cyan-400 font-bold font-mono group-hover:bg-cyan-500 group-hover:text-black transition-colors">AS</div>
                <GlitchText text="AKASH.SYS" className="font-mono font-bold text-lg tracking-widest" color="text-white" />
            </div>
            <nav className="hidden md:flex items-center gap-8">
                {['About', 'Certifications', 'Education', 'Skills', 'Experience', 'Projects'].map((item) => (
                    <a
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        className="text-sm font-mono text-slate-400 hover:text-cyan-400 transition-colors relative group"
                    >
                        {item}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-500 transition-all group-hover:w-full" />
                    </a>
                ))}
                <a
                    href="/resume.pdf"
                    download="Akash_Shanmuganathan_Resume.pdf"
                    className="flex items-center gap-2 text-sm font-mono text-cyan-400 hover:text-pink-500 transition-colors group"
                >
                    <Download size={16} />
                    <span className="relative">
                        RESUME_FILE
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-500 transition-all group-hover:w-full" />
                    </span>
                </a>
            </nav>
            <a href="#contact" className="interactive px-6 py-2 bg-cyan-500 text-black font-bold font-mono text-sm hover:bg-pink-500 hover:text-white transition-colors clip-path-polygon">
                INITIATE_CONTACT
            </a>
        </div>
    </header>
);

const Hero = () => (
    <section className="min-h-screen flex items-center pt-20 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink-500/10 border border-pink-500/50 text-pink-400 text-xs font-mono mb-6">
                    <Radio size={12} className="animate-pulse" />
                    <span>NET_RUNNER_ONLINE</span>
                </div>
                <h1 className="text-6xl md:text-8xl font-black mb-6 leading-none tracking-tighter text-white">
                    AGENTIC <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-400 animate-gradient">ARCHITECT</span>
                </h1>
                <p className="text-slate-400 text-lg mb-8 max-w-lg font-mono border-l-2 border-cyan-500 pl-4">
                    Constructing autonomous digital intelligences and resilient data infrastructures.
                    <br />
                    <span className="text-cyan-400">Target:</span> Production-Grade AI Systems.
                </p>
                <div className="flex gap-4">
                    <a href="#projects" className="interactive px-8 py-4 bg-white text-black font-black font-mono hover:bg-cyan-400 transition-colors clip-path-polygon">
                        ACCESS_PROJECTS
                    </a>
                    <a href="https://github.com/akashs101199" className="interactive px-8 py-4 border border-white text-white font-mono hover:bg-white hover:text-black transition-colors clip-path-polygon flex items-center gap-2">
                        <Github size={18} /> GITHUB
                    </a>
                </div>
            </motion.div>

            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} className="hidden md:block">
                <div className="bg-black/50 p-1 border border-cyan-500/50 relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-pink-500 opacity-30 blur group-hover:opacity-70 transition-opacity" />
                    <div className="relative bg-black p-8 border border-white/10">
                        <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                            <div className="flex items-center gap-2 text-cyan-400">
                                <Activity size={20} />
                                <span className="font-mono text-sm tracking-widest">SYSTEM_DIAGNOSTICS</span>
                            </div>
                            <div className="flex gap-1">
                                <div className="w-2 h-2 bg-pink-500 animate-ping" />
                                <div className="w-2 h-2 bg-pink-500" />
                            </div>
                        </div>
                        <div className="space-y-6 font-mono text-sm">
                            <div>
                                <div className="flex justify-between text-slate-400 mb-2">
                                    <span>NEURAL_LINK</span>
                                    <span className="text-cyan-400">OPTIMAL</span>
                                </div>
                                <div className="h-2 bg-slate-800 w-full">
                                    <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1.5 }} className="h-full bg-cyan-500" />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-slate-400 mb-2">
                                    <span>AGENT_SWARM</span>
                                    <span className="text-pink-400">DEPLOYING</span>
                                </div>
                                <div className="h-2 bg-slate-800 w-full">
                                    <motion.div initial={{ width: 0 }} animate={{ width: "85%" }} transition={{ duration: 1.5, delay: 0.2 }} className="h-full bg-pink-500" />
                                </div>
                            </div>
                            <div className="p-4 bg-cyan-900/10 border border-cyan-500/30 text-xs text-cyan-300 space-y-1">
                                <p>&gt; Establishing secure connection...</p>
                                <p>&gt; Loading vector embeddings...</p>
                                <p className="text-pink-400 animate-pulse">&gt; READY FOR INPUT_</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Tilt>
        </div>
    </section>
);

const Certifications = () => {
    const certs = [
        {
            name: "AWS Certified Data Engineer",
            level: "Associate (DEA-C01)",
            logo: "/img/images-dataengineer.png",
            color: "orange"
        },
        {
            name: "AWS Certified Gen AI Developer",
            level: "Professional (In Progress)",
            logo: "/img/images-genAI.jpeg",
            color: "purple"
        }
    ];

    return (
        <section id="certifications" className="py-20 px-6 max-w-7xl mx-auto relative">
            <h2 className="text-4xl font-black text-white mb-4 flex items-center gap-4">
                <span className="w-4 h-12 bg-emerald-500 animate-pulse" />
                <GlitchText text="CREDENTIALS" color="text-white" />
                <span className="text-xs text-emerald-400 font-mono ml-auto hidden md:block animate-pulse">
                    [ {certs.length} VERIFIED ]
                </span>
            </h2>
            <p className="text-slate-400 mb-12 max-w-2xl font-mono border-l-2 border-slate-700 pl-4">
                Industry-recognized certifications.
                <br />
                <span className="text-emerald-400 text-xs">// Validated by AWS</span>
            </p>

            <div className="grid md:grid-cols-2 gap-6">
                {certs.map((cert, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ scale: 1.02, y: -5 }}
                        className="relative group bg-black/50 border border-emerald-500/30 hover:border-emerald-500 transition-all backdrop-blur-sm overflow-hidden"
                    >
                        {/* Corner Brackets */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                        {/* Scanline */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                        <div className="p-8 flex items-center gap-6">
                            {/* Logo */}
                            <div className="shrink-0 w-24 h-24 bg-white rounded-lg p-2 flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-shadow">
                                <img
                                    src={cert.logo}
                                    alt={cert.name}
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            {/* Info */}
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-white font-mono group-hover:text-emerald-400 transition-colors mb-2">
                                    {cert.name}
                                </h3>
                                <p className="text-sm text-slate-400 font-mono mb-3">
                                    {cert.level}
                                </p>
                                <div className="flex items-center gap-2">
                                    <CheckCircle size={14} className="text-emerald-500" />
                                    <span className="text-xs text-emerald-400 font-mono">VERIFIED</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

const Skills = () => {
    const skillCategories = [
        { name: "GenAI & LLM", color: "cyan", skills: ["Claude", "AWS Bedrock", "LangChain", "LangGraph", "CrewAI", "MCP", "AgentCore", "RAG", "Prompt Eng"] },
        { name: "Vector DB", color: "pink", skills: ["Pinecone", "ChromaDB", "FAISS", "OpenSearch"] },
        { name: "Dev", color: "yellow", skills: ["Python", "TypeScript", "Node.js", "React", "FastAPI", "SQL", "Cursor", "Copilot"] },
        { name: "Data Eng", color: "purple", skills: ["AWS Glue", "PySpark", "ETL", "Medallion Arch", "AppFlow"] },
        { name: "Cloud Ops", color: "emerald", skills: ["AWS CDK", "Docker", "RDS", "DynamoDB", "S3", "CI/CD"] }
    ];

    const getColorClasses = (color) => {
        const colors = {
            cyan: "border-cyan-500/40 text-cyan-400 hover:border-cyan-500 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]",
            pink: "border-pink-500/40 text-pink-400 hover:border-pink-500 hover:shadow-[0_0_15px_rgba(244,114,182,0.3)]",
            yellow: "border-yellow-500/40 text-yellow-400 hover:border-yellow-500 hover:shadow-[0_0_15px_rgba(250,204,21,0.3)]",
            purple: "border-purple-500/40 text-purple-400 hover:border-purple-500 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]",
            emerald: "border-emerald-500/40 text-emerald-400 hover:border-emerald-500 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]"
        };
        return colors[color] || colors.cyan;
    };

    return (
        <section id="skills" className="py-20 relative overflow-hidden">
            {/* Animated Scanlines */}
            <div className="absolute inset-0 pointer-events-none opacity-10">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent animate-scan" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <h2 className="text-4xl font-black text-white mb-4 flex items-center gap-4">
                    <span className="w-4 h-12 bg-pink-500 animate-pulse" />
                    <GlitchText text="TECH_STACK" color="text-white" />
                    <span className="text-xs text-cyan-400 font-mono ml-auto hidden md:block animate-pulse">
                        [ {SKILLS.length} MODULES_LOADED ]
                    </span>
                </h2>
                <p className="text-slate-400 mb-12 max-w-2xl font-mono border-l-2 border-slate-700 pl-4">
                    Arsenal of tools for digital construction.
                    <br />
                    <span className="text-cyan-400 text-xs">// Hover to activate neural pathways</span>
                </p>

                <div className="space-y-8">
                    {skillCategories.map((category, catIndex) => (
                        <motion.div
                            key={category.name}
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: catIndex * 0.1 }}
                            className="relative"
                        >
                            {/* Category Header */}
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`w-2 h-2 bg-${category.color}-500 animate-pulse`} />
                                <h3 className="text-sm font-bold font-mono text-slate-500 tracking-widest">
                                    {category.name.toUpperCase()}
                                </h3>
                                <div className="flex-1 h-px bg-gradient-to-r from-slate-800 to-transparent" />
                            </div>

                            {/* Skills Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                                {category.skills.map((skill, i) => (
                                    <motion.div
                                        key={skill}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: (catIndex * 0.1) + (i * 0.02) }}
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        className={`
                                            relative group
                                            bg-black/50 border backdrop-blur-sm
                                            px-4 py-3 text-center font-mono text-sm
                                            transition-all cursor-default
                                            ${getColorClasses(category.color)}
                                        `}
                                    >
                                        {/* Corner Accents */}
                                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l opacity-0 group-hover:opacity-100 transition-opacity" style={{ borderColor: 'currentColor' }} />
                                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r opacity-0 group-hover:opacity-100 transition-opacity" style={{ borderColor: 'currentColor' }} />

                                        {skill}

                                        {/* Glitch overlay on hover */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer pointer-events-none" />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const ProjectCard = ({ project }) => (
    <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} className="h-full interactive">
        <div className="h-full bg-black border border-white/10 hover:border-cyan-500 transition-colors group relative overflow-hidden flex flex-col p-1">
            <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-white/10 to-transparent -mr-6 -mt-6 rotate-45 group-hover:from-cyan-500/20 transition-all" />

            <div className="p-6 flex flex-col h-full relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <div className={`p-3 bg-${project.color}-500/10 text-${project.color}-400 border border-${project.color}-500/20`}>
                        {project.icon || <Database size={24} />}
                    </div>
                    <span className="text-[10px] font-mono px-2 py-1 bg-white/5 text-slate-400 border border-white/10 tracking-wider">
                        {project.tag.toUpperCase()}
                    </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors font-mono">
                    {project.title}
                </h3>

                <p className="text-slate-400 text-sm mb-6 flex-grow font-mono leading-relaxed border-l-2 border-slate-800 pl-4 group-hover:border-pink-500 transition-colors">
                    {project.desc}
                </p>

                <div className="space-y-2 mb-6">
                    {project.stats.map((stat, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-300 font-mono">
                            <div className="w-1 h-1 bg-cyan-400" />
                            {stat}
                        </div>
                    ))}
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                    {project.stack.map(s => (
                        <span key={s} className="text-[10px] px-2 py-1 bg-slate-900 text-slate-400 border border-slate-800 font-mono group-hover:border-cyan-500/30 transition-colors">
                            {s}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    </Tilt>
);

const Projects = () => {
    const projects = [
        {
            title: "Banking Agent",
            tag: "Autonomous AI",
            color: "emerald",
            icon: <Shield size={24} />,
            desc: "Fully autonomous banking system handling accounts, transactions, and fraud detection without human intervention.",
            stats: ["Role-based Agents (CrewAI)", "Real-time Fraud Detection", "Secure JWT Auth"],
            stack: ["CrewAI", "LangGraph", "FastAPI", "PostgreSQL"]
        },
        {
            title: "Multi-Agent ATS",
            tag: "HR Tech",
            color: "blue",
            icon: <Cpu size={24} />,
            desc: "Sophisticated Applicant Tracking System using multiple AI agents to evaluate candidates beyond keywords.",
            stats: ["Resume Parsing Agent", "Semantic Matching", "Technical Evaluation"],
            stack: ["FastAPI", "Qdrant", "Ollama", "LangChain"]
        },
        {
            title: "Data Platform",
            tag: "Data Eng",
            color: "purple",
            icon: <Database size={24} />,
            desc: "Self-healing ETL pipeline where AI agents autonomously profile, clean, and optimize data flows.",
            stats: ["Auto-Remediation", "Medallion Architecture", "10x Faster (Polars)"],
            stack: ["DuckDB", "Polars", "Prefect", "Streamlit"]
        },
        {
            title: "Ask My Code",
            tag: "DevTool",
            color: "pink",
            icon: <Code size={24} />,
            desc: "RAG-powered coding assistant that lets you chat with your codebase to understand logic and dependencies.",
            stats: ["Semantic Code Search", "Local Inference", "Privacy First"],
            stack: ["Mistral", "LangChain", "ChromaDB", "Ollama"]
        },
        {
            title: "AI Scheduler",
            tag: "Productivity",
            color: "orange",
            icon: <Zap size={24} />,
            desc: "Intelligent scheduling assistant managing calendars via natural language with conflict detection.",
            stats: ["Google Calendar Sync", "Conflict Resolution", "Multi-Model Support"],
            stack: ["Python", "FastAPI", "Google API", "LangChain"]
        }
    ];

    return (
        <section id="projects" className="py-20 px-6 max-w-7xl mx-auto">
            <h2 className="text-4xl font-black text-white mb-12 flex items-center gap-4">
                <span className="w-4 h-12 bg-cyan-500" />
                <GlitchText text="DEPLOYED_SYSTEMS" color="text-white" />
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((p, i) => <ProjectCard key={i} project={p} />)}
            </div>
        </section>
    );
};

const Experience = () => {
    const experiences = [
        {
            role: "Agentic AI Engineer",
            company: "OneData Software Solutions",
            location: "Fort Mill, SC, US",
            period: "Jan 2025 – Present",
            tags: ["Advanced Tier AWS Partner"],
            desc: [
                "Conceptualized and architected full-stack conversational analytics platform from POC to production using AWS Bedrock, QuickSight, and S3 data lake with multimodal voice AI, reducing dashboard creation from 15 minutes to under 30 seconds for non-technical users",
                "Engineered bi-directional voice interface with Nova Sonic achieving sub-800ms latency supporting concurrent voice sessions for hands-free dashboard creation using natural language and exploration",
                "Engineered multimodal chatbot leveraging 4-agent orchestration system (query planner, data retriever, insight generator, visualization agent) to vectorize user queries and retrieve relevant context from proprietary data, enabling AI responses grounded in real-time marketing analytics",
                "Developed prompt engineering framework with chain-of-thought reasoning and few-shot learning achieving 85% accuracy in AI-generated insights, implementing guardrails and validation workflows to ensure production-grade reliability",
                "Engineered Model Protocol Server (MCP) integrated with S3 and QuickSight for schema discovery and data retrieval, enabling agents to autonomously explore and analyze multi-platform marketing data through natural language queries",
                "Architected observability infrastructure with custom CloudWatch dashboards monitoring multi-agent system latency, token usage, and agent-level success rates, implementing custom metrics for inter-agent communication",
                "Implemented RAG system with Bedrock Titan Embeddings and S3 vector database to semantically search and retrieve relevant context from proprietary data, enabling AI responses grounded in real-time marketing analytics"
            ]
        },
        {
            role: "Data Engineer",
            company: "Hexaware Technologies",
            location: "Chennai, India",
            period: "Jan 2021 – Jul 2023",
            tags: ["Cloud Migration", "Big Data", "Cost Optimization"],
            desc: [
                "Delivered $180K annual savings migrating 200+ SQL workloads from on-premises MySQL to AWS (RDS, Glue, Redshift) achieving 30% cost reduction and 45% performance improvement through optimized data partitioning and query rewriting",
                "Architected event-driven data processing pipelines using AWS Lambda, S3, and Kinesis to ingest real-time customer data with automated data quality checks, improving S3A adherence and reducing data incidents by 60%",
                "Optimized financial reporting by 60% through SQL query optimization and ETL redesign, reducing end-of-quarter processing from 5 hours to 2 hours and enabling faster business decisions",
                "Built automated Tableau dashboards for 21 QA teams tracking defect lifecycle metrics across 15+ projects, conducting 15+ client-facing technical presentations"
            ]
        },
        {
            role: "Data Analyst Intern",
            company: "Neo Technologies",
            location: "Chennai, India",
            period: "Sep 2019 – Jan 2021",
            tags: ["Analytics", "Automation", "COVID-19 Response"],
            desc: [
                "Engineered SQL queries, Excel macros, and data validation frameworks (Python) that eliminated 200+ recurring errors in COVID-19 reporting while collaborating with analysts to deliver real-time dashboards for pandemic response and decision-making"
            ]
        }
    ];

    return (
        <section id="experience" className="py-20 px-6 max-w-6xl mx-auto relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(90deg, #22d3ee 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }} />
            </div>

            <div className="relative z-10">
                <h2 className="text-4xl font-black text-white mb-4 flex items-center gap-4">
                    <span className="w-4 h-12 bg-yellow-400 animate-pulse" />
                    <GlitchText text="EXECUTION_LOG" color="text-white" />
                    <span className="text-xs text-yellow-400 font-mono ml-auto hidden md:block">
                        [ {experiences.length} DEPLOYMENTS ]
                    </span>
                </h2>
                <p className="text-slate-400 mb-12 max-w-2xl font-mono border-l-2 border-slate-700 pl-4">
                    Mission-critical systems delivered.
                    <br />
                    <span className="text-yellow-400 text-xs">// Click to expand full mission brief</span>
                </p>

                <div className="space-y-8">
                    {experiences.map((exp, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15 }}
                            className="relative group"
                        >
                            {/* Timeline Connector */}
                            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500 via-pink-500 to-yellow-400 opacity-30" />
                            <div className="absolute left-[-4px] top-8 w-2 h-2 bg-cyan-500 rotate-45 animate-pulse" />

                            {/* Card */}
                            <div className="ml-8 bg-black/50 border border-cyan-500/30 hover:border-cyan-500 transition-all backdrop-blur-sm relative overflow-hidden">
                                {/* Scanline effect */}
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                                {/* Corner Brackets */}
                                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className="p-8">
                                    {/* Header */}
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6 gap-4">
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-bold text-white font-mono group-hover:text-cyan-400 transition-colors mb-2">
                                                {exp.role}
                                            </h3>
                                            <div className="flex items-center gap-2 text-pink-400 font-mono text-sm mb-3">
                                                <Briefcase size={14} />
                                                <span>{exp.company}</span>
                                            </div>
                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-2">
                                                {exp.tags.map((tag, idx) => (
                                                    <span key={idx} className="text-[10px] px-2 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-start md:items-end gap-2 text-xs text-slate-500 font-mono shrink-0">
                                            <div className="flex items-center gap-2 bg-slate-900/50 px-3 py-1 border border-slate-800">
                                                <Calendar size={12} />
                                                <span>{exp.period}</span>
                                            </div>
                                            <div className="flex items-center gap-2 bg-slate-900/50 px-3 py-1 border border-slate-800">
                                                <MapPin size={12} />
                                                <span>{exp.location}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Achievements */}
                                    <ul className="space-y-3">
                                        {exp.desc.map((item, j) => (
                                            <motion.li
                                                key={j}
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: (i * 0.15) + (j * 0.05) }}
                                                className="flex items-start gap-3 text-slate-400 text-sm leading-relaxed font-mono group/item hover:text-cyan-300 transition-colors"
                                            >
                                                <span className="mt-1.5 text-cyan-500 text-[10px] shrink-0 group-hover/item:text-pink-500 transition-colors">&gt;&gt;</span>
                                                <span className="border-l-2 border-transparent group-hover/item:border-cyan-500/30 pl-3 transition-colors">{item}</span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Education = () => {
    const education = [
        {
            degree: "Master of Science in Engineering Management",
            specialization: "AI Product Management",
            school: "Northeastern University, Boston, MA",
            period: "2023 – May 2025",
            color: "purple"
        },
        {
            degree: "Bachelor of Engineering in Electrical and Electronics Engineering",
            specialization: "",
            school: "Anna University, Chennai, TN, India",
            period: "2017 – May 2021",
            color: "cyan"
        }
    ];

    return (
        <section id="education" className="py-20 px-6 max-w-7xl mx-auto relative">
            <h2 className="text-4xl font-black text-white mb-12 flex items-center gap-4">
                <span className="w-4 h-12 bg-pink-500" />
                <GlitchText text="EDUCATION_LOGS" color="text-white" />
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
                {education.map((edu, i) => (
                    <Tilt key={i} tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} className="h-full interactive">
                        <div className={`h-full bg-black/50 border border-${edu.color}-500/30 p-6 relative group overflow-hidden`}>
                            {/* Background Elements */}
                            <div className={`absolute top-0 right-0 w-24 h-24 bg-${edu.color}-500/10 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-${edu.color}-500/20 transition-all`} />

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`p-2 bg-${edu.color}-500/10 rounded-lg border border-${edu.color}-500/30`}>
                                        <Briefcase className={`text-${edu.color}-400`} size={24} />
                                    </div>
                                    <span className="text-xs font-mono text-slate-400 border border-slate-700 px-2 py-1 rounded">
                                        {edu.period}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                                    {edu.degree}
                                </h3>
                                {edu.specialization && (
                                    <p className={`text-sm text-${edu.color}-400 font-mono mb-2`}>
                                        {edu.specialization}
                                    </p>
                                )}
                                <p className="text-slate-400 text-sm flex items-center gap-2">
                                    <MapPin size={14} />
                                    {edu.school}
                                </p>
                            </div>

                            {/* Hover Effect Line */}
                            <div className={`absolute bottom-0 left-0 w-0 h-0.5 bg-${edu.color}-500 transition-all duration-500 group-hover:w-full`} />
                        </div>
                    </Tilt>
                ))}
            </div>
        </section>
    );
};

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error
    const API_URL = import.meta.env.VITE_API_URL || '';

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        try {
            const res = await fetch(`${API_URL}/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch (err) {
            setStatus('error');
        }
    };

    const contactMethods = [
        {
            icon: Mail,
            label: "EMAIL_UPLINK",
            value: "akashs101199@gmail.com",
            href: "mailto:akashs101199@gmail.com",
            color: "cyan"
        },
        {
            icon: Github,
            label: "GITHUB_REPO",
            value: "akashs101199",
            href: "https://github.com/akashs101199",
            color: "pink"
        },
        {
            icon: Linkedin,
            label: "LINKEDIN_NET",
            value: "akash101199",
            href: "https://www.linkedin.com/in/akash101199/",
            color: "blue"
        },
        {
            icon: MapPin,
            label: "GEO_COORDS",
            value: "Cary, NC",
            href: "https://www.google.com/maps/place/Cary,+NC",
            color: "yellow"
        }
    ];

    return (
        <section id="contact" className="py-20 px-6 max-w-7xl mx-auto relative">
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/20 via-transparent to-transparent" />
            </div>

            <h2 className="text-4xl font-black text-white mb-12 flex items-center gap-4">
                <span className="w-4 h-12 bg-pink-500 animate-pulse" />
                <GlitchText text="INITIATE_UPLINK" color="text-white" />
            </h2>

            <div className="grid md:grid-cols-2 gap-12">
                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="bg-black/50 border border-slate-800 p-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-50 transition-opacity">
                            <Terminal size={100} />
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-6 font-mono flex items-center gap-2">
                            <span className="text-cyan-400">&gt;</span> TRANSMIT_MESSAGE
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                            <div>
                                <label className="block text-xs font-mono text-cyan-400 mb-2">IDENTIFIER_NAME</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-slate-900/50 border border-slate-700 p-3 text-white font-mono focus:border-cyan-500 focus:outline-none transition-colors"
                                    placeholder="ENTER_NAME"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-mono text-cyan-400 mb-2">CONTACT_FREQUENCY</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-slate-900/50 border border-slate-700 p-3 text-white font-mono focus:border-cyan-500 focus:outline-none transition-colors"
                                    placeholder="ENTER_EMAIL"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-mono text-cyan-400 mb-2">DATA_PACKET</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="4"
                                    className="w-full bg-slate-900/50 border border-slate-700 p-3 text-white font-mono focus:border-cyan-500 focus:outline-none transition-colors resize-none"
                                    placeholder="ENTER_MESSAGE_CONTENT"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'submitting'}
                                className="w-full bg-cyan-500 text-black font-bold font-mono py-4 hover:bg-pink-500 hover:text-white transition-all clip-path-polygon disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {status === 'submitting' ? (
                                    <>PROCESSING_TRANSMISSION...</>
                                ) : (
                                    <>SEND_TRANSMISSION <ArrowRight size={16} /></>
                                )}
                            </button>

                            {status === 'success' && (
                                <div className="p-4 bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 font-mono text-sm">
                                    &gt; TRANSMISSION_SUCCESSFUL. STANDBY_FOR_RESPONSE.
                                </div>
                            )}
                            {status === 'error' && (
                                <div className="p-4 bg-red-500/10 border border-red-500/50 text-red-400 font-mono text-sm">
                                    &gt; ERROR: TRANSMISSION_FAILED. RETRY_INITIATED.
                                </div>
                            )}
                        </form>
                    </div>
                </motion.div>

                {/* Contact Info */}
                <div className="space-y-6">
                    {contactMethods.map((method, i) => (
                        <motion.a
                            key={i}
                            href={method.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="block group"
                        >
                            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02}>
                                <div className={`bg-black/50 border border-slate-800 p-6 flex items-center gap-6 hover:border-${method.color}-500 transition-colors group-hover:shadow-[0_0_20px_rgba(var(--${method.color}-500-rgb),0.2)]`}>
                                    <div className={`w-12 h-12 bg-${method.color}-500/10 flex items-center justify-center text-${method.color}-400 group-hover:bg-${method.color}-500 group-hover:text-black transition-all`}>
                                        <method.icon size={24} />
                                    </div>
                                    <div>
                                        <div className={`text-xs font-mono text-${method.color}-400 mb-1`}>{method.label}</div>
                                        <div className="text-white font-bold tracking-wide">{method.value}</div>
                                    </div>
                                    <ExternalLink size={16} className="ml-auto text-slate-600 group-hover:text-white transition-colors" />
                                </div>
                            </Tilt>
                        </motion.a>
                    ))}

                    <div className="mt-12 p-6 border border-slate-800 bg-slate-900/30 font-mono text-xs text-slate-500 space-y-2">
                        <p>&gt; ENCRYPTED_CONNECTION: ESTABLISHED</p>
                        <p>&gt; LOCATION_PING: CARY_NC_USA</p>
                        <p>&gt; RESPONSE_TIME: &lt; 24_HOURS</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

const TerminalLoader = () => {
    const [text, setText] = useState('');
    const phases = ['> ANALYZING_INPUT...', '> SEARCHING_ARCHIVES...', '> COMPILING_DATA...', '> ENCRYPTING_RESPONSE...'];
    const [phaseIndex, setPhaseIndex] = useState(0);

    useEffect(() => {
        let currentText = '';
        let targetText = phases[phaseIndex];
        let charIndex = 0;

        const typeInterval = setInterval(() => {
            if (charIndex < targetText.length) {
                currentText += targetText[charIndex];
                setText(currentText);
                charIndex++;
            } else {
                clearInterval(typeInterval);
                setTimeout(() => {
                    setPhaseIndex((prev) => (prev + 1) % phases.length);
                    setText('');
                }, 1000);
            }
        }, 50);

        return () => clearInterval(typeInterval);
    }, [phaseIndex]);

    return (
        <div className="flex justify-start ml-2">
            <div className="bg-black/80 border border-cyan-500/30 p-3 rounded text-xs font-mono text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.2)]">
                <span className="text-pink-500 mr-2">root@nova:~$</span>
                {text}
                <span className="inline-block w-1.5 h-3 bg-cyan-500 ml-1 animate-pulse align-middle" />
            </div>
        </div>
    );
};

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'bot', text: "SYSTEM_ONLINE. Initializing NOVA (Neural Operations Virtual Assistant)... Ready for input." }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const API_URL = import.meta.env.VITE_API_URL || '';

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = input;
        setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
        setInput('');
        setIsLoading(true);

        try {
            const res = await fetch(`${API_URL}/api/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage })
            });
            const data = await res.json();

            if (data.reply) {
                setMessages(prev => [...prev, { role: 'bot', text: data.reply }]);
            } else {
                setMessages(prev => [...prev, { role: 'bot', text: "Error: Neural link unstable. Please try again." }]);
            }
        } catch (error) {
            setMessages(prev => [...prev, { role: 'bot', text: "Error: Connection failed." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Toggle Button */}
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-cyan-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.5)] border-2 border-white hover:bg-pink-500 transition-colors"
            >
                {isOpen ? <X size={24} className="text-black" /> : <MessageSquare size={24} className="text-black" />}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="fixed bottom-24 right-6 z-50 w-[380px] h-[600px] bg-black/95 backdrop-blur-xl border border-cyan-500/50 rounded-lg shadow-[0_0_50px_rgba(34,211,238,0.2)] flex flex-col overflow-hidden"
                    >
                        {/* Scanline Effect */}
                        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-50 bg-[length:100%_2px,3px_100%] opacity-20" />

                        {/* Header */}
                        <div className="p-4 border-b border-cyan-500/30 bg-gradient-to-r from-cyan-950/50 to-purple-950/50 flex items-center justify-between relative overflow-hidden">
                            <div className="flex items-center gap-3 z-10">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]" />
                                <GlitchText text="NOVA_V2.0" className="font-mono font-bold text-cyan-400 tracking-wider" />
                            </div>
                            <div className="text-[10px] font-mono text-cyan-500/50 z-10">
                                MEM: 64TB // CPU: 98%
                            </div>
                            {/* Animated background line */}
                            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-cyan-500/50 animate-pulse" />
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-cyan-900 scrollbar-track-black/50 relative z-10">
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] p-3 text-sm font-mono relative group break-words ${msg.role === 'user'
                                        ? 'bg-cyan-950/30 border border-cyan-500/50 text-cyan-100 rounded-tl-lg rounded-bl-lg rounded-br-none mr-2'
                                        : 'bg-slate-900/80 border border-pink-500/30 text-slate-300 rounded-tr-lg rounded-br-lg rounded-bl-none ml-2'
                                        }`}>
                                        {/* Corner accents */}
                                        <div className={`absolute top-0 w-2 h-2 border-t border-l ${msg.role === 'user' ? 'border-cyan-400 left-0' : 'border-pink-500 left-0'}`} />
                                        <div className={`absolute bottom-0 w-2 h-2 border-b border-r ${msg.role === 'user' ? 'border-cyan-400 right-0' : 'border-pink-500 right-0'}`} />

                                        <ReactMarkdown
                                            components={{
                                                strong: ({ node, ...props }) => <span className="font-bold text-cyan-400" {...props} />,
                                                ul: ({ node, ...props }) => <ul className="list-disc pl-4 space-y-1 mt-2 marker:text-pink-500" {...props} />,
                                                li: ({ node, ...props }) => <li className="text-slate-300" {...props} />,
                                                p: ({ node, ...props }) => <p className="mb-2 last:mb-0 leading-relaxed" {...props} />,
                                                code: ({ node, ...props }) => <code className="bg-black/50 px-1 py-0.5 rounded text-yellow-400 font-mono text-xs" {...props} />
                                            }}
                                        >
                                            {msg.text}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            ))}
                            {isLoading && <TerminalLoader />}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSend} className="p-4 border-t border-cyan-500/30 bg-black/80 backdrop-blur relative z-10">
                            <div className="relative group">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="ENTER_COMMAND..."
                                    className="w-full bg-slate-900/50 border border-slate-700 rounded-none pl-4 pr-12 py-3 text-sm text-cyan-100 focus:border-cyan-500 focus:outline-none font-mono transition-all placeholder:text-slate-600 focus:shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-cyan-500 hover:text-pink-500 transition-colors disabled:opacity-50 hover:scale-110 active:scale-95"
                                >
                                    <Send size={18} />
                                </button>
                                {/* Input corner accents */}
                                <div className="absolute top-0 left-0 w-1 h-1 bg-cyan-500 transition-all group-hover:w-full" />
                                <div className="absolute bottom-0 right-0 w-1 h-1 bg-cyan-500 transition-all group-hover:w-full" />
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default function App() {
    return (
        <div className="min-h-screen text-slate-200 selection:bg-pink-500/30 bg-black">
            <Scene />
            <Navbar />
            <main>
                <Hero />
                <Certifications />
                <Education />
                <Skills />
                <Experience />
                <Projects />
                <Contact />
                <Chatbot />
                {/* Add other sections similarly */}
            </main>
        </div>
    );
}
