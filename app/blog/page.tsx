import { getAllPosts, getAllTags } from '@/lib/posts';
import PostCard from '@/app/_components/PostCard';
import Link from 'next/link';

type Props = {
  searchParams: Promise<{ tag?: string; category?: string }>;
};

export default async function BlogPage({ searchParams }: Props) {
  const { tag, category } = await searchParams;
  const allPosts = getAllPosts();
  const tags = getAllTags();

  const filtered = allPosts.filter((post) => {
    if (tag && !post.tags.includes(tag)) return false;
    if (category && post.category !== category) return false;
    return true;
  });


  return (
    <main>
      <div className="font-[Menlo]">
          <h2 className="max-w-s text-2xl leading-10 tracking-tight text-black mt-5">
            Blog
        </h2>
      </div>

      <div className="mb-2">
        <p className="max-w-3xl text-md leading-8 text-zinc-400 dark:text-zinc-600">
          Writeups on tech, pondering on the stars, and a random stream of consciousness. Most of the time technical,
          sometimes a bit of a philosophical tangent, sometimes a little incomprehensible. A journal with citations sometimes, 
          and typically no peer review.    
        </p>
      </div>

      <nav className="mb-4">
        <Link href="/blog" className="rounded-full border px-2.5 py-0.5 text-xs font-medium hover:bg-accent transition-colors mr-2">#all</Link>
        {tags.map((tag) => (
          <Link className="rounded-full border px-2.5 py-0.5 text-xs font-medium hover:bg-accent transition-colors mr-2" key={tag} href={`/blog?tag=${tag}`}>#{tag}</Link>
        ))}
      </nav>

      <ul>
        {filtered.map((post, i) => (
          <li key={`${post.category}/${post.slug}`}>
            <PostCard post={post} index={i} />
          </li>
        ))}
      </ul>
    </main>
  );
}