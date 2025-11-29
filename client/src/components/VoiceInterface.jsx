import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Send, Wifi, Battery, Minimize2, MessageSquare, Zap, X, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import GlitchText from './GlitchText';
import ChatHeader from './ChatHeader';
import MessageBubble from './MessageBubble';
import InputBar from './InputBar';


// Hex Matrix Rain Effect
const HexMatrix = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let width = canvas.width = canvas.offsetWidth;
        let height = canvas.height = canvas.offsetHeight;

        const columns = Math.floor(width / 15);
        const drops = new Array(columns).fill(1);
        const chars = "0123456789ABCDEF";

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, width, height);

            ctx.fillStyle = '#0F0'; // Green text
            ctx.font = '12px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];

                // Randomly switch between cyan and green for cyberpunk feel
                ctx.fillStyle = Math.random() > 0.8 ? '#22d3ee' : '#059669';

                ctx.fillText(text, i * 15, drops[i] * 15);

                if (drops[i] * 15 > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 33);

        const handleResize = () => {
            width = canvas.width = canvas.offsetWidth;
            height = canvas.height = canvas.offsetHeight;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-10 pointer-events-none z-0" />;
};

// Typewriter Component for AI Text
const Typewriter = ({ text, onComplete }) => {
    const [displayedText, setDisplayedText] = useState('');
    const indexRef = useRef(0);

    useEffect(() => {
        setDisplayedText('');
        indexRef.current = 0;

        const interval = setInterval(() => {
            if (indexRef.current < text.length) {
                setDisplayedText((prev) => prev + text.charAt(indexRef.current));
                indexRef.current++;
            } else {
                clearInterval(interval);
                if (onComplete) onComplete();
            }
        }, 15); // Typing speed

        return () => clearInterval(interval);
    }, [text]);

    return (
        <ReactMarkdown
            components={{
                strong: ({ node, ...props }) => <span className="font-bold text-pink-400 text-shadow-sm" {...props} />,
                p: ({ node, ...props }) => <p className="mb-2 last:mb-0 leading-relaxed" {...props} />,
                ul: ({ node, ...props }) => <ul className="list-none pl-2 space-y-1 border-l-2 border-pink-500/30 ml-1" {...props} />,
                li: ({ node, ...props }) => <li className="text-pink-100/90 pl-2 relative before:content-['>'] before:absolute before:left-[-12px] before:text-pink-500/50" {...props} />,
                code: ({ node, ...props }) => <code className="bg-black/50 px-1 py-0.5 rounded text-yellow-400 font-mono text-[10px] border border-yellow-500/20" {...props} />
            }}
        >
            {displayedText}
        </ReactMarkdown>
    );
};

// Cyberpunk Spectrum Visualizer
const CyberpunkSpectrum = ({ isActive, mode }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const barCount = 32;
        const segmentCount = 12;
        const bars = new Array(barCount).fill(0);

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const barWidth = canvas.width / barCount;
            const gap = 2;
            const segmentHeight = canvas.height / segmentCount;

            // Update bar heights
            for (let i = 0; i < barCount; i++) {
                const targetHeight = isActive ? Math.random() * segmentCount : 1;
                // Smooth transition
                bars[i] = bars[i] + (targetHeight - bars[i]) * 0.2;

                // Random glitch
                if (Math.random() > 0.98) bars[i] = Math.random() * segmentCount;
            }

            const activeColor = mode === 'listening' ? '239, 68, 68' : (mode === 'responding' ? '34, 211, 238' : '16, 185, 129');

            for (let i = 0; i < barCount; i++) {
                const x = i * barWidth;
                const activeSegments = Math.floor(bars[i]);

                for (let j = 0; j < segmentCount; j++) {
                    const y = canvas.height - (j + 1) * segmentHeight;

                    if (j < activeSegments) {
                        // Active segment
                        const opacity = (j / segmentCount) + 0.2;
                        ctx.fillStyle = `rgba(${activeColor}, ${opacity})`;
                        ctx.shadowBlur = 5;
                        ctx.shadowColor = `rgba(${activeColor}, 0.5)`;
                    } else {
                        // Inactive segment (dim background)
                        ctx.fillStyle = `rgba(${activeColor}, 0.05)`;
                        ctx.shadowBlur = 0;
                    }

                    // Draw segment with slight gap
                    ctx.fillRect(x + gap, y + gap, barWidth - gap * 2, segmentHeight - gap * 2);
                }
            }

            // Draw "Peak" line
            ctx.beginPath();
            ctx.moveTo(0, canvas.height / 2);
            ctx.strokeStyle = `rgba(${activeColor}, 0.1)`;
            ctx.lineWidth = 1;
            ctx.lineTo(canvas.width, canvas.height / 2);
            ctx.stroke();

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isActive, mode]);

    return <canvas ref={canvasRef} className="w-full h-full" />;
};

// Boot Sequence Component
const BootSequence = ({ onComplete, isServerReady }) => {
    const [lines, setLines] = useState([]);
    const isServerReadyRef = useRef(isServerReady);
    const hasWaitingMessageRef = useRef(false);

    // Keep ref updated
    useEffect(() => {
        isServerReadyRef.current = isServerReady;
    }, [isServerReady]);

    useEffect(() => {
        const bootText = [
            "INITIALIZING NEURAL INTERFACE...",
            "LOADING KNOWLEDGE BASE...",
            "CALIBRATING SENSORS...",
            "ESTABLISHING SECURE CONNECTION..."
        ];

        let currentIndex = 0;
        let timeoutId;

        const addLine = () => {
            if (currentIndex < bootText.length) {
                setLines(prev => [...prev, bootText[currentIndex]]);
                currentIndex++;
                timeoutId = setTimeout(addLine, Math.random() * 300 + 200);
            } else {
                // All initial lines loaded, check server status via ref
                if (isServerReadyRef.current) {
                    setLines(prev => [...prev, "CONNECTION ESTABLISHED.", "SYSTEM ONLINE."]);
                    timeoutId = setTimeout(onComplete, 800);
                } else {
                    // Server not ready, show waiting message
                    if (!hasWaitingMessageRef.current) {
                        setLines(prev => [...prev, "WAITING FOR SERVER UPLINK...", "DETECTED COLD START...", "WAKING UP BACKEND NODES..."]);
                        hasWaitingMessageRef.current = true;
                    }
                }
            }
        };

        addLine();

        return () => clearTimeout(timeoutId);
    }, []); // Run once on mount

    // Effect to handle server becoming ready while waiting
    useEffect(() => {
        if (isServerReady && hasWaitingMessageRef.current) {
            setLines(prev => [...prev, "UPLINK ESTABLISHED.", "SYSTEM ONLINE."]);
            const completeTimeout = setTimeout(onComplete, 800);
            return () => clearTimeout(completeTimeout);
        }
    }, [isServerReady, onComplete]);

    return (
        <div className="absolute inset-0 bg-black z-50 flex flex-col justify-end p-6 font-mono text-xs">
            {lines.map((line, i) => (
                <div key={i} className="text-cyan-500 mb-1">
                    <span className="text-cyan-800 mr-2">[{new Date().toLocaleTimeString()}]</span>
                    <span className={`typing-effect ${line && line.includes("WAITING") ? "animate-pulse text-yellow-500" : ""}`}>
                        {line || ""}
                    </span>
                </div>
            ))}
            <div className="w-3 h-5 bg-cyan-500 animate-pulse mt-2" />
        </div>
    );
};

const VoiceInterface = () => {
    console.log("Rendering VoiceInterface");
    const [isOpen, setIsOpen] = useState(false);
    const [isBooting, setIsBooting] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [mode, setMode] = useState('idle'); // idle | listening | responding
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [error, setError] = useState('');

    const recognitionRef = useRef(null);
    const synthRef = useRef(window.speechSynthesis);
    const messagesEndRef = useRef(null);

    const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen, isBooting]);

    const [isServerReady, setIsServerReady] = useState(false);
    const hasBootedRef = useRef(false);

    // Poll server health
    useEffect(() => {
        const checkHealth = async () => {
            try {
                const res = await fetch(`${API_URL}/api/health`);
                if (res.ok) {
                    setIsServerReady(true);
                }
            } catch (err) {
                console.log("Server waking up...");
            }
        };

        // Check immediately
        checkHealth();

        // Poll every 2 seconds until ready
        const interval = setInterval(() => {
            if (!isServerReady) {
                checkHealth();
            } else {
                clearInterval(interval);
            }
        }, 2000);

        return () => clearInterval(interval);
    }, [isServerReady, API_URL]);

    useEffect(() => {
        if (isOpen && !hasBootedRef.current) {
            setIsBooting(true);
            hasBootedRef.current = true;
        }
    }, [isOpen]);

    // Update mode based on listening and speaking states
    useEffect(() => {
        if (isListening) {
            setMode('listening');
        } else if (isSpeaking) {
            setMode('responding');
        } else {
            setMode('idle');
        }
    }, [isListening, isSpeaking]);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;
            recognitionRef.current.lang = 'en-US';

            recognitionRef.current.onstart = () => setIsListening(true);
            recognitionRef.current.onend = () => setIsListening(false);
            recognitionRef.current.onresult = handleVoiceResult;
            recognitionRef.current.onerror = (event) => {
                console.error("Speech recognition error", event);
                if (event && event.error) {
                    setError(`Error: ${event.error}`);
                } else {
                    setError("Error: Unknown speech recognition error");
                }
                setIsListening(false);
            };
        }

        return () => {
            if (recognitionRef.current) recognitionRef.current.stop();
            if (synthRef.current) synthRef.current.cancel();
        };
    }, []);

    const handleVoiceResult = async (event) => {
        const text = event.results[0][0].transcript;
        await processCommand(text, 'voice');
    };

    const handleTextSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        await processCommand(input, 'text');
        setInput('');
    };

    const processCommand = async (text, type) => {
        setMessages(prev => [...prev, { role: 'user', text, type }]);

        try {
            const res = await fetch(`${API_URL}/api/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text })
            });
            const data = await res.json();

            if (data.reply) {
                setMessages(prev => [...prev, { role: 'bot', text: data.reply }]);
                speak(data.reply);
            }
        } catch (err) {
            console.error("AI Error:", err);
            setError("Neural Link Failed.");
            setMessages(prev => [...prev, { role: 'bot', text: "Error: Connection failed." }]);
        }
    };

    const speak = (text) => {
        if (synthRef.current.speaking) synthRef.current.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        const voices = synthRef.current.getVoices();
        const preferredVoice = voices.find(v =>
            v.name.includes('Google US English') ||
            v.name.includes('Samantha') ||
            v.name.includes('Microsoft Zira')
        ) || voices[0];

        utterance.voice = preferredVoice;
        utterance.pitch = 1.0;
        utterance.rate = 1.0;

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
            if (!isOpen) setIsOpen(true);
        }
    };

    const [visualizerMode, setVisualizerMode] = useState('bars'); // 'spectrum', 'core', 'bio', 'flux', 'orb', 'bars'

    // ... existing useEffects ...

    const toggleVisualizer = () => {
        const modes = ['spectrum', 'core', 'bio', 'flux', 'orb', 'bars'];
        const nextIndex = (modes.indexOf(visualizerMode) + 1) % modes.length;
        setVisualizerMode(modes[nextIndex]);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none font-mono">
            {/* Mode overlay graphics */}
            {mode === 'listening' && (
                <div className="absolute inset-0 pointer-events-none bg-red-500/10 animate-pulse z-0" />
            )}
            {mode === 'responding' && (
                <div className="absolute inset-0 pointer-events-none bg-cyan-500/10 animate-pulse z-0" />
            )}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 50, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 50, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="pointer-events-auto w-[400px] h-[650px] hud-panel flex flex-col mb-6 relative group overflow-hidden"
                    >
                        {/* Boot Sequence Overlay */}
                        <AnimatePresence>
                            {isBooting && (
                                <motion.div
                                    initial={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 z-[60] bg-black"
                                >
                                    <BootSequence onComplete={() => setIsBooting(false)} isServerReady={isServerReady} />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Solid Black Background */}
                        <div className="absolute inset-0 bg-black pointer-events-none" />

                        {/* Decorative HUD Elements */}
                        <div className="absolute top-2 right-2 text-[8px] text-cyan-500/50 font-mono">SYS.VER.4.2</div>
                        <div className="absolute bottom-20 left-2 w-1 h-12 bg-cyan-500/20" />
                        <div className="absolute bottom-20 right-2 w-1 h-12 bg-cyan-500/20" />

                        {/* Header */}
                        <ChatHeader isListening={isListening} setIsOpen={setIsOpen} mode={mode} />

                        {/* Creative Visualizer Area */}
                        <div className="h-40 bg-black border-b border-cyan-500/20 flex items-center justify-center relative overflow-hidden shrink-0 z-10 group/viz">
                            <div className="absolute top-1 left-2 text-[8px] text-cyan-500/70 tracking-widest z-20">
                                VISUAL_MODULE: {visualizerMode.toUpperCase()}
                            </div>

                            {/* Visualizer Switcher Button */}
                            <button
                                onClick={toggleVisualizer}
                                className="absolute top-1 right-2 z-30 p-1 text-cyan-500/50 hover:text-cyan-400 hover:bg-cyan-900/30 transition-all rounded"
                                title="Switch Visualizer"
                            >
                                <Activity size={12} />
                            </button>

                            {/* Active Visualizer */}
                            {visualizerMode === 'spectrum' && <CyberpunkSpectrum isActive={isListening || isSpeaking} mode={mode} />}
                            {visualizerMode === 'core' && <NeuralCore isActive={isListening || isSpeaking} mode={mode} />}
                            {visualizerMode === 'bio' && <BioMetric isActive={isListening || isSpeaking} mode={mode} />}
                            {visualizerMode === 'flux' && <FluxField isActive={isListening || isSpeaking} mode={mode} />}
                            {visualizerMode === 'orb' && <NeuralOrb isActive={isListening || isSpeaking} mode={mode} />}
                            {visualizerMode === 'bars' && <VoiceBars isActive={isListening || isSpeaking} mode={mode} />}
                        </div>

                        {/* Chat Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-cyan-700 scrollbar-track-black relative z-20">
                            {messages.map((msg, i) => <MessageBubble
                                key={i}
                                msg={msg}
                                isLast={i === messages.length - 1}
                                isSpeaking={isSpeaking && i === messages.length - 1}
                            />
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
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button (The "Orb" -> "Tech Node") */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`pointer-events-auto w-14 h-14 flex items-center justify-center transition-all duration-300 relative z-50 ${isOpen
                    ? 'bg-cyan-950 border border-cyan-400'
                    : 'bg-black border border-cyan-500/50 hover:border-cyan-400'
                    }`}
                style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 80%, 80% 100%, 0 100%, 0 20%)' }}
            >
                {isOpen ? (
                    <X className="text-cyan-400 w-6 h-6" />
                ) : (
                    <MessageSquare className="text-cyan-400 w-6 h-6 group-hover:text-white transition-colors" />
                )}

                {/* Status Indicator */}
                <div className={`absolute -top-1 -right-1 w-3 h-3 ${isListening ? 'bg-red-500 animate-pulse' : 'bg-green-500'} shadow-[0_0_5px_currentColor]`}
                    style={{ clipPath: 'polygon(50% 0, 100% 50%, 50% 100%, 0 50%)' }}
                />
            </motion.button>
        </div >
    );
};

// --- NEW VISUALIZERS ---

// 1. Neural Core (Circular Reactor)
const NeuralCore = ({ isActive, mode }) => {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let time = 0;
        const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
        resize();
        window.addEventListener('resize', resize);

        const draw = () => {
            time += isActive ? 0.1 : 0.02;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const cx = canvas.width / 2;
            const cy = canvas.height / 2;
            const baseRadius = 30;
            const pulse = isActive ? Math.sin(time * 5) * 5 : 0;
            const color = mode === 'listening' ? '#ef4444' : (mode === 'responding' ? '#22d3ee' : '#10b981');

            // Inner Core
            ctx.beginPath();
            ctx.arc(cx, cy, baseRadius + pulse, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.globalAlpha = 0.2;
            ctx.fill();
            ctx.globalAlpha = 1;
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.stroke();

            // Rotating Rings
            for (let i = 1; i <= 3; i++) {
                ctx.beginPath();
                const radius = baseRadius + (i * 15) + (pulse * 0.5);
                const startAngle = time * (i % 2 === 0 ? 1 : -1) * (0.5 / i);
                const endAngle = startAngle + Math.PI * 1.5;
                ctx.arc(cx, cy, radius, startAngle, endAngle);
                ctx.strokeStyle = color;
                ctx.lineWidth = 1;
                ctx.globalAlpha = 0.6 - (i * 0.1);
                ctx.stroke();
            }
            animationFrameId = requestAnimationFrame(draw);
        };
        draw();
        return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animationFrameId); };
    }, [isActive, mode]);
    return <canvas ref={canvasRef} className="w-full h-full" />;
};

// 2. Bio-Metric (EKG Style)
const BioMetric = ({ isActive, mode }) => {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let x = 0;
        let dataPoints = [];

        const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
        resize();
        window.addEventListener('resize', resize);

        const draw = () => {
            // Fade effect for trail
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const cy = canvas.height / 2;
            const speed = 4;
            const color = mode === 'listening' ? '#ef4444' : (mode === 'responding' ? '#22d3ee' : '#10b981');

            // Generate new point
            let y = cy;
            if (isActive && Math.random() > 0.8) {
                y = cy + (Math.random() - 0.5) * 60; // Spike
            } else if (isActive) {
                y = cy + (Math.random() - 0.5) * 10; // Jitter
            }

            dataPoints.push({ x, y });
            x += speed;

            if (x > canvas.width) {
                x = 0;
                dataPoints = []; // Reset or wrap (simple reset for EKG look)
            }

            ctx.beginPath();
            ctx.moveTo(dataPoints[0]?.x || 0, dataPoints[0]?.y || cy);
            for (let i = 1; i < dataPoints.length; i++) {
                ctx.lineTo(dataPoints[i].x, dataPoints[i].y);
            }
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.shadowBlur = 5;
            ctx.shadowColor = color;
            ctx.stroke();

            // Leading dot
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fillStyle = '#fff';
            ctx.fill();

            animationFrameId = requestAnimationFrame(draw);
        };
        draw();
        return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animationFrameId); };
    }, [isActive, mode]);
    return <canvas ref={canvasRef} className="w-full h-full" />;
};

// 3. Flux Field (Particles)
const FluxField = ({ isActive, mode }) => {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const particles = Array.from({ length: 50 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            speed: Math.random() * 2 + 1,
            size: Math.random() * 2 + 0.5
        }));

        const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
        resize();
        window.addEventListener('resize', resize);

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const cx = canvas.width / 2;
            const cy = canvas.height / 2;
            const color = mode === 'listening' ? '239, 68, 68' : (mode === 'responding' ? '34, 211, 238' : '16, 185, 129');

            particles.forEach(p => {
                // Move away from center if active, else float
                if (isActive) {
                    const dx = p.x - cx;
                    const dy = p.y - cy;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const angle = Math.atan2(dy, dx);
                    p.x += Math.cos(angle) * p.speed * 2;
                    p.y += Math.sin(angle) * p.speed * 2;

                    // Reset if out of bounds
                    if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
                        p.x = cx;
                        p.y = cy;
                    }
                } else {
                    p.y -= p.speed * 0.5;
                    if (p.y < 0) p.y = canvas.height;
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${color}, 0.6)`;
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(draw);
        };
        draw();
        return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animationFrameId); };
    }, [isActive, mode]);
    return <canvas ref={canvasRef} className="w-full h-full" />;
};

// 4. Neural Orb (ChatGPT Style)
const NeuralOrb = ({ isActive, mode }) => {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let time = 0;

        const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
        resize();
        window.addEventListener('resize', resize);

        const draw = () => {
            time += 0.02;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const cx = canvas.width / 2;
            const cy = canvas.height / 2;
            const baseRadius = 40;
            const color = mode === 'listening' ? '#ef4444' : (mode === 'responding' ? '#22d3ee' : '#ffffff'); // White for idle/orb

            // Create organic blob shape
            ctx.beginPath();
            for (let i = 0; i <= 100; i++) {
                const angle = (i / 100) * Math.PI * 2;
                // Perlin-ish noise simulation using sines
                const noise =
                    Math.sin(angle * 3 + time * 2) * 5 +
                    Math.cos(angle * 5 - time * 3) * 5 +
                    Math.sin(angle * 7 + time) * 2;

                const amp = isActive ? 15 : 2; // Deform more when active
                const radius = baseRadius + noise * (isActive ? 1.5 : 0.5) + (isActive ? Math.sin(time * 10) * 5 : 0);

                const x = cx + Math.cos(angle) * radius;
                const y = cy + Math.sin(angle) * radius;

                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();

            // Gradient Fill
            const gradient = ctx.createRadialGradient(cx, cy, baseRadius * 0.2, cx, cy, baseRadius * 1.5);
            gradient.addColorStop(0, '#ffffff');
            gradient.addColorStop(0.5, color);
            gradient.addColorStop(1, 'transparent');

            ctx.fillStyle = gradient;
            ctx.fill();

            // Glow
            ctx.shadowBlur = 20;
            ctx.shadowColor = color;
            ctx.strokeStyle = 'rgba(255,255,255,0.5)';
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.shadowBlur = 0;

            animationFrameId = requestAnimationFrame(draw);
        };
        draw();
        return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animationFrameId); };
    }, [isActive, mode]);
    return <canvas ref={canvasRef} className="w-full h-full" />;
};

// 5. Voice Bars (Cyberpunk Mic Style)
const VoiceBars = ({ isActive, mode }) => {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let time = 0;

        const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
        resize();
        window.addEventListener('resize', resize);

        const draw = () => {
            time += 0.1;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const cx = canvas.width / 2;
            const cy = canvas.height / 2;

            // Cyberpunk Colors
            const colorPrimary = mode === 'listening' ? '#ef4444' : (mode === 'responding' ? '#22d3ee' : '#10b981');
            const colorSecondary = mode === 'listening' ? '#7f1d1d' : (mode === 'responding' ? '#083344' : '#064e3b');

            const barCount = 7;
            const barWidth = 12;
            const gap = 8;
            const segmentHeight = 4;
            const segmentGap = 2;
            const maxAmplitude = 60;

            for (let i = 0; i < barCount; i++) {
                // Calculate height based on sine waves + noise
                let targetHeight = 10;
                if (isActive) {
                    const offset = i - (barCount - 1) / 2;
                    // Center bars move more
                    const sensitivity = 1 - Math.abs(offset) * 0.15;
                    // Add some "glitch" randomness
                    const glitch = Math.random() > 0.9 ? 20 : 0;
                    targetHeight = 15 + Math.abs(Math.sin(time * 1.5 + i) * maxAmplitude * sensitivity) + (Math.random() * 10) + glitch;
                } else {
                    targetHeight = 8 + Math.sin(time + i) * 3; // Idle breathing
                }

                const x = cx + (i - (barCount - 1) / 2) * (barWidth + gap);

                // Draw Segments
                const segments = Math.floor(targetHeight / (segmentHeight + segmentGap));
                const startY = cy - (segments * (segmentHeight + segmentGap)) / 2;

                for (let j = 0; j < segments; j++) {
                    const y = startY + j * (segmentHeight + segmentGap);

                    // Opacity gradient from center
                    const distFromCenter = Math.abs(j - segments / 2) / (segments / 2);
                    const opacity = 1 - distFromCenter * 0.3;

                    ctx.fillStyle = colorPrimary;
                    ctx.globalAlpha = opacity;

                    // Glitch effect: occasionally offset a segment
                    let drawX = x;
                    if (isActive && Math.random() > 0.98) {
                        drawX += (Math.random() - 0.5) * 10;
                        ctx.fillStyle = '#fff'; // Flash white
                    }

                    ctx.fillRect(drawX - barWidth / 2, y, barWidth, segmentHeight);
                }
                ctx.globalAlpha = 1;

                // Draw "Peak" indicator
                if (isActive) {
                    const peakY = startY - 10 + (Math.sin(time * 2 + i) * 5);
                    ctx.fillStyle = colorPrimary;
                    ctx.fillRect(x - barWidth / 2, peakY, barWidth, 2);
                }
            }

            // Digital Grid Background (Subtle)
            ctx.strokeStyle = colorSecondary;
            ctx.lineWidth = 1;
            ctx.globalAlpha = 0.2;
            ctx.beginPath();
            for (let i = 0; i < canvas.width; i += 20) {
                ctx.moveTo(i, 0);
                ctx.lineTo(i, canvas.height);
            }
            ctx.stroke();
            ctx.globalAlpha = 1;

            animationFrameId = requestAnimationFrame(draw);
        };
        draw();
        return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animationFrameId); };
    }, [isActive, mode]);
    return <canvas ref={canvasRef} className="w-full h-full" />;
};

export default VoiceInterface;
