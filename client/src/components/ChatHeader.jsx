import React from 'react';
import { Minimize2 } from 'lucide-react';

const ChatHeader = ({ isListening, setIsOpen, mode }) => {
    return (
        <div className="p-4 border-b border-slate-100 bg-white flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="relative w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                    <div className={`w-2 h-2 bg-white rounded-full ${mode === 'responding' ? 'animate-bounce' : ''}`} />
                </div>
                <div>
                    <h3 className="font-bold text-slate-800 text-sm">Virtual Assistant</h3>
                    <div className="flex items-center gap-1.5">
                        <div className={`w-1.5 h-1.5 rounded-full ${mode === 'responding' ? 'bg-blue-500 animate-pulse' : 'bg-emerald-500'}`} />
                        <span className="text-xs text-slate-500 font-medium">
                            {mode === 'responding' ? 'Reply generating...' : 'Online'}
                        </span>
                    </div>
                </div>
            </div>
            <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors p-1 hover:bg-slate-50 rounded-lg"
            >
                <Minimize2 size={18} />
            </button>
        </div>
    );
};

export default ChatHeader;
