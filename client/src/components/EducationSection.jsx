import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react';

const EducationSection = ({ education }) => {
    return (
        <section id="education" className="py-24 bg-white relative overflow-hidden">
            <div className="container-pro">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 mb-12 justify-center"
                >
                    <div className="p-3 bg-purple-100 rounded-xl text-purple-600">
                        <GraduationCap size={32} />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                        Academic Background
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {education.map((edu, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{ y: -5 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-purple-200 transition-all duration-300"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-1">{edu.degree}</h3>
                                    <p className="text-purple-600 font-medium">{edu.school}</p>
                                </div>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-50 text-slate-600 text-xs font-semibold rounded-full border border-slate-100">
                                    <Calendar size={12} />
                                    {edu.period}
                                </span>
                            </div>

                            <div className="flex items-center gap-2 text-slate-500 text-sm mb-6">
                                <MapPin size={14} />
                                {edu.location}
                            </div>

                            {edu.desc && (
                                <p className="text-slate-600 mb-6 leading-relaxed text-sm">
                                    {edu.desc}
                                </p>
                            )}

                            {edu.gpa && (
                                <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Performance</span>
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-yellow-50 text-yellow-700 rounded-lg text-sm font-bold border border-yellow-100">
                                        <Award size={14} />
                                        GPA: {edu.gpa}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EducationSection;
