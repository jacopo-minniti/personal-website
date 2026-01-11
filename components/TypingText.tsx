"use client";

import { useState, useEffect } from 'react';

interface TypingTextProps {
    text: string;
    speed?: number;
    className?: string;
}

export default function TypingText({ text, speed = 30, className = "" }: TypingTextProps) {
    const [displayedText, setDisplayedText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, speed);

            return () => clearTimeout(timeout);
        }
    }, [currentIndex, text, speed]);

    return (
        <span className={className}>
            {displayedText}
            {currentIndex < text.length && (
                <span className="inline-block w-2 h-4 bg-[var(--pastel-orange)] align-middle ml-0.5 animate-pulse"></span>
            )}
        </span>
    );
}
