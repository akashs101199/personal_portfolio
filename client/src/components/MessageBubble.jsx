import React from 'react';
import ReactMarkdown from 'react-markdown';
import Typewriter from './Typewriter';

const MessageBubble = ({ msg, isLast, isSpeaking }) => {
    const isUser = msg.role === 'user';

    return (
        <div className={`flex flex-col mb-4 ${isUser ? 'items-end' : 'items-start'}`}>
            <div className="flex items-end gap-2 max-w-[85%]">
                {!isUser && (
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-blue-600 mb-1">
                        AI
                    </div>
                )}

                <div
                    className={`p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${isUser
                            ? 'bg-blue-600 text-white rounded-br-none'
                            : 'bg-white border border-slate-100 text-slate-700 rounded-bl-none'
                        }`}
                >
                    {msg.role === 'bot' && isLast ? (
                        <Typewriter text={msg.text} />
                    ) : (
                        <ReactMarkdown
                            components={{
                                strong: ({ node, ...props }) => <span className="font-bold" {...props} />,
                                p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                                ul: ({ node, ...props }) => <ul className="list-disc pl-4 space-y-1 mb-2" {...props} />,
                                li: ({ node, ...props }) => <li className="pl-1" {...props} />,
                                code: ({ node, ...props }) => <code className="bg-black/10 px-1 py-0.5 rounded font-mono text-xs" {...props} />,
                            }}
                        >
                            {msg.text}
                        </ReactMarkdown>
                    )}
                </div>
            </div>

            <span className="text-[10px] text-slate-400 mt-1 px-1">
                {new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' })}
            </span>
        </div>
    );
};

export default MessageBubble;
