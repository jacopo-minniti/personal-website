"use client";

import { useEffect, useState } from 'react';

interface OutlineItem {
    id: string;
    text: string;
    level: number;
}

export default function TableOfContents() {
    const [headings, setHeadings] = useState<OutlineItem[]>([]);
    const [activeId, setActiveId] = useState<string>('');

    useEffect(() => {
        // Extract headings from the page
        const elements = Array.from(document.querySelectorAll('article h2, article h3'));
        const items: OutlineItem[] = elements.map((elem) => ({
            id: elem.id || elem.textContent?.toLowerCase().replace(/\s+/g, '-') || '',
            text: elem.textContent || '',
            level: parseInt(elem.tagName[1]),
        }));

        // Add IDs to headings if they don't have them
        elements.forEach((elem, index) => {
            if (!elem.id) {
                elem.id = items[index].id;
            }
        });

        setHeadings(items);

        // Intersection Observer for active heading
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-100px 0px -80% 0px' }
        );

        elements.forEach((elem) => observer.observe(elem));

        return () => {
            observer.disconnect();
        };
    }, []);

    const scrollToHeading = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="border border-border bg-background p-4 shadow-md">
            <div className="text-xs font-mono text-muted mb-4 border-b border-border pb-2 flex justify-between">
                <span>outline.txt</span>
                <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-border"></span>
                    <span className="w-2 h-2 rounded-full bg-border"></span>
                </div>
            </div>

            <nav className="space-y-2">
                {headings.map((heading) => (
                    <button
                        key={heading.id}
                        onClick={() => scrollToHeading(heading.id)}
                        className={`block text-left text-xs font-mono transition-colors w-full ${heading.level === 3 ? 'pl-4' : ''
                            } ${activeId === heading.id
                                ? 'text-[var(--pastel-orange)] font-bold'
                                : 'text-foreground hover:text-[var(--pastel-orange)]'
                            }`}
                    >
                        {heading.level === 2 && '▸ '}
                        {heading.level === 3 && '  • '}
                        {heading.text}
                    </button>
                ))}
            </nav>
        </div>
    );
}
