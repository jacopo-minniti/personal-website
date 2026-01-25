"use client";

import { useState, useEffect } from 'react';
import { bioData } from '@/lib/home-data';

type Segment = { type: 'text'; content: string } | { type: 'link'; text: string; url: string };


function parseMessage(msg: string): Segment[] {
    const segments: Segment[] = [];
    let currentIndex = 0;

    while (currentIndex < msg.length) {
        const openBracket = msg.indexOf('[', currentIndex);
        if (openBracket === -1) {
            segments.push({ type: 'text', content: msg.substring(currentIndex) });
            break;
        }

        const closeBracketOpenParen = msg.indexOf('](', openBracket);
        if (closeBracketOpenParen === -1) {
            segments.push({ type: 'text', content: msg.substring(currentIndex) });
            break;
        }

        const closeParen = msg.indexOf(')', closeBracketOpenParen);
        if (closeParen === -1) {
            segments.push({ type: 'text', content: msg.substring(currentIndex) });
            break;
        }

        // We found a potential link: [text](url)
        // Ensure there are no newlines or other brackets that would invalidate it
        // (Just a basic check, can be relaxed if needed)

        // Push text preceding the link
        if (openBracket > currentIndex) {
            segments.push({ type: 'text', content: msg.substring(currentIndex, openBracket) });
        }

        const linkText = msg.substring(openBracket + 1, closeBracketOpenParen);
        const linkUrl = msg.substring(closeBracketOpenParen + 2, closeParen);

        segments.push({ type: 'link', text: linkText, url: linkUrl });
        currentIndex = closeParen + 1;
    }

    // Debug log to check what's being parsed
    console.log("Parsed Segments:", segments.map(s => s.type === 'link' ? `[LINK: ${s.text}]` : `[TEXT: ${s.content.substring(0, 10)}...]`));

    return segments;
}

export default function BioCard() {
    const [charIndex, setCharIndex] = useState(0);
    const [showCursor, setShowCursor] = useState(true);

    // Memoize parsed segments so it doesn't run every render
    // logic is outside component or useMemo
    const allSegments = parseMessage(bioData.bioText);

    // Calculate total length for termination
    const totalLength = allSegments.reduce((acc, seg) =>
        acc + (seg.type === 'text' ? seg.content.length : seg.text.length), 0);

    useEffect(() => {
        if (charIndex >= totalLength) {
            setShowCursor(false);
            return;
        }

        const timeoutId = setTimeout(() => {
            setCharIndex(prev => prev + 1);
        }, 10); // Standard speed

        return () => clearTimeout(timeoutId);
    }, [charIndex, totalLength]);

    // Derived state: compute visible segments based on charIndex
    const getVisibleSegments = () => {
        const visible: Segment[] = [];
        let remainingChars = charIndex;

        for (const seg of allSegments) {
            if (remainingChars <= 0) break;

            const content = seg.type === 'text' ? seg.content : seg.text;
            const len = content.length;

            if (remainingChars >= len) {
                // Show full segment
                visible.push(seg);
                remainingChars -= len;
            } else {
                // Show partial segment
                if (seg.type === 'text') {
                    visible.push({ type: 'text', content: seg.content.substring(0, remainingChars) });
                } else {
                    visible.push({ type: 'link', text: seg.text.substring(0, remainingChars), url: seg.url });
                }
                remainingChars = 0;
            }
        }
        return visible;
    };

    const typedSegments = getVisibleSegments();

    const renderWithParagraphs = (segments: Segment[], isOverlay: boolean) => {
        const paragraphs: Segment[][] = [[]];

        segments.forEach(seg => {
            if (seg.type === 'text' && seg.content.includes('\n\n')) {
                const parts = seg.content.split('\n\n');
                parts.forEach((part, i) => {
                    if (part) paragraphs[paragraphs.length - 1].push({ type: 'text', content: part });
                    if (i < parts.length - 1) paragraphs.push([]);
                });
            } else {
                paragraphs[paragraphs.length - 1].push(seg);
            }
        });

        return paragraphs.map((pSegments, i) => (
            <p key={i} className="mb-4 last:mb-0">
                {pSegments.map((seg, j) => {
                    // Unique key generation to prevent reconciliation issues
                    const keyProp = `${i}-${j}-${seg.type}`;
                    if (seg.type === 'text') return <span key={keyProp}>{seg.content}</span>;
                    return (
                        <a
                            key={keyProp}
                            href={seg.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--pastel-orange)] underline decoration-[var(--pastel-orange)] underline-offset-4 decoration-2"
                        >
                            {seg.text}
                        </a>
                    );
                })}
                {isOverlay && i === paragraphs.length - 1 && showCursor && (
                    <span className="inline-block w-2 h-4 bg-[var(--pastel-orange)] align-middle ml-0.5 animate-pulse"></span>
                )}
            </p>
        ));
    };

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
                        {renderWithParagraphs(allSegments, false)}
                    </div>

                    {/* Animated Overlay */}
                    <div className="absolute inset-0 top-0 left-0">
                        {renderWithParagraphs(typedSegments, true)}
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
