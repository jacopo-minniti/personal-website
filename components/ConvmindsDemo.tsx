'use client';

import { useEffect, useMemo, useState } from 'react';

const examples = [
  {
    prompt: 'the path led through the',
    target: 'garden',
    base: [
      ['park', 31],
      ['woods', 24],
      ['garden', 16],
    ],
    steered: [
      ['garden', 38],
      ['park', 25],
      ['woods', 17],
    ],
  },
  {
    prompt: 'she listened to the',
    target: 'music',
    base: [
      ['sound', 29],
      ['song', 22],
      ['music', 18],
    ],
    steered: [
      ['music', 41],
      ['song', 24],
      ['sound', 15],
    ],
  },
  {
    prompt: 'the boat crossed the',
    target: 'river',
    base: [
      ['water', 27],
      ['lake', 23],
      ['river', 17],
    ],
    steered: [
      ['river', 39],
      ['water', 22],
      ['lake', 15],
    ],
  },
  {
    prompt: 'he opened the old',
    target: 'book',
    base: [
      ['door', 25],
      ['box', 20],
      ['book', 18],
    ],
    steered: [
      ['book', 36],
      ['box', 21],
      ['door', 14],
    ],
  },
];

function SignalGrid({ step, frame, steered }: { step: number; frame: number; steered: boolean }) {
  const dots = useMemo(() => Array.from({ length: 36 }), []);

  return (
    <div className="grid grid-cols-6 gap-1 rounded-md border border-border bg-black/20 p-2">
      {dots.map((_, index) => {
        const phase = (index * 5 + step * 7 + frame * 3) % 17;
        const signal = (Math.sin((index + step * 3 + frame * 2) * 0.75) + 1) / 2;
        const active = signal > 0.66;

        return (
          <span
            key={index}
            className={`aspect-square rounded-full transition-all duration-500 ${active ? 'bg-[var(--pastel-cyan)]' : 'bg-slate-700'}`}
            style={{
              opacity: 0.22 + signal * 0.78,
              transform: `scale(${0.55 + signal * 0.45}) translateY(${steered && phase > 11 ? '-2px' : '0'})`,
              boxShadow: active ? '0 0 12px rgba(155, 246, 255, 0.55)' : 'none',
            }}
          />
        );
      })}
    </div>
  );
}

export default function ConvmindsDemo() {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [steered, setSteered] = useState(true);
  const example = examples[step];
  const distribution = steered ? example.steered : example.base;

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(() => setStep((current) => (current + 1) % examples.length), 1100);
    return () => window.clearInterval(timer);
  }, [isPlaying]);

  return (
    <section className="my-12 border border-border bg-[#101722] shadow-[8px_8px_0px_rgba(48,54,61,0.35)]">
      <div className="flex flex-col gap-4 border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-sm font-bold text-[var(--pastel-cyan)]">mechanism sketch</p>
          <p className="mt-1 text-xs text-muted">Synthetic values only. This is not a decoding result.</p>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono">
          <button
            type="button"
            onClick={() => setIsPlaying((current) => !current)}
            className="border border-border px-3 py-1.5 text-foreground transition-colors hover:border-[var(--pastel-cyan)] hover:text-[var(--pastel-cyan)]"
          >
            {isPlaying ? 'pause trace' : 'play trace'}
          </button>
          <button
            type="button"
            aria-pressed={steered}
            onClick={() => setSteered((current) => !current)}
            className={`border px-3 py-1.5 transition-colors ${steered ? 'border-[var(--pastel-cyan)] text-[var(--pastel-cyan)]' : 'border-border text-muted'}`}
          >
            {steered ? 'brain context: on' : 'brain context: off'}
          </button>
        </div>
      </div>

      <div className="grid gap-5 p-5 lg:grid-cols-[1fr_38px_1fr_38px_1fr] lg:items-center">
        <div>
          <div className="mb-3 flex items-baseline justify-between gap-3">
            <p className="text-xs font-bold uppercase tracking-wider text-muted">1. delayed BOLD window</p>
            <span className="font-mono text-xs text-[var(--pastel-cyan)]">target TR {step + 1}</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((frame) => (
              <div key={frame}>
                <p className="mb-1 text-center font-mono text-[10px] text-muted">t+{frame}</p>
                <SignalGrid step={step} frame={frame} steered={steered} />
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs leading-relaxed text-muted">Four samples after the target event stand in for the delayed BOLD response. The dots are synthetic voxel activity.</p>
        </div>

        <div className="hidden text-center font-mono text-xl text-[var(--pastel-purple)] lg:block">→</div>

        <div className="border-y border-border py-5 lg:border-x lg:border-y-0 lg:px-5">
          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-muted">2. adapter</p>
          <div className="border border-[var(--pastel-purple)]/50 bg-[var(--pastel-purple)]/10 p-4 font-mono text-sm leading-relaxed">
            <p className="text-[var(--pastel-purple)]">brain window</p>
            <p className="my-2 text-muted">↓ cross-attention</p>
            <p className="text-[var(--pastel-green)]">small residual shift</p>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-muted">The base language model stays frozen. The adapter uses its current hidden state as a query and writes a small update at selected layers.</p>
        </div>

        <div className="hidden text-center font-mono text-xl text-[var(--pastel-purple)] lg:block">→</div>

        <div>
          <div className="mb-3 flex items-baseline justify-between gap-3">
            <p className="text-xs font-bold uppercase tracking-wider text-muted">3. next-token distribution</p>
            <span className="font-mono text-xs text-[var(--pastel-green)]">target: {example.target}</span>
          </div>
          <p className="mb-3 border-l-2 border-[var(--pastel-orange)] pl-3 text-sm text-foreground">“{example.prompt} …”</p>
          <div className="space-y-2">
            {distribution.map(([word, value]) => (
              <div key={word as string} className="grid grid-cols-[72px_1fr_36px] items-center gap-2 font-mono text-xs">
                <span className={word === example.target ? 'text-[var(--pastel-cyan)]' : 'text-muted'}>{word as string}</span>
                <div className="h-2 overflow-hidden bg-border">
                  <div
                    className={`h-full transition-all duration-500 ${word === example.target ? 'bg-[var(--pastel-cyan)]' : 'bg-slate-500'}`}
                    style={{ width: `${value}%` }}
                  />
                </div>
                <span className="text-right text-muted">{value as number}%</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs leading-relaxed text-muted">Turn the context off to compare the same toy distribution with the base model.</p>
        </div>
      </div>

      <div className="border-t border-border px-5 py-3 font-mono text-xs text-muted">
        The point is not to recover a word from one signal. It is to test whether a carefully timed brain representation adds useful information beyond the language model&apos;s own context.
      </div>
    </section>
  );
}
