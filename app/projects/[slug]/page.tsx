import type { Metadata } from 'next';
import Link from 'next/link';
import { ExternalLink, Github } from 'lucide-react';
import { notFound } from 'next/navigation';
import ConvmindsDemo from '@/components/ConvmindsDemo';
import ProjectCover from '@/components/ProjectCover';
import { getProject, getSortedProjects } from '@/lib/projects';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getSortedProjects().map((project) => ({ slug: project.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return { title: 'Project Not Found' };

  return {
    title: project.title,
    description: project.subtitle,
    openGraph: {
      title: project.title,
      description: project.subtitle,
      images: [],
    },
  };
}

function MetaPanel({ project }: { project: NonNullable<ReturnType<typeof getProject>> }) {
  return (
    <aside className="h-fit border border-border bg-background p-4 shadow-md lg:sticky lg:top-32">
      <div className="mb-4 flex items-center justify-between border-b border-border pb-2 font-mono text-xs text-muted">
        <span className="flex gap-1">
          <span className="h-2 w-2 rounded-full bg-border" />
          <span className="h-2 w-2 rounded-full bg-border" />
          <span className="h-2 w-2 rounded-full bg-border" />
        </span>
        <span>project.json</span>
      </div>
      <dl className="space-y-3 text-xs font-mono leading-relaxed">
        <div>
          <dt className="text-muted">status</dt>
          <dd className="text-[var(--pastel-orange)]">{project.status}</dd>
        </div>
        <div>
          <dt className="text-muted">started</dt>
          <dd>{new Date(project.date).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</dd>
        </div>
        <div>
          <dt className="text-muted">stack</dt>
          <dd className="mt-1 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span key={tag} className="border border-[var(--pastel-orange)]/70 px-1.5 py-0.5 text-[var(--pastel-orange)]">#{tag}</span>
            ))}
          </dd>
        </div>
      </dl>
      <a
        href={project.repositoryUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-5 flex items-center justify-center gap-2 border border-border px-3 py-2 text-xs font-mono transition-colors hover:border-[var(--pastel-cyan)] hover:text-[var(--pastel-cyan)]"
      >
        <Github size={14} />
        repository
        <ExternalLink size={12} />
      </a>
    </aside>
  );
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  if (project.id !== 'convminds') notFound();

  return (
    <div className="min-h-screen pb-16">
      <div className="relative mb-10 h-[42vh] min-h-[350px] overflow-hidden border-b border-border">
        <ProjectCover />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/10" />
        <header className="absolute bottom-7 left-6 max-w-4xl border border-white/10 bg-black/70 px-5 py-4 backdrop-blur-sm md:bottom-10 md:left-12 md:px-6">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[var(--pastel-cyan)]">project / {project.status}</p>
          <h1 className="font-mono text-4xl font-bold leading-tight text-white drop-shadow-md md:text-6xl">{project.title}</h1>
          <p className="mt-3 max-w-2xl font-mono text-sm leading-relaxed text-slate-300 md:text-base">{project.subtitle}</p>
          <div className="mt-4 flex items-center gap-3 font-mono text-xs text-gray-400">
            <span>{new Date(project.date).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</span>
            <span className="h-1 w-1 rounded-full bg-gray-500" />
            <span>early build</span>
          </div>
        </header>
      </div>

      <div className="mx-auto grid max-w-[1280px] gap-10 px-6 lg:grid-cols-[minmax(0,1fr)_260px]">
        <article className="max-w-3xl font-mono text-[15px] leading-relaxed text-foreground">
          <p className="text-lg leading-relaxed text-slate-300">
            Convergent Minds is an early PyTorch codebase for asking one controlled question: can a time-aligned fMRI trace add predictive information to a language model that already has the preceding text?
          </p>

          <div className="mt-6 border-l-2 border-[var(--pastel-cyan)] bg-[var(--pastel-cyan)]/5 px-5 py-4 text-sm leading-relaxed text-slate-300">
            <span className="font-bold text-[var(--pastel-cyan)]">The constraint:</span> compare the brain-conditioned model with the same frozen model and the same text context. If the brain input does not improve the held-out prediction, the honest answer is that it did not help.
          </div>

          <h2 className="mt-12 text-2xl font-bold text-white">What one sample means</h2>
          <p className="mt-4 text-muted">
            The current Huth alignment path turns a narrated story into small time-locked examples. Text from the previous three repetition times becomes the language-model context. A target text segment begins at the next time point. The model receives four fMRI frames after that target, where the delayed BOLD response should carry information about it.
          </p>
          <div className="mt-5 grid gap-2 text-center font-mono text-xs sm:grid-cols-[1fr_28px_1fr_28px_1fr] sm:items-stretch">
            <div className="border border-border bg-black/10 p-3 text-muted">context<br /><span className="text-[var(--pastel-orange)]">t−3 … t−1</span></div>
            <div className="hidden self-center text-[var(--pastel-purple)] sm:block">→</div>
            <div className="border border-border bg-black/10 p-3 text-muted">target segment<br /><span className="text-[var(--pastel-green)]">t</span></div>
            <div className="hidden self-center text-[var(--pastel-purple)] sm:block">←</div>
            <div className="border border-border bg-black/10 p-3 text-muted">BOLD window<br /><span className="text-[var(--pastel-cyan)]">t+1 … t+4</span></div>
          </div>

          <h2 className="mt-12 text-2xl font-bold text-white">What is currently implemented</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="border border-border p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--pastel-cyan)]">alignment</p>
              <p className="mt-2 text-sm text-muted">Reduce each subject&apos;s BOLD signal to 1,000 PCA features, normalize each story run, and preserve the timing needed for the experiment.</p>
            </div>
            <div className="border border-border p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--pastel-purple)]">intervention</p>
              <p className="mt-2 text-sm text-muted">Keep GPT-2 frozen; use a cross-attention adapter to add a small residual vector at one or more transformer layers.</p>
            </div>
            <div className="border border-border p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--pastel-green)]">training</p>
              <p className="mt-2 text-sm text-muted">First learn the hidden-state shift with MSE; then optimize next-token cross-entropy while steering only target tokens.</p>
            </div>
          </div>

          <h2 className="mt-12 text-2xl font-bold text-white">The intervention</h2>
          <p className="mt-4 text-muted">
            The adapter receives a 4 × 1,000 brain window. It turns the language model&apos;s current hidden state into a query and the brain frames into keys and values. Its output is a residual shift added to the selected transformer layer. The lower and upper parts of the language model remain intact; only the small adapter learns.
          </p>

          <ConvmindsDemo />

          <h2 className="mt-12 text-2xl font-bold text-white">What needs to be shown before a result means anything</h2>
          <div className="mt-5 space-y-3 text-sm text-muted">
            <div className="border border-border p-4"><span className="font-bold text-[var(--pastel-orange)]">01 / Same-context baseline.</span> The brain-conditioned model should be compared with the frozen language model given exactly the same transcript context.</div>
            <div className="border border-border p-4"><span className="font-bold text-[var(--pastel-orange)]">02 / Wrong-time control.</span> Shifting the BOLD window before the target event should remove any apparent effect. Otherwise slow drift or story-level correlations may be doing the work.</div>
            <div className="border border-border p-4"><span className="font-bold text-[var(--pastel-orange)]">03 / Leakage audit.</span> Stateful preprocessing must be fitted on training data only. The generic data module supports that rule; the current Huth alignment path still needs a formal audit before I would trust a score.</div>
          </div>

          <h2 className="mt-12 text-2xl font-bold text-white">Repository window</h2>
          <p className="mt-4 text-muted">
            This is the core adapter, in abbreviated form. The language hidden state chooses what to read from the BOLD window; the result is mapped back into the language model&apos;s hidden space.
          </p>
          <div className="mt-5 overflow-hidden border border-border bg-[#0d1117] shadow-[6px_6px_0px_rgba(48,54,61,0.35)]">
            <div className="flex items-center justify-between border-b border-border bg-white/5 px-4 py-2">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
              </div>
              <span className="font-mono text-xs text-foreground/80"><span className="text-[var(--pastel-green)]">$</span> cat convminds/models/residual_steer.py</span>
            </div>
            <pre className="overflow-x-auto p-5 text-xs leading-6 text-slate-300"><code><span className="text-[var(--pastel-purple)]">class</span> <span className="text-[var(--pastel-cyan)]">BrainSteerAdapter</span>(nn.Module):{`\n`}  <span className="text-muted"># Map four BOLD frames to an LLM-space residual.</span>{`\n`}{`\n`}  <span className="text-[var(--pastel-purple)]">def</span> forward(self, brain_window, hidden_query):{`\n`}    keys = self.W_K(brain_window){`\n`}    values = self.W_V(brain_window){`\n`}    query = self.W_Q(hidden_query){`\n`}    attended, _ = self.attn(query, keys, values){`\n`}    <span className="text-[var(--pastel-purple)]">return</span> self.mlp(attended)</code></pre>
            <div className="border-t border-border px-5 py-3">
              <a href={project.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs text-[var(--pastel-cyan)] hover:underline">
                Open the current source on GitHub <ExternalLink size={13} />
              </a>
            </div>
          </div>

          <h2 className="mt-12 text-2xl font-bold text-white">Scope</h2>
          <p className="mt-4 text-muted">
            No decoding result is claimed here. This is research infrastructure in progress, not a finished decoder or a clinical tool. The near-term aim is simple: make one held-out, time-controlled comparison that is hard to misread, then publish the trace whether the brain signal helps or not.
          </p>

          <Link href="/projects" className="mt-12 inline-block text-sm text-[var(--pastel-orange)] hover:underline">← all projects</Link>
        </article>

        <MetaPanel project={project} />
      </div>
    </div>
  );
}
