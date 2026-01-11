import TerminalCard from './TerminalCard';

const newsItems = [
    {
        date: "2024-05-15",
        title: "New Research Paper Published",
        content: "My latest work on agentic reasoning has been accepted at NeurIPS 2024. Check the research page for the preprint."
    },
    {
        date: "2024-04-02",
        title: "Launched Personal Website v2.0",
        content: "Redesigned the entire portfolio using Next.js and a custom terminal-inspired theme. Open source on GitHub."
    },
    {
        date: "2024-03-10",
        title: "Speaker at AI Summit",
        content: "Gave a talk about the future of LLMs and their application in creative writing. Slides available soon."
    }
];

export default function NewsBoard() {
    return (
        <TerminalCard title="news_feed.log" className="w-full">
            <div className="p-4 max-h-[400px] overflow-y-auto font-mono text-sm relative custom-scrollbar">
                <div className="space-y-4">
                    {newsItems.map((item, index) => (
                        <details key={index} className="group cursor-pointer">
                            <summary className="list-none flex gap-2 text-muted hover:text-[var(--pastel-orange)] transition-colors">
                                <span className="text-[var(--pastel-orange)] font-bold mr-1 group-open:rotate-90 transition-transform inline-block">
                                    &gt;
                                </span>
                                <span className="opacity-70">[{item.date}]</span>
                                <span className="font-bold text-foreground group-hover:text-[var(--pastel-orange)]">
                                    {item.title}
                                </span>
                            </summary>
                            <div className="mt-2 pl-6 text-muted border-l border-border ml-1.5 opacity-90 leading-relaxed">
                                {item.content}
                            </div>
                        </details>
                    ))}

                    {/* Formatting cursor at the end */}
                    <div className="mt-4 animate-pulse text-accent font-bold">
                        _
                    </div>
                </div>
            </div>
        </TerminalCard>
    );
}
