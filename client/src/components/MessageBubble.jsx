import React from 'react';
import Typewriter from './Typewriter';
import ReactMarkdown from 'react-markdown';

const MessageBubble = ({ msg, isLast, isSpeaking }) => {
    const isUser = msg.role === 'user';

    // Cyberpunk styling
    const containerClass = `relative max-w-[85%] p-3 text-xs font-mono border backdrop-blur-sm mb-2 ${isUser
        ? 'ml-auto bg-cyan-950/30 border-cyan-500/40 text-cyan-100'
        : 'mr-auto bg-black/60 border-pink-500/40 text-pink-100'}`;

    const clipPath = isUser
        ? 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)'
        : 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))';

    // Glow effect for active bot message
    const glowClass = !isUser && isSpeaking ? 'shadow-[0_0_15px_rgba(236,72,153,0.2)] border-pink-500/80' : '';

    return (
        <div className={`${containerClass} ${glowClass}`} style={{ clipPath }}>
            {/* Header / Metadata */}
            <div className={`flex justify-between items-center mb-1.5 pb-1 border-b ${isUser ? 'border-cyan-500/20' : 'border-pink-500/20'}`}>
                <span className={`text-[9px] tracking-wider opacity-80 ${isUser ? 'text-cyan-400' : 'text-pink-400'}`}>
                    {isUser ? '>> OPR_01' : '>> NOVA_AI'}
                </span>
                <span className="text-[8px] opacity-40">
                    {new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' })}
                </span>
            </div>

            {/* Content */}
            <div className="leading-relaxed opacity-90">
                {msg.role === 'bot' && isLast ? (
                    <Typewriter text={msg.text} />
                ) : (
                    <ReactMarkdown
                        components={{
                            strong: ({ node, ...props }) => <span className="font-bold text-white text-shadow-sm" {...props} />,
                            p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                            ul: ({ node, ...props }) => <ul className="list-none pl-2 space-y-1 border-l border-pink-500/30 ml-1" {...props} />,
                            li: ({ node, ...props }) => <li className="pl-2 relative before:content-['-'] before:absolute before:left-[-8px] before:opacity-50" {...props} />,
                            code: ({ node, ...props }) => <code className="bg-black/50 px-1 py-0.5 text-yellow-400 font-mono text-[10px] border border-yellow-500/20" {...props} />,
                        }}
                    >
                        {msg.text}
                    </ReactMarkdown>
                )}
            </div>

            {/* Decorative Corner */}
            <div className={`absolute w-2 h-2 ${isUser ? 'bottom-0 right-0 border-b border-r border-cyan-400' : 'top-0 left-0 border-t border-l border-pink-400'}`} />
        </div>
    );
};

export default MessageBubble;
