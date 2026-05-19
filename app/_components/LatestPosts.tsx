import { getAllPosts } from "@/lib/posts";
import PostCard from "./PostCard";
import Link from "next/link";

export default function LatestPosts() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <section className="w-full max-w-3xl pt-3">
      <div className="w-full">
        {posts.map((post, i) => (
          <PostCard key={`${post.category}/${post.slug}`} post={post} index={i} />
        ))}
      </div>
      {/* closing rule + "all posts" link */}
      <div className="border-t border-gray-200 pt-3">
        <Link href="/blog" className="font-mono text-[11px] tracking-widest uppercase text-[var(--color-green-dark)] opacity-70 hover:opacity-100 transition-opacity">
          all posts →
        </Link>
      </div>
    </section>
  );
}