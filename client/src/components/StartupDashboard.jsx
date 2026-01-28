import React from 'react';
import { motion } from 'framer-motion';
import { Activity, BarChart2, Cpu, Database, Globe, Server, Shield, Zap } from 'lucide-react';

const StartupDashboard = () => {
    return (
        <div className="relative w-full aspect-[16/9] bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-slate-700">
            {/* Top Bar */}
            <div className="h-10 bg-slate-800 border-b border-slate-700 flex items-center px-4 justify-between">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <div className="text-xs text-slate-400 font-mono">system_status: active</div>
            </div>

            {/* Grid Content */}
            <div className="p-6 grid grid-cols-4 grid-rows-3 gap-4 h-[calc(100%-40px)]">

                {/* Main Metric - Agent Activity */}
                <div className="col-span-2 row-span-2 bg-slate-800/50 rounded-lg p-4 border border-slate-700 relative overflow-hidden">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                            <Cpu size={16} /> AGENT SWARM
                        </div>
                        <span className="text-xs text-emerald-400 px-2 py-0.5 bg-emerald-400/10 rounded">ONLINE</span>
                    </div>
                    {/* Simulated Graph */}
                    <div className="flex items-end justify-between h-32 gap-1">
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="w-full bg-indigo-500/30 rounded-t-sm"
                                animate={{ height: [20 + Math.random() * 30, 40 + Math.random() * 60, 20 + Math.random() * 30] + "%" }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
                            />
                        ))}
                    </div>
                </div>

                {/* Secondary Metric - RAG Pipeline */}
                <div className="col-span-1 row-span-1 bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                    <div className="flex items-center gap-2 text-purple-400 font-bold text-sm mb-2">
                        <Database size={16} /> VECTORS
                    </div>
                    <div className="text-2xl font-bold text-white">1.2M</div>
                    <div className="text-xs text-slate-500">Embeddings Indexed</div>
                </div>

                {/* Secondary Metric - API Latency */}
                <div className="col-span-1 row-span-1 bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                    <div className="flex items-center gap-2 text-blue-400 font-bold text-sm mb-2">
                        <Zap size={16} /> LATENCY
                    </div>
                    <div className="text-2xl font-bold text-white">45ms</div>
                    <div className="text-xs text-emerald-500">▼ 12% vs last deploy</div>
                </div>

                {/* Log Stream */}
                <div className="col-span-2 row-span-1 bg-black/40 rounded-lg p-3 border border-slate-800 font-mono text-[10px] text-green-400/80 overflow-hidden">
                    <motion.div animate={{ y: [-100, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}>
                        {`[INFO] Initializing Bedrock Agent...
[INFO] Loading Knowledge Base ID: kb-4829...
[SUCCESS] Vector DB Connected (OpenSearch)
[INFO] Reasoning trace: "Analyzing retrieval..."
[Heal check] Service 'MedGemma' healthy
[WARN] Rate limit approaching on shard 2
[INFO] User session started: 0x93FA...
`.split('\n').map((line, i) => <div key={i}>{line}</div>)}
                    </motion.div>
                </div>

                {/* Globe / Network */}
                <div className="col-span-1 row-span-2 bg-slate-800/50 rounded-lg p-4 border border-slate-700 flex items-center justify-center relative">
                    <Globe className="text-slate-600 animate-pulse" size={64} />
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-4 border-2 border-dashed border-slate-700 rounded-full"
                    />
                </div>

                {/* Shield / Security */}
                <div className="col-span-1 row-span-1 bg-slate-800/50 rounded-lg p-4 border border-slate-700 flex flex-col justify-center items-center">
                    <Shield className="text-emerald-500 mb-2" size={32} />
                    <div className="text-xs font-bold text-slate-300">HIPAA COMPLIANT</div>
                </div>

            </div>
        </div>
    );
};

export default StartupDashboard;
