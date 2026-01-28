import React from 'react';
import { Award, CheckCircle } from 'lucide-react';

const CERTIFICATIONS = [
    {
        name: "AWS Certified Data Engineer – Associate",
        code: "DEA-C01",
        status: "Active",
        desc: "Validates expertise in data pipelines, lakes, and analytics (Glue, Redshift, Athena)."
    },
    {
        name: "AWS Certified Gen AI Developer – Professional",
        code: "In Progress",
        status: "In Progress",
        desc: "Developing generative AI apps using Bedrock, RAG, and Agents."
    },
    {
        name: "AWS Certified Solutions Architect – Associate",
        code: "SAA-C03",
        status: "In Progress",
        desc: "Designing distributed systems on AWS for availability and cost optimization."
    }
];

const CertificationsSection = () => {
    return (
        <section className="py-20 border-t border-slate-100">
            <div className="container-pro">
                <div className="flex items-center gap-3 mb-8">
                    <Award className="text-amber-500" size={24} />
                    <h2 className="text-2xl font-bold text-slate-900">Certifications & Credentials</h2>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {CERTIFICATIONS.map((cert, i) => (
                        <div key={i} className="flex flex-col p-6 bg-white border border-slate-200 rounded-xl hover:border-amber-200 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <span className={`text-xs font-bold px-2 py-1 rounded ${cert.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                                    {cert.status}
                                </span>
                            </div>
                            <h3 className="font-bold text-slate-900 mb-2">{cert.name}</h3>
                            <p className="text-sm text-slate-500 mb-4">{cert.code}</p>
                            <p className="text-xs text-slate-600 leading-relaxed mt-auto">
                                {cert.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CertificationsSection;
