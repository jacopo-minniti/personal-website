import { getSortedPostsData } from '@/lib/posts';
import ScrollableBlogList from './ScrollableBlogList';

export default function BlogPage() {
  const posts = getSortedPostsData();
  const sectionOrder = ["Deep Learning", "Computer Science", "Novels and Poetry", "Philosophy"];
  const allTags = sectionOrder.filter((section) =>
    posts.some((post) => post.tags.includes(section))
  );

  return (
    <div className="min-h-screen py-10 px-6 max-w-7xl mx-auto">
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Writings & Projects</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Thoughts and projects on AI, science, and philosophy.
        </p>
      </header>

      <ScrollableBlogList posts={posts} allTags={allTags} />
    </div>
  );
}