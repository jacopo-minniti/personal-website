"use client";

import { useEffect, useState } from 'react';

interface Footnote {
    id: string;
    content: string;
}

export default function FootnotesBox() {
    const [footnotes, setFootnotes] = useState<Footnote[]>([]);

    useEffect(() => {
        // Wait a bit for MDX to render
        const timer = setTimeout(() => {
            const sidenoteElements = document.querySelectorAll('[id^="sn-"]');
            const notes: Footnote[] = [];

            sidenoteElements.forEach((elem) => {
                const id = elem.id.replace('sn-', '');
                // Find the associated span with the content
                const span = elem.nextElementSibling;
                if (span && span.tagName === 'SPAN') {
                    const content = span.textContent?.replace(`[${id}]`, '').trim() || '';
                    if (content && !notes.find(n => n.id === id)) {
                        notes.push({ id, content });
                    }
                }
            });

            setFootnotes(notes);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    if (footnotes.length === 0) {
        return null;
    }

    return (
        <div className="border border-border bg-background p-4 shadow-md">
            <div className="text-xs font-mono text-muted mb-4 border-b border-border pb-2 flex justify-between">
                <span>footnotes.txt</span>
                <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-border"></span>
                    <span className="w-2 h-2 rounded-full bg-border"></span>
                </div>
            </div>

            <div className="space-y-3">
                {footnotes.map((note) => (
                    <div key={note.id} className="text-xs font-mono text-muted leading-relaxed">
                        <span className="text-[var(--pastel-orange)] font-bold mr-2">[{note.id}]</span>
                        {note.content}
                    </div>
                ))}
            </div>
        </div>
    );
}
