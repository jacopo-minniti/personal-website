import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import ProjectCover from '@/components/ProjectCover';
import TerminalCard from '@/components/TerminalCard';
import { getSortedProjects } from '@/lib/projects';

export default function ProjectsPage() {
  const projects = getSortedProjects();

  return (
    <div className="mx-auto min-h-screen max-w-7xl px-6 py-10">
      <header className="mb-12 text-center">
        <h1 className="mb-4 font-serif text-4xl font-bold md:text-5xl">Projects</h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">Small research tools, experiments, and things still being worked out.</p>
      </header>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {projects.map((project) => (
          <TerminalCard key={project.id} className="group flex h-full flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1" title="">
            <div className="flex items-center justify-between border-b border-border bg-white/5 px-4 py-2">
              <div className="flex gap-2">
                <span className="h-3 w-3 rounded-full border border-[#e0443e] bg-[#ff5f56]" />
                <span className="h-3 w-3 rounded-full border border-[#dea123] bg-[#ffbd2e]" />
                <span className="h-3 w-3 rounded-full border border-[#1aab29] bg-[#27c93f]" />
              </div>
              <span className="font-mono text-sm font-bold lowercase text-foreground/80"><span className="text-[var(--pastel-cyan)]">$</span> open {project.id}</span>
            </div>
            <Link href={`/projects/${project.id}`} className="flex h-full flex-col">
              <ProjectCover compact />
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <span key={tag} className={`font-mono text-xs font-bold uppercase tracking-wider ${['text-[var(--pastel-cyan)]', 'text-[var(--pastel-purple)]', 'text-[var(--pastel-green)]'][index % 3]}`}>#{tag}</span>
                    ))}
                  </div>
                  <span className="shrink-0 font-mono text-xs text-muted/70">{new Date(project.date).toLocaleDateString()}</span>
                </div>
                <h2 className="font-mono text-xl font-bold text-foreground transition-colors group-hover:text-[var(--pastel-orange)]">{project.title}</h2>
                <p className="mt-2 flex-1 text-sm font-light text-muted">{project.subtitle}</p>
                <div className="mt-5 flex items-center justify-between border-t border-border pt-3 font-mono text-xs">
                  <span className="text-[var(--pastel-orange)]">{project.status}</span>
                  <span className="inline-flex items-center gap-1 text-muted transition-colors group-hover:text-[var(--pastel-cyan)]">open <ArrowUpRight size={14} /></span>
                </div>
              </div>
            </Link>
          </TerminalCard>
        ))}
      </div>
    </div>
  );
}
