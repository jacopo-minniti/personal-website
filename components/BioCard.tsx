"use client";

import { useState, useEffect } from 'react';

export default function BioCard() {
    const [text1, setText1] = useState("");
    const [text2, setText2] = useState("");
    const [showCursor1, setShowCursor1] = useState(true);
    const [showCursor2, setShowCursor2] = useState(false);

    const fullText1 = "Welcome to my digital workspace. I explore the intersections of Artificial Intelligence, Philosophy, and Poetry.";
    const fullText2 = "Simplicity in form, depth in thought.";

    useEffect(() => {
        let index1 = 0;
        let index2 = 0;

        // Type first paragraph
        const interval1 = setInterval(() => {
            if (index1 < fullText1.length) {
                setText1(fullText1.substring(0, index1 + 1));
                index1++;
            } else {
                clearInterval(interval1);
                setShowCursor1(false);

                // Wait a bit before starting second paragraph
                setTimeout(() => {
                    setShowCursor2(true);
                    const interval2 = setInterval(() => {
                        if (index2 < fullText2.length) {
                            setText2(fullText2.substring(0, index2 + 1));
                            index2++;
                        } else {
                            clearInterval(interval2);
                            setShowCursor2(false);
                        }
                    }, 10);
                }, 500);
            }
        }, 10);

        return () => {
            clearInterval(interval1);
        };
    }, []);

    return (
        <div className="p-6 md:p-8 flex flex-col h-full">
            <div>
                <p className="mb-4 font-mono text-sm">
                    <span className="text-[var(--pastel-purple)]">$</span> whoami
                </p>
                <h1 className="text-3xl font-bold text-white mb-2 font-mono">Jacopo Minniti</h1>
                <p className="text-muted mb-6 text-sm font-mono">
                    AI Researcher // Working toward my best self
                </p>

                <div className="text-white/80 leading-relaxed text-sm mb-4 font-mono relative">
                    {/* Ghost element for stable height */}
                    <div className="invisible" aria-hidden="true">
                        <p className="mb-4">{fullText1}</p>
                        <p>{fullText2}</p>
                    </div>

                    {/* Animated Overlay */}
                    <div className="absolute inset-0 top-0 left-0">
                        <p className="mb-4">
                            {text1}
                            {showCursor1 && (
                                <span className="inline-block w-2 h-4 bg-[var(--pastel-orange)] align-middle ml-0.5 animate-pulse"></span>
                            )}
                        </p>
                        {(text2 || !showCursor1) && (
                            <p>
                                {text2}
                                {showCursor2 && (
                                    <span className="inline-block w-2 h-4 bg-[var(--pastel-orange)] align-middle ml-0.5 animate-pulse"></span>
                                )}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-8 space-y-6">
                {/* Affiliations */}
                <div className="border-t border-border pt-4 font-mono text-sm">
                    <p className="mb-2">
                        <span className="text-[var(--pastel-green)]">$</span> affiliations --current
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <a href="https://www.minerva.edu" target="_blank" className="bg-white/10 hover:bg-white/20 px-3 py-1 rounded text-white text-xs border border-white/20 transition-colors">
                            Minerva University
                        </a>
                        <a href="https://xrisk.uchicago.edu/" target="_blank" className="bg-[var(--pastel-red)]/10 hover:bg-[var(--pastel-red)]/20 px-3 py-1 rounded text-[var(--pastel-red)] text-xs border border-[var(--pastel-red)]/20 transition-colors">
                            XLab (UChicago)
                        </a>
                    </div>
                </div>

                {/* Contact */}
                <div className="border-t border-border pt-4 font-mono text-sm">
                    <p className="mb-2">
                        <span className="text-[var(--pastel-yellow)]">$</span> contact --email
                    </p>
                    <a href="mailto:jacopo.minniti004@gmail.com" className="text-sm text-white hover:underline decoration-[var(--pastel-orange)] underline-offset-4 decoration-2">
                        jacopo.minniti004 [dot] gmail [dot] com
                    </a>
                </div>
            </div>
        </div>
    );
}
