import React from 'react';

interface TerminalCardProps {
    children: React.ReactNode;
    title?: string;
    className?: string;
}

export default function TerminalCard({ children, title, className = "" }: TerminalCardProps) {
    return (
        <div className={`border border-border bg-background w-full flex flex-col ${className} shadow-lg`}>
            {title && (
                <div className="border-b border-border px-4 py-2 bg-white/5 flex items-center justify-between flex-shrink-0">
                    <span className="font-bold text-sm text-foreground/80 lowercase font-mono">
                        {title}
                    </span>
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]"></div>
                    </div>
                </div>
            )}
            <div className="p-0 flex-1 flex flex-col min-h-0">
                {children}
            </div>
        </div>
    );
}
