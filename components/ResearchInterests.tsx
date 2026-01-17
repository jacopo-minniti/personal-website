
"use client";

import TerminalCard from "./TerminalCard";
import { researchInterests } from "@/lib/home-data";

// Simple syntax highlighter component
function SyntaxHighlighter({ code }: { code: string }) {
    // Basic regex based tokenization for Python-like syntax
    // We use hex codes to avoid regex collisions with CSS var() syntax in the generated HTML

    // Theme Colors
    const colors = {
        muted: "#8b949e",
        green: "#caffbf",
        purple: "#bdb2ff",
        cyan: "#9bf6ff",
        blue: "#a0c4ff"
    };

    const lines = code.split('\n');

    const processLine = (line: string, i: number) => {
        let processed = line;

        // 1. Escape HTML entities
        processed = processed.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

        // 2. Comments (gray)
        const commentMatch = processed.match(/(#.*)/);
        let commentPart = "";
        if (commentMatch) {
            commentPart = `<span style="color: ${colors.muted}">${commentMatch[0]}</span>`;
            processed = processed.replace(commentMatch[0], "___COMMENT___");
        }

        // 3. Strings (pastel-green)
        processed = processed.replace(/(".*?"|'.*?')/g, `<span style="color: ${colors.green}">$1</span>`);

        // 4. Function Definitions/Calls (pastel-cyan) - Run BEFORE keywords to avoid mess
        // Matches word followed by (
        processed = processed.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g, `<span style="color: ${colors.cyan}">$1</span>(`);

        // 5. Keywords (pastel-purple)
        const keywords = ["def", "class", "return", "import", "from", "for", "in", "if", "else", "while", "self", "super", "and", "or", "not", "as", "pass", "None", "True", "False"];
        // We use a negative lookahead to ensure we don't match keywords inside HTML tags (like <span style...)
        // But since we use hex codes, we don't have words like 'def' inside our tags. simple \b is mostly fine.
        // However, 'class' IS in <span class="..."> if we used classes, but we use style.
        // 'in' is not in hex.
        const keywordRegex = new RegExp(`\\b(${keywords.join("|")})\\b`, "g");
        processed = processed.replace(keywordRegex, `<span style="color: ${colors.purple}">$1</span>`);

        // 6. Restore comment
        if (commentMatch) {
            processed = processed.replace("___COMMENT___", commentPart);
        }

        return (
            <div key={i} dangerouslySetInnerHTML={{ __html: processed }} />
        );
    };

    return (
        <pre className="font-mono text-xs overflow-x-auto leading-relaxed text-white/90">
            <code>
                {lines.map((line, i) => processLine(line, i))}
            </code>
        </pre>
    );
}

export default function ResearchInterests() {
    return (
        <TerminalCard title="research_interests.py" className="w-full">
            <div className="p-6 md:p-8 font-mono text-sm text-muted">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">

                    {/* Left Column: Code Blocks */}
                    <div className="space-y-8">
                        {researchInterests.codeSnippets.map((snippet, idx) => (
                            <div key={idx} className="group">
                                <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
                                    <span className="text-[var(--pastel-blue)] font-bold text-xs">{snippet.label}</span>
                                    {/* Removed 'python' text as requested */}
                                </div>
                                <div className="pl-2 border-l-2 border-white/10 group-hover:border-[var(--pastel-orange)] transition-colors">
                                    <SyntaxHighlighter code={snippet.code} />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Column: Docstring & Tech Stack */}
                    <div className="space-y-6 flex flex-col h-full">

                        {/* Docstring */}
                        <div className="flex-1">
                            <div className="text-[var(--pastel-green)] leading-relaxed whitespace-pre-wrap font-mono text-sm opacity-90">
                                {researchInterests.explanation}
                            </div>
                        </div>

                        {/* Tech Stack */}
                        <div className="mt-4 pt-6 border-t border-white/5">
                            <p className="mb-3 font-bold text-xs tracking-wider text-white">
                                <span className="text-[var(--pastel-orange)]">$</span> {researchInterests.stack.command}
                            </p>
                            <div className="flex flex-wrap gap-2.5">
                                {researchInterests.stack.technologies.map((tech) => (
                                    <span key={tech} className="px-2.5 py-1.5 bg-black/40 border border-[var(--pastel-orange)]/30 rounded text-xs text-[var(--pastel-orange)] hover:bg-[var(--pastel-orange)]/10 hover:border-[var(--pastel-orange)] transition-all cursor-default">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </TerminalCard>
    );
}
