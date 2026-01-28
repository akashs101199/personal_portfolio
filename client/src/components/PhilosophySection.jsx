import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Server, Shield, Lightbulb } from 'lucide-react';

const PHILOSOPHY_ITEMS = [
    {
        title: "End-to-End Ownership",
        desc: "I don't just build features—I own entire product lifecycles. From competitive analysis to deployment, I deliver full-stack value.",
        icon: <Target size={24} className="text-indigo-600" />
    },
    {
        title: "Bridge Technical & Business",
        desc: "I translate complex AI architectures into quantifiable ROI. I speak both engineer and executive fluently.",
        icon: <Users size={24} className="text-blue-600" />
    },
    {
        title: "Production AI Experience",
        desc: "Understanding the gap between demo-ready and enterprise-ready: observability, guardrails, compliance, and scalability.",
        icon: <Server size={24} className="text-purple-600" />
    },
    {
        title: "Responsible AI Advocate",
        desc: "Prioritizing human-in-the-loop workflows, comprehensive guardrails, and transparent systems for trust.",
        icon: <Shield size={24} className="text-emerald-600" />
    }
];

const PhilosophySection = () => {
    return (
        <section className="py-24 bg-white">
            <div className="container-pro">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Work With Me</h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Combining specific technical depth with a broad product-first mindset.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {PHILOSOPHY_ITEMS.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-300 group"
                        >
                            <div className="mb-4 p-3 bg-white rounded-xl w-fit shadow-sm group-hover:scale-110 transition-transform">
                                {item.icon}
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PhilosophySection;
