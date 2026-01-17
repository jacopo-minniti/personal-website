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
  keywords: string[];
  arxiv?: string; // Optional Arxiv ID or Link
}

const papers: Paper[] = [
  {
    id: "p1",
    title: "Interpreting LLM–Brain Alignment Through Shared Inductive Biases",
    authors: ["Minniti, J."],
    journal: "Abstract submitted to HSP 2026",
    year: "2025",
    abstract: "Large Language Models (LLMs) allow us to probe human language processing in a direct way by comparing their sentence representations to activity in the human Language Network (LN). In this setting, high “brain scores”—correlations between LLM sentence representations and LN fMRI responses—are often taken as evidence of shared computational principles (Goldstein et al., 2022). However, such scores can be inflated by trivial properties such as sentence length (Feghhi et al., 2024), and mechanistic differences between biological and artificial networks make it unclear which aspects of sentence processing this alignment actually reflects.\n\nWe therefore ask how to embed brain scores in a principled framework where they provide evidence about *shared inductive biases* (IBs) between LLMs and the LN. Inductive biases are a natural level of analysis for alignment work, yet they have so far played only an informal role. Our contribution is twofold. First, motivated by the goal of using high alignment as evidence about key computational components of human language processing, we propose a framework for studying shared IBs in language tasks. Second, we design experiments that begin to validate this framework and demonstrate how it can be applied to analyze alignment results.\n\nWe focus on the Pereira et al. (2018) fMRI dataset (N = 384 short, read English sentences grouped by topic). Following AlKhamissi et al. (2024), we retain only the top 512 most LN-aligned LLM units and fit voxel-wise ridge regression decoders from LLM representations to fMRI responses.",
    link: "#",
    keywords: ["Inductive Biases", "NeuroAI", "LLMs"],
    arxiv: ""
  },
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
          Selected publications and preprints. <strong>Some papers have been submitted or are currently in writing, they are going to be listed here soon.</strong> Click on an entry to view the abstract.
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
                    <div className="text-sm text-muted font-mono">
                      {paper.authors.map((author, i) => (
                        <span key={i} className={author.includes("Minniti") ? "text-foreground font-bold" : ""}>
                          {author}{i < paper.authors.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 md:self-start mt-2 md:mt-0">
                    <span className={`text-xs text-[var(--pastel-orange)] font-mono transition-transform duration-300 ${openId === paper.id ? 'rotate-90' : ''}`}>
                      [EXPAND]
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
                  <div className="flex flex-wrap gap-2">
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
                  <div className="text-xs text-muted font-mono text-right">
                    <span className="font-bold opacity-60 mr-1">Keywords:</span>
                    <span className="italic">{paper.keywords.map(k => `#${k}`).join(", ")}</span>
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
                <div className="p-6 bg-black/20 relative">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-muted mb-2 font-mono">Abstract</h3>
                  <p className="text-sm text-muted/90 font-mono leading-relaxed mb-6 whitespace-pre-line">
                    {paper.abstract}
                  </p>

                  <div className="flex gap-4 relative z-10">
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

                  {/* Minimalist Visualization */}
                  <div className="absolute bottom-4 right-4 opacity-20 pointer-events-none">
                    <svg width="100" height="60" viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="20" cy="30" r="3" className="fill-current text-muted" />
                      <circle cx="50" cy="10" r="3" className="fill-current text-muted" />
                      <circle cx="50" cy="50" r="3" className="fill-current text-muted" />
                      <circle cx="80" cy="30" r="3" className="fill-current text-muted" />
                      <path d="M20 30 L50 10" className="stroke-current text-muted" strokeWidth="1" />
                      <path d="M20 30 L50 50" className="stroke-current text-muted" strokeWidth="1" />
                      <path d="M50 10 L80 30" className="stroke-current text-muted" strokeWidth="1" />
                      <path d="M50 50 L80 30" className="stroke-current text-muted" strokeWidth="1" />
                      <path d="M50 10 L50 50" className="stroke-current text-muted" strokeWidth="1" strokeDasharray="4 2" />
                    </svg>
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
