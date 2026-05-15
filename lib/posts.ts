import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { Post, PostMeta } from '@/interfaces/blog';

const postsRoot = path.join(process.cwd(), 'posts');
console.log('postsRoot:', postsRoot);
console.log('contents:', fs.readdirSync(postsRoot));

function readPost(dir: string, file: string, category: string): PostMeta {
  const slug = file.replace(/\.md$/, '');
  const fullPath = path.join(dir, file);
  const { data } = matter(fs.readFileSync(fullPath, 'utf8'));

  if (!data.title || !data.date) {
    throw new Error(`Missing required frontmatter in ${fullPath}: title=${data.title}, date=${data.date}`);
  }

  return {
    slug,
    category,
    title: data.title,
    date: data.date,
    tags: data.tags ?? [],
    excerpt: data.excerpt ?? '',
  };
}

export function getAllPosts(): PostMeta[] {
  const entries = fs.readdirSync(postsRoot);

  const posts = entries.flatMap((entry) => {
    const entryPath = path.join(postsRoot, entry);

    if (fs.statSync(entryPath).isDirectory()) {
      // nested: posts/category/slug.md
      return fs.readdirSync(entryPath)
        .filter((file) => file.endsWith('.md'))
        .map((file) => readPost(entryPath, file, entry));
    } else if (entry.endsWith('.md')) {
      // flat: posts/slug.md — category defaults to "uncategorized"
      return [readPost(postsRoot, entry, 'uncategorized')];
    }
    return [];
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(category: string, slug: string): Promise<Post> {
  console.log('getPost called with:', { category, slug });
  const fullPath = path.join(postsRoot, category, `${slug}.md`);
  console.log('fullPath:', fullPath);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const processed = await remark().use(html).process(content);

  return {
    slug,
    category,
    title: data.title,
    date: data.date,
    tags: data.tags ?? [],
    excerpt: data.excerpt ?? '',
    content: processed.toString(),
  };
}

export function getAllCategories(): string[] {
  return fs.readdirSync(postsRoot).filter((f) =>
    fs.statSync(path.join(postsRoot, f)).isDirectory()
  );
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagSet = new Set(posts.flatMap((p) => p.tags));
  return Array.from(tagSet).sort();
}