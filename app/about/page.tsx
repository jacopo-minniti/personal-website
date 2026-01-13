import Image from "next/image";
import TerminalCard from "@/components/TerminalCard";

export default function AboutPage() {
    return (
        <div className="min-h-screen py-20 px-6 max-w-5xl mx-auto flex flex-col justify-center">

            <TerminalCard title="about_me.txt" className="h-full">
                <div className="p-8 font-mono text-sm leading-relaxed text-muted space-y-6">
                    <p>
                        <span className="text-[var(--pastel-blue)] font-bold">Hello World!</span> I am a researcher and developer passionate about <span className="text-foreground font-bold">Artificial Intelligence</span>, <a href="#" className="underline decoration-[var(--pastel-orange)] hover:text-foreground transition-colors">Neuroscience</a>, and the intersection of technology and creativity.
                    </p>

                    <p>
                        Currently, I am focused on building <strong>agentic systems</strong> that can reason, plan, and execute complex tasks. My work involves deep diving into <a href="https://nextjs.org" target="_blank" className="hover:text-[var(--pastel-orange)]">Next.js</a> for frontend interfaces and Python for backend logic.
                    </p>

                    <p>
                        I believe in open source and knowledge sharing. This website itself is an experiment in <span className="italic">digital aesthetics</span>—trying to bring back the fun of the early web but with modern tech stacks.
                    </p>

                    <div className="border-l-2 border-[var(--pastel-orange)] pl-4 italic opacity-80 my-8">
                        "The best way to predict the future is to invent it."
                    </div>

                    <p>
                        When I'm not coding, you can find me reading philosophy, exploring new coffee shops, or just staring at the terminal screen wondering why my code isn't working (yet).
                    </p>

                    <br />
                    <p className="text-xs opacity-50">
                        -- End of file --
                    </p>
                </div>
            </TerminalCard>
        </div>
    );
}
