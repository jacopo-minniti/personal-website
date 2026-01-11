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
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    // Strict order: AI, neuroscience, mathematics, philosophy, novel, poetry
    // But we should use the tags passed in `allTags` but reordered.
    const priorityOrder = ['AI', 'neuroscience', 'mathematics', 'philosophy', 'novel', 'poetry'];

    // Filter and sort available tags based on priority
    const displayTags = priorityOrder.filter(t => allTags.includes(t));
    // Add any remaining tags that are not in the priority list at the end
    const otherTags = allTags.filter(t => !priorityOrder.includes(t));
    const finalTags = [...displayTags, ...otherTags];


    const filteredPosts = selectedTag
        ? posts.filter(post => post.tags.includes(selectedTag))
        : posts;

    // Pastel colors for hashes
    const tagColors = [
        'bg-[#ffadad] text-black border-[#ffadad]',
        'bg-[#caffbf] text-black border-[#caffbf]',
        'bg-[#a0c4ff] text-black border-[#a0c4ff]',
        'bg-[#fdffb6] text-black border-[#fdffb6]',
        'bg-[#bdb2ff] text-black border-[#bdb2ff]',
    ];

    // Helper to get consistent color for a tag
    const getTagColor = (tag: string) => {
        let hash = 0;
        for (let i = 0; i < tag.length; i++) {
            hash = tag.charCodeAt(i) + ((hash << 5) - hash);
        }
        return tagColors[Math.abs(hash) % tagColors.length];
    };

    return (
        <div>
            {/* Tag Filters */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
                <button
                    onClick={() => setSelectedTag(null)}
                    className={`px-4 py-2 font-mono text-sm border transition-all rounded-md ${selectedTag === null
                        ? 'bg-[var(--pastel-orange)] text-black border-[var(--pastel-orange)]'
                        : 'bg-background text-muted border-border hover:border-[var(--pastel-orange)] hover:text-[var(--pastel-orange)]'
                        }`}
                >
                    [All]
                </button>
                {finalTags.map((tag) => {
                    const colorClass = getTagColor(tag);
                    const isSelected = selectedTag === tag;

                    return (
                        <button
                            key={tag}
                            onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                            className={`px-4 py-2 font-mono text-sm border transition-all rounded-md ${isSelected
                                ? 'bg-[var(--pastel-orange)] text-black border-[var(--pastel-orange)] font-bold'
                                : `bg-transparent text-muted border-border hover:scale-105 hover:${colorClass.split(' ')[2]}`
                                }`}
                            style={isSelected ? {} : { borderColor: 'var(--border)' }}
                        >
                            <span style={isSelected ? {} : { color: colorClass.match(/#[0-9a-f]{6}/)?.[0] }}>
                                #{tag}
                            </span>
                        </button>
                    )
                })}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map(post => {
                    // Random rainbow color for the $ sign per post (deterministic by ID)
                    const dollarColors = ['text-[var(--pastel-red)]', 'text-[var(--pastel-green)]', 'text-[var(--pastel-blue)]', 'text-[var(--pastel-purple)]', 'text-[var(--pastel-yellow)]'];
                    const dollarColor = dollarColors[post.id.length % dollarColors.length];

                    return (
                        <TerminalCard key={post.id} className="group hover:-translate-y-1 transition-transform duration-300 h-full flex flex-col" title="">
                            {/* Custom Title Bar content manually injected to allow rainbow $ */}
                            <div className="border-b border-border px-4 py-2 bg-white/5 flex items-center justify-between">
                                <span className="font-bold text-sm text-foreground/80 lowercase font-mono">
                                    <span className={dollarColor}>$</span> cat {post.id}.md
                                </span>
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]"></div>
                                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]"></div>
                                    <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]"></div>
                                </div>
                            </div>

                            <Link href={`/blog/${post.id}`} className="block h-full flex flex-col">
                                <div className="relative h-48 w-full border-b border-border overflow-hidden">
                                    <Image
                                        src={post.thumbnail || '/background.jpg'}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-6 flex flex-col flex-1 bg-background">
                                    <div className="flex items-center justify-between mb-3 w-full">
                                        <div className="flex flex-wrap gap-2">
                                            {post.tags.map((tag) => {
                                                const tagColor = getTagColor(tag).match(/#[0-9a-f]{6}/)?.[0] || 'gray';
                                                return (
                                                    <span key={tag} className="text-xs font-bold uppercase tracking-wider font-mono opacity-90" style={{ color: tagColor }}>
                                                        #{tag}
                                                    </span>
                                                )
                                            })}
                                        </div>
                                        <span className="text-xs text-muted/60 font-mono whitespace-nowrap ml-2">
                                            {new Date(post.date).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <h2 className="text-xl font-bold font-mono mb-2 text-foreground group-hover:text-[var(--pastel-orange)] transition-colors">
                                        {post.title}
                                    </h2>
                                    <h3 className="text-sm font-light text-muted mb-4 flex-1">
                                        {post.subtitle}
                                    </h3>
                                </div>
                            </Link>
                        </TerminalCard>
                    )
                })}
            </div>
        </div>
    );
}
