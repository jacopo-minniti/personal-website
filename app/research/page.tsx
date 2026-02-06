'use client';

import { useState } from 'react';
import TerminalCard from "@/components/TerminalCard";

interface Paper {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  conference?: string;
  year: string;
  abstract: string;
  keywords: string[];
  journalUrl?: string;
  preprintUrl?: string; // Arxiv
  preregistrationUrl?: string;
  bibtex?: string;
}

const papers: Paper[] = [
  {
    id: "p1",
    title: "Challenges in Inference-Time Scaling with Uncertainty-Aware Tree Search",
    journal: "",
    authors: ["Minniti, J.", "Band, N.", "Rudner, T. G. J."],
    conference: "ICLR [Under Review]",
    year: "2026",
    abstract: "Inference-time search has emerged as a powerful paradigm for scaling the reasoning capabilities of large language models. Standard approaches, such as beam search, rely on process reward models (PRMs) to provide dense, step-by-step scoring to identify promising reasoning paths. However, scaling these methods results in a known failure mode: as compute budgets increase, the search algorithm encounters out-of-distribution states that are spuriously assigned high value, decoupling the proxy reward from actual reasoning ability.  To address this issue, we propose Uncertainty-Aware Tree Search (UATS). Rather than relying solely on PRM value estimates, UATS uses a process uncertainty model (PUM) to predict when the value model's predictions are likely unreliable. UATS uses PUM predictions to dynamically allocate computational resources, increasing the branching factor at high-uncertainty nodes to resolve ambiguity through exploration.  In our empirical evaluation, we find that while PUMs perform well on held-out in-distribution data, strong in-distribution generalization does not translate into improved downstream inference-time uncertainty-guided search. On instruction-tuned models, UATS matches standard beam search, whereas when applied to reasoning models, it consistently and counterintuitively degrades performance as inference-time compute grows. This failure is an instructive negative result, as it suggests that the search-induced distribution shift that leads to poor generalization for PRMs also leads to poor generalization for process uncertainty models. Our results demonstrate that uncertainty-guided inference-time scaling requires robust process uncertainty models that remain reliable under search-induced distribution shift.",
    keywords: ["Uncertainty Quantification", "Reasoning Scaling", "LLMs"],
  },
  {
    id: "p2",
    authors: ["Chen, P.", "Hulme, R.C.", "Minniti, J.", "Lee, C.L.", "Rodd, J.M."],
    journal: "Journal of Memory and Language [Under Review]",
    conference: "CLDC 12 [Under Review]",
    year: "2025",
    title: "Effects of Age, Semantic Relatedness, and Vocabulary Knowledge on Learning New Word Meanings",
    abstract: "This study investigates whether ageing, pre-existing semantic knowledge (e.g., meaning relatedness), and individual vocabulary knowledge influence the learning of form-meaning associations and the acquisition of semantic features of new meanings for familiar words. Our recent study found that older participants recalled fewer newly learned meanings than younger adults. Participants also recalled more related than unrelated new meanings, and those with higher vocabulary scores retrieved more newly learned meanings overall (Chen et al., 2024; Hulme et al., 2024). Interestingly, when any information about a new meaning was recalled, older adults retrieved as many semantic features as younger adults. Similarly, participants recalled a comparable number of semantic features for related and unrelated new meanings. However, individuals with higher vocabulary scores recalled more semantic features overall (Chen et al., 2024; Hulme et al., 2024; Maciejewski et al., 2019; Rodd et al., 2012). In light of these findings, we hypothesise that ageing and meaning relatedness will impact form-meaning association learning but not semantic feature acquisition. In contrast, individual vocabulary knowledge is expected to influence both processes.",
    keywords: ["Psycholinguistics", "Semantic Feature Acquisition"],
    preregistrationUrl: "https://osf.io/ajcrh/overview",
  }
];

export default function ResearchPage() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleAbstract = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const copyBibtex = (e: React.MouseEvent, id: string, bibtex: string) => {
    e.preventDefault();
    navigator.clipboard.writeText(bibtex);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
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

                  <div className="flex items-center gap-2 md:self-start mt-2 md:mt-1.5">
                    <span className={`text-xs text-[var(--pastel-orange)] font-mono transition-all duration-300 min-w-[80px] text-right`}>
                      {openId === paper.id ? '[COLLAPSE]' : '[EXPAND]'}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs font-bold bg-[var(--pastel-blue)]/10 text-[var(--pastel-blue)] px-2 py-1 rounded border border-[var(--pastel-blue)]/20 font-mono">
                      {paper.journal}
                    </span>
                    {paper.conference && (
                      <span className="text-xs font-bold bg-[var(--pastel-purple)]/10 text-[var(--pastel-purple)] px-2 py-1 rounded border border-[var(--pastel-purple)]/20 font-mono">
                        {paper.conference}
                      </span>
                    )}
                    <span className="text-xs font-bold bg-white/5 text-muted px-2 py-1 rounded border border-white/10 font-mono">
                      {paper.year}
                    </span>
                    {paper.preprintUrl && (
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
                                    ${openId === paper.id ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}
                                `}
              >
                <div className="p-6 bg-black/20 relative">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-muted mb-2 font-mono">Abstract</h3>
                  <p className="text-sm text-muted/90 font-mono leading-relaxed mb-6 whitespace-pre-line">
                    {paper.abstract}
                  </p>

                  <div className="flex flex-wrap gap-4 relative z-10 w-full mb-8">
                    {paper.journalUrl && (
                      <a
                        href={paper.journalUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-bold border border-[var(--pastel-orange)] text-[var(--pastel-orange)] hover:bg-[var(--pastel-orange)] hover:text-background px-4 py-2 rounded transition-colors font-mono"
                      >
                        View Journal Submission
                      </a>
                    )}
                    {paper.preprintUrl && (
                      <a
                        href={paper.preprintUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-bold border border-[var(--pastel-orange)] text-[var(--pastel-orange)] hover:bg-[var(--pastel-orange)] hover:text-background px-4 py-2 rounded transition-colors font-mono"
                      >
                        View Preprint (Arxiv)
                      </a>
                    )}
                    {paper.preregistrationUrl && (
                      <a
                        href={paper.preregistrationUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-bold border border-[var(--pastel-orange)] text-[var(--pastel-orange)] hover:bg-[var(--pastel-orange)] hover:text-background px-4 py-2 rounded transition-colors font-mono"
                      >
                        View Preregistration
                      </a>
                    )}
                    {paper.bibtex && (
                      <button
                        onClick={(e) => copyBibtex(e, paper.id, paper.bibtex!)}
                        className="inline-flex items-center gap-2 text-xs font-bold border border-[var(--pastel-orange)] text-[var(--pastel-orange)] hover:bg-[var(--pastel-orange)] hover:text-background px-4 py-2 rounded transition-colors font-mono"
                      >
                        {copiedId === paper.id ? "BibTeX Copied!" : "Copy BibTeX"}
                      </button>
                    )}
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