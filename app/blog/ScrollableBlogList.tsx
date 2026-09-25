"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PostData } from '@/lib/posts';
import TerminalCard from '@/components/TerminalCard';

interface ScrollableBlogListProps {
    posts: PostData[];
    allTags: string[];
}

export default function ScrollableBlogList({ posts, allTags }: ScrollableBlogListProps) {
    const [selectedSection, setSelectedSection] = useState<string | null>(null);

    const visibleSections = selectedSection ? allTags.filter((section) => section === selectedSection) : allTags;

    const sectionAccent = [
        'text-[var(--pastel-cyan)] border-[var(--pastel-cyan)]/40',
        'text-[var(--pastel-purple)] border-[var(--pastel-purple)]/40',
        'text-[var(--pastel-green)] border-[var(--pastel-green)]/40',
        'text-[var(--pastel-yellow)] border-[var(--pastel-yellow)]/40',
    ];

    const sectionSelectedAccent = [
        'border-[var(--pastel-cyan)] bg-[var(--pastel-cyan)] text-black',
        'border-[var(--pastel-purple)] bg-[var(--pastel-purple)] text-black',
        'border-[var(--pastel-green)] bg-[var(--pastel-green)] text-black',
        'border-[var(--pastel-yellow)] bg-[var(--pastel-yellow)] text-black',
    ];

    const sectionBarAccent = [
        'bg-[var(--pastel-cyan)]',
        'bg-[var(--pastel-purple)]',
        'bg-[var(--pastel-green)]',
        'bg-[var(--pastel-yellow)]',
    ];

    const renderPostCard = (post: PostData) => {
        return (
            <TerminalCard key={post.id} className="group flex h-full flex-col transition-transform duration-300 hover:-translate-y-1" title="">
                <div className="flex items-center justify-between border-b border-border bg-white/5 px-3 py-2">
                    <div className="flex gap-1.5">
                        <div className="h-2.5 w-2.5 rounded-full border border-[#e0443e] bg-[#ff5f56]"></div>
                        <div className="h-2.5 w-2.5 rounded-full border border-[#dea123] bg-[#ffbd2e]"></div>
                        <div className="h-2.5 w-2.5 rounded-full border border-[#1aab29] bg-[#27c93f]"></div>
                    </div>
                    <span aria-hidden="true" />
                </div>

                <Link href={`/blog/${post.id}`} className="flex h-full flex-col">
                    <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-border">
                        <Image
                            src={post.thumbnail || '/background.jpg'}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>
                    <div className="flex flex-1 flex-col bg-background p-4">
                        <span className="mb-3 font-mono text-xs text-muted/60">
                            {new Date(post.date).toLocaleDateString()}
                        </span>
                        <h2 className="mb-2 font-mono text-lg font-bold text-foreground transition-colors group-hover:text-[var(--pastel-orange)]">
                            {post.title}
                        </h2>
                        <h3 className="flex-1 text-sm font-light text-muted">
                            {post.subtitle}
                        </h3>
                    </div>
                </Link>
            </TerminalCard>
        );
    };

    return (
        <div>
            {/* Section Filters */}
            <div className="mb-12 flex flex-wrap justify-center gap-3">
                <button
                    onClick={() => setSelectedSection(null)}
                    className={`rounded-md border px-4 py-2 font-mono text-sm transition-all ${selectedSection === null
                        ? 'border-[var(--pastel-orange)] bg-[var(--pastel-orange)] text-black'
                        : 'border-border bg-background text-muted hover:border-[var(--pastel-orange)] hover:text-[var(--pastel-orange)]'
                        }`}
                >
                    [All]
                </button>
                {allTags.map((section, index) => {
                    const isSelected = selectedSection === section;
                    const accent = sectionAccent[index % sectionAccent.length];
                    const selectedAccent = sectionSelectedAccent[index % sectionSelectedAccent.length];

                    return (
                        <button
                            key={section}
                            onClick={() => setSelectedSection(isSelected ? null : section)}
                            className={`rounded-md border px-4 py-2 font-mono text-sm transition-all hover:scale-105 ${isSelected
                                ? `${selectedAccent} font-bold`
                                : `bg-transparent ${accent}`
                                }`}
                        >
                            {section}
                        </button>
                    );
                })}
            </div>

            <div className="space-y-14">
                {visibleSections.map((section) => {
                    const sectionPosts = posts.filter((post) => post.tags.includes(section));
                    const sectionIndex = allTags.indexOf(section);
                    if (sectionPosts.length === 0) return null;

                    return (
                        <section key={section}>
                            <div className="mb-7 flex items-center gap-5">
                                <div className={`h-12 w-1 rounded-full ${sectionBarAccent[sectionIndex % sectionBarAccent.length]}`} />
                                <div className="font-mono">
                                    <div className="mb-1 flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted">
                                        <span className="text-[var(--pastel-orange)]">$</span>
                                        <span>cat section</span>
                                    </div>
                                    <h2 className="text-3xl font-bold leading-none text-white md:text-4xl">
                                        {section}
                                    </h2>
                                </div>
                                <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                            </div>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                                {sectionPosts.map(renderPostCard)}
                            </div>
                        </section>
                    );
                })}
            </div>
        </div>
    );
}
