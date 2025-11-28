import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

const Typewriter = ({ text, onComplete }) => {
    const [displayedText, setDisplayedText] = useState('');
    const indexRef = useRef(0);

    useEffect(() => {
        setDisplayedText('');
        indexRef.current = 0;
        const interval = setInterval(() => {
            if (indexRef.current < text.length) {
                setDisplayedText(prev => prev + text.charAt(indexRef.current));
                indexRef.current++;
            } else {
                clearInterval(interval);
                if (onComplete) onComplete();
            }
        }, 15);
        return () => clearInterval(interval);
    }, [text, onComplete]);

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

export default Typewriter;
