"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import TerminalCard from './TerminalCard';
import { quotes, galleryImages } from '@/lib/home-data';

function TypingQuote({ text, author, delay = 0 }: { text: string; author: string; delay?: number }) {
    const [displayedText, setDisplayedText] = useState("");
    const [showAuthor, setShowAuthor] = useState(false);

    useEffect(() => {
        let index = 0;
        const timeout = setTimeout(() => {
            const interval = setInterval(() => {
                if (index < text.length) {
                    setDisplayedText(text.substring(0, index + 1));
                    index++;
                } else {
                    clearInterval(interval);
                    setShowAuthor(true);
                }
            }, 30);
            return () => clearInterval(interval);
        }, delay);
        return () => clearTimeout(timeout);
    }, [text, delay]);

    return (
        <div className="border-l-2 border-[var(--pastel-orange)] pl-3 text-foreground mb-4 hover:text-[var(--pastel-orange)] transition-colors group cursor-default">
            <p className="mb-1 leading-relaxed">
                &quot;{displayedText}&quot;
            </p>
            {showAuthor && (
                <p className="text-xs italic text-muted opacity-80 group-hover:text-[var(--pastel-orange)]/80 transition-colors animate-in fade-in slide-in-from-left-2 duration-700">
                    – {author}
                </p>
            )}
        </div>
    );
}

export function QuotesBox() {
    return (
        <TerminalCard title="nice_quotes.txt" className="h-full">
            <div className="p-6 font-mono text-sm h-full max-h-[400px] min-h-[300px] overflow-y-auto bg-[#0d1117] custom-scrollbar">
                <div className="flex flex-col">
                    {quotes.map((quote, i) => (
                        <TypingQuote
                            key={i}
                            text={quote.text}
                            author={quote.author}
                            delay={i * 1500}
                        />
                    ))}
                </div>
            </div>
        </TerminalCard>
    );
}

export function GalleryViewer() {
    const [index, setIndex] = useState(0);

    const next = () => {
        setIndex((prev) => (prev + 1) % galleryImages.length);
    };

    const prev = () => {
        setIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    };

    const currentImage = galleryImages[index];

    return (
        <TerminalCard title="gallery_viewer.exe" className="h-full relative group">
            <div className="relative w-full h-[400px] overflow-hidden bg-black">
                {/* Image */}
                <div className="absolute inset-0">
                    <Image
                        src={currentImage.path}
                        alt="Gallery Image"
                        fill
                        className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    />
                </div>

                {/* Description Overlay */}
                <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm px-4 py-2 border border-white/10 max-w-[70%] z-20">
                    <p className="text-white text-xs font-mono leading-tight">
                        {currentImage.description}
                    </p>
                </div>

                {/* Controls Overlay */}
                <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <button onClick={prev} className="bg-black/50 hover:bg-[var(--pastel-orange)] text-white hover:text-black p-2 rounded-full w-10 h-10 flex items-center justify-center font-mono font-bold transition-all hover:scale-110 active:scale-95 shadow-lg">
                        &lt;
                    </button>
                    <button onClick={next} className="bg-black/50 hover:bg-[var(--pastel-orange)] text-white hover:text-black p-2 rounded-full w-10 h-10 flex items-center justify-center font-mono font-bold transition-all hover:scale-110 active:scale-95 shadow-lg">
                        &gt;
                    </button>
                </div>

                {/* Counter indicator */}
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-mono text-[var(--pastel-orange)] border border-white/10 shadow-xl z-20">
                    {index + 1} / {galleryImages.length}
                </div>
            </div>
        </TerminalCard>
    );
}
