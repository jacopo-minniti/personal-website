import TerminalCard from "@/components/TerminalCard";

export default function AboutPage() {
    return (
        <div className="min-h-screen py-20 px-6 max-w-5xl mx-auto flex flex-col justify-center">
            <TerminalCard title="about_me.txt" className="h-full">
                <div className="p-8 font-mono text-sm leading-relaxed text-muted space-y-6">

                    <p>
                        <span className="text-[var(--pastel-blue)] font-bold">Hello!</span>{" "}
                        My name is <strong>Jacopo</strong>, I come from Italy and I am currently an international student at{" "}
                        <strong>Minerva University</strong>. I am at the beginning of my academic journey, and I plan to pursue graduate studies in the future.
                    </p>

                    <p>
                        <strong>Research</strong> is the one thing I could not imagine living without. It is what I think about when I wake up and what stays with me at night.
                        I was drawn to <span className="text-foreground font-bold">machine learning</span> as a teenager, and since then my focus has been on understanding intelligence from first principles.
                        My main intellectual interest is developing a <strong>rigorous mathematical theory of intelligence</strong>, one that helps us understand ourselves through machines and improve machines through a deeper understanding of natural minds.
                    </p>

                    <p>
                        I study <strong>mathematics and artificial intelligence</strong>, with a minor in neuroscience.
                        If you are interested, you can take a look at my{" "}
                        <a
                            href="https://drive.google.com/file/d/1yA7M9ndzsz5b96wZfPJRGAkEDkoCoO7e/view"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline decoration-[var(--pastel-orange)] hover:text-foreground transition-colors"
                        >
                            resume
                        </a>.
                    </p>

                    <p>
                        Beyond AI and math, my interests are broad. In general, I deeply believe in the power of reason and in a formal analysis of the world.
                        There is a quote by the Italian writer Calvino that roughly says:
                    </p>

                    <div className="border-l-2 border-[var(--pastel-orange)] pl-4 italic opacity-80 my-6">
                        “This story that reason is in crisis is starting to get old.”
                    </div>

                    <p>
                        There is very little that cannot be explained with reason. Things are not irrational, they are complex.
                        The so-called “irrational” is often nothing more than a large-scale, stochastic system that would require far more equations to describe than the classical textbook problem.
                    </p>

                    <p>
                        I am also very passionate about the <strong>science of learning</strong>, and I firmly believe that creating an equal and functional education system is at the base of every functioning society.
                        As hobbies, I enjoy hiking and drinking good coffee. Big fan. Maybe a bit too much.
                    </p>

                    <p className="text-xs opacity-50 pt-4">
                        -- End of file --
                    </p>

                </div>
            </TerminalCard>
        </div>
    );
}
