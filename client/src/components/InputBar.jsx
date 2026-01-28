import React from 'react';
import { Mic, MicOff, Send } from 'lucide-react';

const InputBar = ({ input, setInput, handleTextSubmit, toggleListening, isListening }) => (
    <div className="p-4 bg-white border-t border-slate-100">
        <form onSubmit={handleTextSubmit} className="flex gap-2 items-center">
            <div className="relative flex-1">
                <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all placeholder:text-slate-400"
                />
            </div>
            <button
                type="button"
                onClick={toggleListening}
                className={`p-2.5 rounded-xl transition-all duration-200 ${isListening
                    ? 'bg-red-50 text-red-500 animate-pulse'
                    : 'bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600'}`}
            >
                {isListening ? <MicOff size={18} /> : <Mic size={18} />}
            </button>
            <button
                type="submit"
                disabled={!input.trim()}
                className="p-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-all shadow-sm"
            >
                <Send size={18} />
            </button>
        </form>
        <div className="text-center mt-2 text-[10px] text-slate-300 font-medium">
            Powered by Gemini • Portfolio Assistant
        </div>
    </div>
);

export default InputBar;
