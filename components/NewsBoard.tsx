import TerminalCard from './TerminalCard';
import { newsItems } from '@/lib/home-data';

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

                </div>
            </div>
        </TerminalCard>
    );
}