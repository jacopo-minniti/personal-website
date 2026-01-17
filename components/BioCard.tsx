"use client";

import { useState, useEffect } from 'react';
import { bioData } from '@/lib/home-data';

export default function BioCard() {
    const [displayedMessages, setDisplayedMessages] = useState<string[]>([]);
    const [currentMsgIdx, setCurrentMsgIdx] = useState(0);
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        // Initialize displayed messages array
        setDisplayedMessages(new Array(bioData.messages.length).fill(""));

        let msgIdx = 0;
        let charIdx = 0;
        let timeoutId: NodeJS.Timeout;

        const typeChar = () => {
            if (msgIdx >= bioData.messages.length) {
                setShowCursor(false);
                return;
            }

            const targetText = bioData.messages[msgIdx];

            if (charIdx < targetText.length) {
                setDisplayedMessages(prev => {
                    const newArr = [...prev];
                    newArr[msgIdx] = targetText.substring(0, charIdx + 1);
                    return newArr;
                });
                charIdx++;
                timeoutId = setTimeout(typeChar, 10);
            } else {
                // Move to next message
                msgIdx++;
                charIdx = 0;
                setCurrentMsgIdx(msgIdx);
                timeoutId = setTimeout(typeChar, 500);
            }
        };

        // Start typing
        typeChar();

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <div className="p-6 md:p-8 flex flex-col h-full">
            <div>
                <p className="mb-4 font-mono text-sm">
                    <span className="text-[var(--pastel-orange)]">$</span> whoami
                </p>
                <h1 className="text-3xl font-bold text-white mb-2 font-mono">{bioData.name}</h1>
                <p className="text-muted mb-6 text-sm font-mono">
                    {bioData.subtitle}
                </p>

                <div className="text-white/80 leading-relaxed text-sm mb-4 font-mono relative">
                    {/* Ghost element for stable height */}
                    <div className="invisible" aria-hidden="true">
                        {bioData.messages.map((msg, i) => (
                            <p key={i} className="mb-4">{msg}</p>
                        ))}
                    </div>

                    {/* Animated Overlay */}
                    <div className="absolute inset-0 top-0 left-0">
                        {displayedMessages.map((text, i) => (
                            <p key={i} className="mb-4">
                                {text}
                                {i === currentMsgIdx && showCursor && (
                                    <span className="inline-block w-2 h-4 bg-[var(--pastel-orange)] align-middle ml-0.5 animate-pulse"></span>
                                )}
                            </p>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-4 space-y-4">
                {/* Affiliations */}
                <div className="border-t border-border pt-4 font-mono text-sm">
                    <p className="mb-2">
                        <span className="text-[var(--pastel-orange)]">$</span> affiliations --current
                    </p>
                    <div className="flex flex-wrap gap-3">
                        {bioData.affiliations.map((aff, index) => (
                            <a
                                key={index}
                                href={aff.url}
                                target="_blank"
                                className={`${aff.colorClass} px-3 py-1 rounded text-xs border transition-colors`}
                            >
                                {aff.name}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Contact */}
                <div className="border-t border-border pt-4 font-mono text-sm">
                    <p className="mb-2">
                        <span className="text-[var(--pastel-orange)]">$</span> contact --email
                    </p>
                    <a href={`mailto:${bioData.contact.email}`} className="text-sm text-white hover:underline decoration-[var(--pastel-orange)] underline-offset-4 decoration-2">
                        {bioData.contact.display}
                    </a>
                </div>
            </div>
        </div>
    );
}
