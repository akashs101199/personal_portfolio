import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Briefcase, User, Repeat } from 'lucide-react';
import ChatHeader from './ChatHeader';
import MessageBubble from './MessageBubble';
import InputBar from './InputBar';

const generateSessionId = () => `sess_${Math.random().toString(36).substr(2, 9)}`;

const CyberChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'bot', text: 'Hello! I am Akash\'s virtual assistant. Ask me anything about his skills, projects, or experience.' }
    ]);
    const [input, setInput] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId] = useState(generateSessionId());

    // Recruiter Mode
    const [isRecruiterMode, setIsRecruiterMode] = useState(false);

    const messagesEndRef = useRef(null);
    const recognitionRef = useRef(null);

    // Auto-scroll to bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen, isRecruiterMode]);

    // Voice Recognition Setup
    useEffect(() => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;
            recognitionRef.current.lang = 'en-US';

            recognitionRef.current.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setInput(transcript);
                setIsListening(false);
            };

            recognitionRef.current.onerror = (event) => {
                console.error("Speech recognition error", event.error);
                setIsListening(false);
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
            };
        }
    }, []);

    const toggleListening = () => {
        if (isListening) {
            recognitionRef.current?.stop();
        } else {
            recognitionRef.current?.start();
            setIsListening(true);
        }
    };

    const handleTextSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { role: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        const endpoint = isRecruiterMode ? '/api/analyze-jd' : '/api/chat';
        const payload = isRecruiterMode
            ? { jdText: input, sessionId }
            : { message: input, sessionId };

        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await res.json();

            if (data.reply) {
                setMessages(prev => [...prev, { role: 'bot', text: data.reply }]);
            } else {
                setMessages(prev => [...prev, { role: 'bot', text: "I'm having trouble connecting to the server. Please check the implementation." }]);
            }
        } catch (err) {
            console.error(err);
            setMessages(prev => [...prev, { role: 'bot', text: "Connection error. Please check your internet." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-4 right-2 md:bottom-6 md:right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="w-[90vw] md:w-[380px] h-[500px] bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-4 mr-2 md:mr-0"
                    >
                        {/* Status Bar Top */}
                        <ChatHeader isListening={isListening} setIsOpen={setIsOpen} mode={isLoading ? 'responding' : 'idle'} />

                        {/* Mode Toggle */}
                        <div className="flex border-b border-slate-100 bg-slate-50 p-1">
                            <button
                                onClick={() => setIsRecruiterMode(false)}
                                className={`flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-medium rounded-lg transition-all ${!isRecruiterMode ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                <User size={14} /> Chat
                            </button>
                            <button
                                onClick={() => setIsRecruiterMode(true)}
                                className={`flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-medium rounded-lg transition-all ${isRecruiterMode ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                <Briefcase size={14} /> Recruiter Mode
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-slate-50">
                            {messages.map((msg, idx) => (
                                <MessageBubble
                                    key={idx}
                                    msg={msg}
                                    isLast={idx === messages.length - 1}
                                    isSpeaking={false}
                                />
                            ))}
                            {isLoading && (
                                <div className="text-slate-400 text-xs font-medium pl-4 animate-pulse">
                                    {isRecruiterMode ? 'Analyzing JD...' : 'Thinking...'}
                                </div>
                            )}
                            {isRecruiterMode && messages.length === 1 && (
                                <div className="p-4 bg-purple-50 text-purple-800 text-xs rounded-xl border border-purple-100 mb-4">
                                    <strong>🚀 Recruiter Mode Active</strong>
                                    <p className="mt-1">Paste a job description below. I will analyze it against Akash's profile and tell you exactly why he's a good fit.</p>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <InputBar
                            input={input}
                            setInput={setInput}
                            handleTextSubmit={handleTextSubmit}
                            toggleListening={toggleListening}
                            isListening={isListening}
                            placeholder={isRecruiterMode ? "Paste Job Description here..." : "Type your message..."}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${isOpen
                    ? 'bg-slate-100 text-slate-600 rotate-90'
                    : 'bg-blue-600 text-white shadow-blue-600/30'
                    }`}
            >
                {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
            </motion.button>
        </div>
    );
};

export default CyberChat;
