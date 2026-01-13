'use client';

import { useState } from 'react';
import TerminalCard from "@/components/TerminalCard";

interface Paper {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: string;
  abstract: string;
  link: string;
  tags: string[];
  arxiv?: string; // Optional Arxiv ID or Link
}

const papers: Paper[] = [
  {
    id: "p1",
    title: "Agentic Reasoning in Large Language Models",
    authors: ["J. Minniti", "A. Turing", "G. Hinton"],
    journal: "NeurIPS 2024 (Under Review)",
    year: "2024",
    abstract: "This paper explores the emergence of agentic behaviors in LLMs when provided with recursive self-reflection capabilities. We demonstrate a 40% improvement in multi-step reasoning tasks compared to standard chain-of-thought prompting.",
    link: "#",
    tags: ["LLM", "Agents", "Reasoning"],
    arxiv: "2405.12345"
  },
  {
    id: "p2",
    title: "Neuromorphic Computing for Energy Efficient AI",
    authors: ["J. Minniti", "N. Tesla"],
    journal: "Nature Electronics",
    year: "2023",
    abstract: "We propose a new architecture for spiking neural networks that drastically reduces power consumption during inference by leveraging event-driven processing.",
    link: "#",
    tags: ["Hardware", "Neuromorphic", "Green AI"]
  },
  {
    id: "p3",
    title: "The Poetry of Code: Aesthetics in Software Engineering",
    authors: ["J. Minniti"],
    journal: "Journal of Digital Humanities",
    year: "2022",
    abstract: "An essay discussion on the similarities between writing elegant code and composing poetry, arguing for a return to craftsmanship in software development.",
    link: "#",
    tags: ["Philosophy", "Humanities"]
  }
];

export default function ResearchPage() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleAbstract = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="min-h-screen py-20 px-4 md:px-6 max-w-5xl mx-auto">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-mono font-bold text-foreground mb-4">
          <span className="text-[var(--pastel-orange)]">&gt;</span> Research Papers
        </h1>
        <p className="font-mono text-muted text-sm md:text-base max-w-4xl">
          Selected publications and preprints. Click on an entry to view the abstract.
        </p>
      </header>

      <div className="space-y-6">
        {papers.map((paper) => (
          <TerminalCard key={paper.id} title={`paper_${paper.id}.tex`} className="group transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,159,28,0.15)]">
            <div className="p-0">
              {/* Header / Summary */}
              <div
                onClick={() => toggleAbstract(paper.id)}
                className="p-6 cursor-pointer hover:bg-white/5 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold font-mono text-foreground mb-2 group-hover:text-[var(--pastel-orange)] transition-colors">
                      {paper.title}
                    </h2>
                    <div className="text-sm text-muted font-mono mb-2">
                      {paper.authors.map((author, i) => (
                        <span key={i} className={author.includes("Minniti") ? "text-foreground font-bold" : ""}>
                          {author}{i < paper.authors.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="text-xs font-bold bg-[var(--pastel-blue)]/10 text-[var(--pastel-blue)] px-2 py-1 rounded border border-[var(--pastel-blue)]/20 font-mono">
                        {paper.journal}
                      </span>
                      <span className="text-xs font-bold bg-white/5 text-muted px-2 py-1 rounded border border-white/10 font-mono">
                        {paper.year}
                      </span>
                      {paper.arxiv && (
                        <span className="text-xs font-bold bg-[var(--pastel-red)]/10 text-[var(--pastel-red)] px-2 py-1 rounded border border-[var(--pastel-red)]/20 font-mono">
                          Arxiv
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 md:self-start mt-2 md:mt-0">
                    <span className={`text-xs text-[var(--pastel-orange)] font-mono transition-transform duration-300 ${openId === paper.id ? 'rotate-90' : ''}`}>
                      [EXPAND]
                    </span>
                  </div>
                </div>
              </div>

              {/* Expanded Content: Abstract */}
              <div
                className={`
                                    overflow-hidden transition-all duration-500 ease-in-out border-t border-dashed border-border/50
                                    ${openId === paper.id ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
                                `}
              >
                <div className="p-6 bg-black/20">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-muted mb-2 font-mono">Abstract</h3>
                  <p className="text-sm text-muted/90 font-mono leading-relaxed mb-6">
                    {paper.abstract}
                  </p>

                  <div className="flex gap-4">
                    <a
                      href={paper.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-bold text-foreground bg-[var(--pastel-orange)] hover:bg-[var(--pastel-orange)]/80 text-background px-4 py-2 rounded transition-colors font-mono"
                    >
                      View PDF
                    </a>
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 text-xs font-bold text-muted hover:text-foreground border border-border hover:border-foreground px-4 py-2 rounded transition-colors font-mono"
                    >
                      Cite (BibTeX)
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </TerminalCard>
        ))}
      </div>
    </div>
  );
}
