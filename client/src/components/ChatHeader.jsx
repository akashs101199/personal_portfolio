import React from 'react';
import { Wifi, Battery, Minimize2 } from 'lucide-react';
import GlitchText from './GlitchText';

// mode: 'idle' | 'listening' | 'responding'
const ChatHeader = ({ isListening, setIsOpen, mode }) => {
    return (
        <div className="p-3 border-b border-cyan-500/30 bg-black/40 relative">
            {/* Tech Decoration */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-500" />

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className={`relative w-6 h-6 flex items-center justify-center border border-cyan-500/50 bg-black ${isListening ? 'animate-spin' : ''}`}>
                        <div className={`w-3 h-3 ${isListening ? 'bg-red-500' : 'bg-cyan-500'}`} style={{ clipPath: 'polygon(50% 0, 100% 50%, 50% 100%, 0 50%)' }} />
                    </div>
                    <div>
                        <GlitchText text="NOVA_TERMINAL_V3" className="font-bold text-cyan-400 text-xs tracking-[0.2em]" />
                        <div className="flex gap-1 mt-0.5">
                            <div className="w-8 h-0.5 bg-cyan-500/50" />
                            <div className="w-2 h-0.5 bg-cyan-500/30" />
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4 text-cyan-500/60 font-mono text-[10px]">
                    <div className="flex flex-col items-end">
                        <span className="text-cyan-300">NET: SECURE</span>
                        <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className={`w-1 h-1.5 ${i < 4 ? 'bg-cyan-500' : 'bg-cyan-900'}`} />
                            ))}
                        </div>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="text-cyan-500 hover:text-white transition-colors hover:scale-110">
                        <Minimize2 size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatHeader;
