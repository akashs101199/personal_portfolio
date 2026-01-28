import React from 'react';
import { Users, CheckCircle, Target, Zap, Brain, Layers, Database, Server, Code, Globe, Shield, Award } from 'lucide-react';

const AboutSection = () => {
    return (
        <section id="about" className="py-20 bg-gradient-to-br from-blue-50 to-slate-50">
            <div className="container-pro">
                {/* Section Header */}
                <div className="mb-16 text-center max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                        Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">AI Products</span> Across Industries
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        I'm a technical product leader who bridges the gap between visionary product strategy and hands-on AI engineering. With experience spanning <strong>Healthcare, Marketing Technology, and Fintech</strong>, my superpower is shipping 0→1 products at the intersection of cutting-edge AI research and real-world business value.
                    </p>
                </div>

                {/* Two Column Layout */}
                <div className="grid md:grid-cols-2 gap-12 mb-16">
                    {/* Left Column - Journey & Mission */}
                    <div className="space-y-8">
                        {/* Who I Am */}
                        <div className="p-8 bg-white rounded-2xl border-2 border-blue-200 card-hover">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 bg-white rounded-lg shadow-sm">
                                    <Users className="w-6 h-6 text-indigo-600" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900">Who I Am</h3>
                            </div>
                            <p className="text-slate-700 leading-relaxed">
                                I'm <strong>Akash Shanmuganathan</strong>, a technical product leader at <strong>Onedata Software Solutions</strong>. I specialize in taking complex AI capabilities—from Google MedGemma to AWS Bedrock's multi-agent systems—and transforming them into production-ready products across <strong>Healthcare, Marketing Technology, and Financial Services</strong>.
                            </p>
                        </div>

                        {/* What I've Done */}
                        <div className="p-8 bg-white rounded-2xl border-2 border-emerald-200 card-hover">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 bg-white rounded-lg shadow-sm">
                                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900">What I've Built</h3>
                            </div>
                            <ul className="space-y-3 text-slate-700">
                                <li className="flex items-start gap-3">
                                    <span className="text-emerald-600 font-bold mt-1">•</span>
                                    <span><strong>Healthcare:</strong> Led full-stack development of an AI platform integrating Google MedGemma for clinical NLP and Smart on FHIR for EHR interoperability</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-emerald-600 font-bold mt-1">•</span>
                                    <span><strong>Marketing Tech:</strong> Architected a multi-agent voice analytics system achieving 85% autonomous accuracy with &lt;800ms latency for executive marketing dashboards</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-emerald-600 font-bold mt-1">•</span>
                                    <span><strong>Fintech (at Hexaware):</strong> Migrated 200+ legacy workloads to AWS Data Lake for Fortune 500 financial services, delivering <strong>$180K annual savings</strong> and 45% performance gains</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-emerald-600 font-bold mt-1">•</span>
                                    <span><strong>AWS Certified Data Engineer</strong> (achieved) | <strong>Solutions Architect</strong> (in progress) — validating enterprise-scale cloud expertise</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-emerald-600 font-bold mt-1">•</span>
                                    <span><strong>Client Presentations:</strong> Delivered technical presentations and demos to C-suite executives, translating complex AI capabilities into business value propositions</span>
                                </li>
                            </ul>
                        </div>

                        {/* Mission Statement */}
                        <div className="p-8 bg-white rounded-2xl border-2 border-purple-200 card-hover">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 bg-white rounded-lg shadow-sm">
                                    <Target className="w-6 h-6 text-purple-600" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900">My Mission</h3>
                            </div>
                            <p className="text-slate-700 leading-relaxed">
                                To accelerate the deployment of <strong>ethical, production-grade AI systems</strong> that create measurable business value across industries while maintaining the highest standards of data privacy, security, and accuracy. I believe AI should augment human expertise, not replace it.
                            </p>
                        </div>
                    </div>

                    {/* Right Column - Goals & Vision */}
                    <div className="space-y-8">
                        {/* What I'm Doing Now */}
                        <div className="p-8 bg-white rounded-2xl border-2 border-blue-200 card-hover">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 bg-white rounded-lg shadow-sm">
                                    <Zap className="w-6 h-6 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900">What I'm Building</h3>
                            </div>
                            <p className="text-slate-700 leading-relaxed mb-4">
                                Currently leading the <strong>0→1 product development</strong> of AI-powered solutions across multiple verticals:
                            </p>
                            <ul className="space-y-3 text-slate-700">
                                <li className="flex items-start gap-3">
                                    <span className="text-blue-600 font-bold mt-1">→</span>
                                    <span><strong>Healthcare:</strong> Deploying MedGemma-based clinical NLP for automated medical coding and building HIPAA-compliant Smart on FHIR integrations</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-blue-600 font-bold mt-1">→</span>
                                    <span><strong>Marketing Tech:</strong> Building conversational AI analytics platforms with AWS Bedrock for real-time campaign insights via voice commands</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-blue-600 font-bold mt-1">→</span>
                                    <span><strong>Data Infrastructure:</strong> Architecting scalable data lakes and ETL pipelines for enterprise-scale analytics across industries</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-blue-600 font-bold mt-1">→</span>
                                    <span>Conducting user research to validate product-market fit and refining product roadmaps based on real customer feedback</span>
                                </li>
                            </ul>
                        </div>

                        {/* Vision Statement */}
                        <div className="p-8 bg-white rounded-2xl border-2 border-amber-200 card-hover">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 bg-white rounded-lg shadow-sm">
                                    <Brain className="w-6 h-6 text-amber-600" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900">My Vision</h3>
                            </div>
                            <p className="text-slate-700 leading-relaxed">
                                To continue <strong>bridging the gap between technical innovation and business impact</strong>. I'm passionate about exploring the full capabilities of <strong>Generative AI</strong> and pushing the boundaries of what's possible—from multi-agent systems to real-time reasoning—to solve complex, real-world problems that create tangible value.
                            </p>
                        </div>

                        {/* Core Principles */}
                        <div className="p-8 bg-white rounded-2xl border-2 border-slate-200 card-hover">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 bg-white rounded-lg shadow-sm">
                                    <Layers className="w-6 h-6 text-slate-600" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900">How I Work</h3>
                            </div>
                            <ul className="space-y-3 text-slate-700">
                                <li className="flex items-start gap-3">
                                    <span className="text-slate-600 font-bold mt-1">✓</span>
                                    <span><strong>Ship Fast, Iterate Faster:</strong> Get to production quickly, learn from real users, and continuously improve</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-slate-600 font-bold mt-1">✓</span>
                                    <span><strong>Bridge Technical & Business:</strong> Translate complex AI capabilities into clear business value propositions</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-slate-600 font-bold mt-1">✓</span>
                                    <span><strong>Own End-to-End:</strong> From user interviews to deployment pipelines, I take full ownership</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-slate-600 font-bold mt-1">✓</span>
                                    <span><strong>Bias Towards Action:</strong> Prototype first, perfect later—velocity matters in early-stage product development</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>


                {/* Certifications & Credentials */}
                <div className="mt-16">
                    <h3 className="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-3">
                        Professional Certifications
                    </h3>
                    <p className="text-center text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Validated cloud and data engineering expertise through industry-recognized AWS certifications.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* AWS Data Engineer - Achieved */}
                        <div className="p-8 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 bg-white rounded-lg shadow-sm">
                                    <Award className="w-6 h-6 text-emerald-600" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-xl font-bold text-slate-900">AWS Certified Data Engineer</h4>
                                    <span className="inline-flex items-center gap-1 text-emerald-700 text-sm font-semibold mt-1">
                                        <CheckCircle className="w-4 h-4" />
                                        Achieved
                                    </span>
                                </div>
                            </div>
                            <p className="text-slate-700 leading-relaxed mb-4">
                                Demonstrated expertise in designing, building, securing, and maintaining analytics solutions on AWS. Validated proficiency in data lakes, ETL pipelines, and data transformation at scale.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {['Data Lakes', 'ETL Pipelines', 'PySpark', 'AWS Glue', 'Redshift'].map((skill) => (
                                    <span key={skill} className="px-3 py-1.5 bg-white/80 backdrop-blur-sm text-emerald-700 text-xs font-semibold rounded-lg border border-emerald-200 shadow-sm">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* AWS Solutions Architect - In Progress */}
                        <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 bg-white rounded-lg shadow-sm">
                                    <Target className="w-6 h-6 text-blue-600" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-xl font-bold text-slate-900">AWS Solutions Architect</h4>
                                    <span className="inline-flex items-center gap-1 text-blue-700 text-sm font-semibold mt-1">
                                        <Zap className="w-4 h-4" />
                                        In Progress
                                    </span>
                                </div>
                            </div>
                            <p className="text-slate-700 leading-relaxed mb-4">
                                Currently preparing for certification in designing distributed systems and architecting resilient, secure, and cost-optimized cloud solutions on AWS infrastructure.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {['EC2', 'Lambda', 'VPC', 'CloudFormation', 'Cost Optimization'].map((skill) => (
                                    <span key={skill} className="px-3 py-1.5 bg-white/80 backdrop-blur-sm text-blue-700 text-xs font-semibold rounded-lg border border-blue-200 shadow-sm">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
