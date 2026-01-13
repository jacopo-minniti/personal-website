import { getSortedPostsData } from '@/lib/posts';
import ScrollableBlogList from './ScrollableBlogList';

export default function BlogPage() {
  const posts = getSortedPostsData();
  const allTags = ["AI", "neuroscience", "mathematics", "philosophy", "novel", "poetry"];

  return (
    <div className="min-h-screen py-10 px-6 max-w-7xl mx-auto">
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">The Blog</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Thoughts, stories, and explorations on AI and much more.
        </p>
      </header>

      <ScrollableBlogList posts={posts} allTags={allTags} />
    </div>
  );
}