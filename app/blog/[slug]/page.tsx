import { getPostData, getSortedPostsData } from '@/lib/posts';
import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import 'katex/dist/katex.min.css'; // Latex styles

// Components for MDX
import Link from 'next/link';

// Components for MDX
import TerminalCard from '@/components/TerminalCard';
import TableOfContents from '@/components/TableOfContents';
import BlogActions from '@/components/BlogActions';

function SideNote({ children, id }: { children: React.ReactNode; id: string }) {
    return (
        <span className="inline-block">
            <label
                htmlFor={`sn-${id}`}
                className="cursor-pointer text-[var(--pastel-orange)] font-bold group align-super text-xs ml-1 hover:underline"
            >
                [{id}]
            </label>
            <input type="checkbox" id={`sn-${id}`} className="peer hidden" />
            <span className="
                hidden peer-checked:block lg:peer-checked:block lg:block
                absolute lg:left-[calc(100%+48px)] left-0
                -translate-y-1/2
                w-[280px]
                p-3 bg-background border-2 border-[var(--pastel-orange)]/50 text-xs text-muted
                shadow-[3px_3px_0px_0px_rgba(255,159,28,0.3)]
                before:content-[''] before:absolute before:bottom-[-6px] before:left-[3px] before:right-[-3px] before:h-[2px] before:bg-[var(--pastel-orange)]/20
                after:content-[''] after:absolute after:bottom-[-9px] after:left-[6px] after:right-[-6px] after:h-[2px] after:bg-[var(--pastel-orange)]/10
                z-10
            ">
                <span className="font-bold text-[var(--pastel-orange)] mr-2">[{id}]</span>
                {children}
            </span>
        </span>
    );
}

const components = {
    SideNote,
    TerminalCard, // Allow using terminal card in posts
};

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const posts = getSortedPostsData();
    return posts.map((post) => ({
        slug: post.id,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostData(slug);

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    return {
        title: post.title,
        description: post.subtitle || `Read ${post.title} on Jacopo Minniti's blog`,
        openGraph: {
            title: post.title,
            description: post.subtitle || `Read ${post.title} on Jacopo Minniti's blog`,
            images: post.thumbnail ? [post.thumbnail] : [],
        },
    };
}

export default async function BlogPost({ params }: Props) {
    const { slug } = await params;
    const post = await getPostData(slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen pb-16">

            {/* Print Header */}
            <div className="hidden print:block mb-8 border-b-2 border-black pb-4">
                <div className="flex items-center gap-4 mb-2">
                    <div>
                        <h1 className="text-2xl font-bold font-serif text-black">{post.title}</h1>
                        <p className="text-sm font-serif text-gray-600">
                            Jacopo Minniti · {new Date(post.date).getFullYear()} · v1.0
                        </p>
                    </div>
                </div>
            </div>

            {/* Top Cover Image */}
            <div className="w-full h-[40vh] md:h-[50vh] relative mb-8 border-b border-border print:hidden">
                <Image
                    src={post.thumbnail || '/background.jpg'}
                    alt={post.title}
                    fill
                    className="object-cover brightness-[0.6]"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>

                <div className="absolute bottom-12 left-6 md:left-12 max-w-4xl">
                    {/* Removed tags from here as requested */}
                    <h1 className="text-3xl md:text-5xl font-mono font-bold mb-2 text-white leading-tight shadow-black drop-shadow-md">
                        {post.title}
                    </h1>
                    <div className="flex items-center gap-4 text-sm font-mono text-gray-400">
                        <span>{new Date(post.date).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
                        <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                        <span>v1.0</span>
                    </div>
                </div>
            </div>


            <div className="px-6 max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-12 relative">
                {/* Left: Operations + Outline (Desktop) */}
                <aside className="hidden lg:block w-40 flex-shrink-0 space-y-6">
                    <div>
                        <div className="text-xs font-bold text-muted uppercase tracking-wider mb-2 font-mono">Operations</div>
                        <BlogActions />
                    </div>


                    <div className="sticky top-32">
                        <TableOfContents />
                    </div>
                </aside>

                {/* Main Content - Centered Box, Left Aligned Text */}
                <main className="flex-1 max-w-2xl w-full">

                    {/* Article Body */}
                    <article className="relative prose prose-invert prose-headings:font-mono prose-p:font-mono prose-a:text-[var(--pastel-orange)] prose-img:border prose-img:border-border prose-pre:bg-[#0d1117] prose-pre:border prose-pre:border-border max-w-none text-left overflow-visible
                        prose-p:text-[15px] prose-p:leading-relaxed prose-p:mb-4
                        prose-headings:mb-4 prose-headings:mt-8
                        prose-h2:text-2xl prose-h3:text-xl
                        prose-li:text-[15px] prose-li:leading-relaxed prose-li:my-1
                        prose-ul:my-4 prose-ol:my-4
                    ">
                        <MDXRemote
                            source={post.content}
                            components={components}
                            options={{
                                mdxOptions: {
                                    remarkPlugins: [remarkMath],
                                    rehypePlugins: [rehypeKatex],
                                }
                            }}
                        />
                    </article>
                </main>

                {/* Right Column: Metadata */}
                <div className="hidden lg:block w-[280px] flex-shrink-0">

                    {/* Small Cute Window Box for Meta */}
                    <div className="border border-border bg-background p-4 shadow-md">
                        <div className="text-xs font-mono text-muted mb-4 border-b border-border pb-2 flex justify-between">
                            <span>metadata.json</span>
                            <div className="flex gap-1">
                                <span className="w-2 h-2 rounded-full bg-border"></span>
                                <span className="w-2 h-2 rounded-full bg-border"></span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map(tag => (
                                <span key={tag} className="text-xs font-bold text-[var(--pastel-orange)] border border-[var(--pastel-orange)] px-1 py-0.5 rounded-sm font-mono opacity-80 decoration-0">
                                    #{tag}
                                </span>
                            ))}
                        </div>

                        <div className="text-xs text-muted font-mono leading-relaxed">
                            <span className="opacity-50">Subtitle:</span> <br />
                            {post.subtitle}
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
}
