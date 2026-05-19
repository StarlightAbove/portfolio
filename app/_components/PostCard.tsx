import { PostMeta } from '@/interfaces/blog';
import Link from 'next/link';

export default function PostCard({ post, index }: { post: PostMeta; index: number }) {
  return (
    <Link href={`/blog/${post.category}/${post.slug}`} className="block w-full group">
      <article className="grid grid-cols-[52px_1fr_auto] items-baseline gap-4 py-3.5 border-t border-gray-200 hover:bg-gray-50/50 transition-colors">
        
        {/* Index number */}
        <span className="font-mono text-[11px] tracking-widest text-[var(--color-green-dark)] opacity-70">
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Title + tags */}
        <div className="flex flex-col gap-0.5">
          <h2 className="font-serif text-[17px] text-zinc-800 group-hover:text-[var(--color-green-dark)] transition-colors">
            {post.title}
          </h2>
          <div className="flex gap-2 items-center">
            {post.tags.map((tag, i) => (
              <span key={tag} className="font-mono text-[11px] text-zinc-400">
                {tag}{i < post.tags.length - 1 && <span className="mx-1">·</span>}
              </span>
            ))}
          </div>
        </div>

        {/* Date */}
        <time dateTime={post.date} className="font-mono text-[11px] text-[var(--color-green-dark)] whitespace-nowrap">
          {post.date}
        </time>

      </article>
    </Link>
  );
}