import React from 'react';
import { Mic, MicOff, Send } from 'lucide-react';

const InputBar = ({ input, setInput, handleTextSubmit, toggleListening, isListening }) => (
    <div className="p-3 bg-black/80 border-t border-cyan-500/30 relative z-20">
        <form onSubmit={handleTextSubmit} className="flex gap-2 items-end">
            <div className="relative flex-1 group">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500/50" />
                <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="ENTER_COMMAND..."
                    className="relative w-full bg-cyan-950/10 border-b border-cyan-500/30 pl-3 pr-3 py-2 text-xs text-cyan-100 focus:border-cyan-400 focus:bg-cyan-950/30 focus:outline-none transition-all placeholder:text-cyan-800 font-mono tracking-wider"
                />
            </div>
            <button
                type="button"
                onClick={toggleListening}
                className={`p-2 border transition-all duration-200 relative overflow-hidden group ${isListening
                    ? 'bg-red-500/20 border-red-500 text-red-500'
                    : 'bg-black border-cyan-500/50 text-cyan-400 hover:border-cyan-400'}`}
                style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%)' }}
            >
                {isListening ? <MicOff size={16} /> : <Mic size={16} />}
            </button>
            <button
                type="submit"
                disabled={!input.trim()}
                className="p-2 bg-cyan-900/20 border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500 hover:text-black disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-cyan-400 transition-all"
                style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%)' }}
            >
                <Send size={16} />
            </button>
        </form>
        <div className="flex justify-between items-center mt-1 px-1">
            <div className="text-[8px] text-cyan-800 tracking-[0.2em]">SECURE_CHANNEL_ACTIVE</div>
            <div className="flex gap-1">
                <div className="w-1 h-1 bg-cyan-500/50 animate-pulse" />
                <div className="w-1 h-1 bg-cyan-500/30" />
                <div className="w-1 h-1 bg-cyan-500/10" />
            </div>
        </div>
    </div>
);

export default InputBar;
