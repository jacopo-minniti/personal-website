import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface PostData {
    id: string;
    title: string;
    subtitle?: string;
    date: string;
    tags: string[];
    thumbnail?: string;
    content: string;
}

export function getSortedPostsData(): PostData[] {
    // Create directory if it doesn't exist
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        const id = fileName.replace(/\.mdx$/, '');

        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        const result = matter(fileContents);

        return {
            id,
            title: result.data.title || 'Untitled',
            subtitle: result.data.subtitle || '',
            date: result.data.date || new Date().toISOString(),
            tags: result.data.tags || [],
            thumbnail: result.data.thumbnail || '/background.jpg', // Default thumbnail
            content: result.content,
        } as PostData;
    });

    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

export async function getPostData(id: string) {
    const fullPath = path.join(postsDirectory, `${id}.mdx`);
    if (!fs.existsSync(fullPath)) {
        return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const result = matter(fileContents);

    return {
        id,
        content: result.content,
        ...result.data,
    } as PostData;
}
