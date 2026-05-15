import { getAllPosts, getAllTags } from '@/lib/posts';
import PostCard from '@/app/_components/PostCard';
import Link from 'next/link';

type Props = {
  searchParams: { tag?: string; category?: string };
};

export default function BlogPage({ searchParams }: Props) {
  const allPosts = getAllPosts();
  const tags = getAllTags();

  const filtered = allPosts.filter((post) => {
    if (searchParams.tag && !post.tags.includes(searchParams.tag)) return false;
    if (searchParams.category && post.category !== searchParams.category) return false;
    return true;
  });

  console.log('All posts:', JSON.stringify(allPosts, null, 2));

  return (
    <main>
      <nav>
        <Link href="/blog">All</Link>
        {tags.map((tag) => (
          <a key={tag} href={`/blog?tag=${tag}`}>{tag}</a>
        ))}
      </nav>

      <ul>
        {filtered.map((post) => (
          <li key={`${post.category}/${post.slug}`}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </main>
  );
}