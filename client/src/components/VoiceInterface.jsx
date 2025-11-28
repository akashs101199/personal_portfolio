import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import GlitchText from './GlitchText';

const VoiceInterface = () => {
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [aiResponse, setAiResponse] = useState('');
    const [error, setError] = useState('');

    const recognitionRef = useRef(null);
    const synthRef = useRef(window.speechSynthesis);

    const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

    useEffect(() => {
        // Initialize Speech Recognition
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;
            recognitionRef.current.lang = 'en-US';

            recognitionRef.current.onstart = () => setIsListening(true);
            recognitionRef.current.onend = () => setIsListening(false);
            recognitionRef.current.onresult = handleResult;
            recognitionRef.current.onerror = (event) => {
                console.error("Speech recognition error", event.error);
                setError(`Error: ${event.error}`);
                setIsListening(false);
            };
        } else {
            setError("Voice input not supported in this browser.");
        }

        return () => {
            if (recognitionRef.current) recognitionRef.current.stop();
            if (synthRef.current) synthRef.current.cancel();
        };
    }, []);

    const handleResult = async (event) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        await processCommand(text);
    };

    const processCommand = async (text) => {
        try {
            const res = await fetch(`${API_URL}/api/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text })
            });
            const data = await res.json();

            if (data.reply) {
                setAiResponse(data.reply);
                speak(data.reply);
            }
        } catch (err) {
            console.error("AI Error:", err);
            setError("Neural Link Failed.");
        }
    };

    const speak = (text) => {
        if (synthRef.current.speaking) synthRef.current.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        // Try to find a "robotic" or "system" voice
        const voices = synthRef.current.getVoices();
        const systemVoice = voices.find(v => v.name.includes('Google US English') || v.name.includes('Samantha')) || voices[0];

        utterance.voice = systemVoice;
        utterance.pitch = 0.9; // Slightly lower for robotic feel
        utterance.rate = 1.1;  // Slightly faster

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);

        synthRef.current.speak(utterance);
    };

    const toggleListening = () => {
        if (isListening) {
            recognitionRef.current.stop();
        } else {
            setError('');
            recognitionRef.current.start();
        }
    };

    return (
        <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-4 w-80">
            {/* Cyberpunk Container */}
            <div className="bg-black/80 backdrop-blur-md border border-cyan-500/50 p-6 rounded-lg relative overflow-hidden group">
                {/* Scanline */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 bg-[length:100%_2px,3px_100%] opacity-20" />

                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-500" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-500" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-500" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-500" />

                {/* Header */}
                <div className="flex items-center justify-between mb-6 relative z-10">
                    <div className="flex items-center gap-2">
                        <Activity className={`w-5 h-5 ${isListening ? 'text-red-500 animate-pulse' : 'text-cyan-500'}`} />
                        <GlitchText text="VOICE_LINK" className="font-mono font-bold text-cyan-400 text-sm" />
                    </div>
                    <div className="text-[10px] font-mono text-cyan-500/50">
                        {isListening ? 'REC_ACTIVE' : 'STANDBY'}
                    </div>
                </div>

                {/* Visualizer Area */}
                <div className="h-24 bg-black/50 border border-cyan-900/50 mb-6 relative flex items-center justify-center overflow-hidden">
                    {isListening || isSpeaking ? (
                        <div className="flex items-center gap-1">
                            {[...Array(10)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className={`w-2 rounded-full ${isSpeaking ? 'bg-pink-500' : 'bg-cyan-500'}`}
                                    animate={{
                                        height: [10, Math.random() * 60 + 10, 10],
                                    }}
                                    transition={{
                                        duration: 0.5,
                                        repeat: Infinity,
                                        delay: i * 0.1,
                                        ease: "easeInOut"
                                    }}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="w-full h-[1px] bg-cyan-900" />
                    )}
                </div>

                {/* Transcript Display */}
                <div className="min-h-[60px] mb-6 font-mono text-xs space-y-2 relative z-10">
                    {transcript && (
                        <div className="text-cyan-100/80 border-l-2 border-cyan-500 pl-2">
                            <span className="text-cyan-500 opacity-50">USER &gt;</span> {transcript}
                        </div>
                    )}
                    {aiResponse && (
                        <div className="text-pink-100/80 border-l-2 border-pink-500 pl-2">
                            <span className="text-pink-500 opacity-50">NOVA &gt;</span> {aiResponse}
                        </div>
                    )}
                    {error && (
                        <div className="text-red-400 border-l-2 border-red-500 pl-2">
                            {error}
                        </div>
                    )}
                </div>

                {/* Controls */}
                <div className="flex justify-center relative z-10">
                    <button
                        onClick={toggleListening}
                        className={`
                            w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all duration-300
                            ${isListening
                                ? 'border-red-500 bg-red-500/10 shadow-[0_0_20px_rgba(239,68,68,0.4)]'
                                : 'border-cyan-500 bg-cyan-500/10 hover:bg-cyan-500/20 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                            }
                        `}
                    >
                        {isListening ? (
                            <MicOff className="w-8 h-8 text-red-500" />
                        ) : (
                            <Mic className="w-8 h-8 text-cyan-500" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VoiceInterface;
