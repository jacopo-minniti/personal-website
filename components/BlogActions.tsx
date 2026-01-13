'use client';

import { useState } from 'react';

export default function BlogActions() {
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy!', err);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="flex flex-col gap-4 no-print">
            <button
                onClick={handleShare}
                className="group border border-border p-2 text-sm text-muted hover:text-[var(--pastel-blue)] hover:border-[var(--pastel-blue)] transition-colors text-left font-mono relative"
            >
                <span className="text-[var(--pastel-blue)] opacity-50 group-hover:opacity-100 mr-2">$</span>
                {copied ? 'link-copied!' : 'share-link'}
            </button>
            <button
                onClick={handlePrint}
                className="group border border-border p-2 text-sm text-muted hover:text-[var(--pastel-red)] hover:border-[var(--pastel-red)] transition-colors text-left font-mono"
            >
                <span className="text-[var(--pastel-red)] opacity-50 group-hover:opacity-100 mr-2">$</span>
                convert-to-pdf
            </button>
        </div>
    );
}
