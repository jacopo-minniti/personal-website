"use client";

import { useState } from 'react';
import Image from 'next/image';
import TerminalCard from './TerminalCard';
import { quotes, galleryImages } from '@/lib/home-data';


export function QuotesBox() {
    return (
        <TerminalCard title="nice_quotes.txt" className="h-full">
            <div className="p-6 font-mono text-sm h-full max-h-[400px] min-h-[300px] overflow-y-auto bg-[#0d1117] custom-scrollbar">
                <div className="flex flex-col space-y-4">
                    {quotes.map((quote, i) => (
                        <div key={i} className="border-l-2 border-[var(--pastel-orange)] pl-3 text-foreground hover:text-[var(--pastel-orange)] transition-colors group cursor-default">
                            <p className="mb-1 leading-relaxed">
                                &quot;{quote.text}&quot;
                            </p>
                            <p className="text-xs italic text-muted opacity-80 group-hover:text-[var(--pastel-orange)]/80 transition-colors">
                                – {quote.author}
                            </p>
                        </div>
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
                <div className="absolute inset-0 flex items-center justify-between p-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-30 pointer-events-none">
                    <button onClick={prev} className="pointer-events-auto bg-black/50 hover:bg-[var(--pastel-orange)] text-white hover:text-black p-4 md:p-2 rounded-full w-12 h-12 md:w-10 md:h-10 flex items-center justify-center font-mono font-bold transition-all hover:scale-110 active:scale-95 shadow-lg backdrop-blur-sm border border-white/10">
                        &lt;
                    </button>
                    <button onClick={next} className="pointer-events-auto bg-black/50 hover:bg-[var(--pastel-orange)] text-white hover:text-black p-4 md:p-2 rounded-full w-12 h-12 md:w-10 md:h-10 flex items-center justify-center font-mono font-bold transition-all hover:scale-110 active:scale-95 shadow-lg backdrop-blur-sm border border-white/10">
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
