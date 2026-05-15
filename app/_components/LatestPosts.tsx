import { getAllPosts } from "@/lib/posts";
import PostCard from "./PostCard";

export default function LatestPosts() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <section>
      <div className="grid grid-cols-3">
        {posts.map((post) => (
          <PostCard key={`${post.category}/${post.slug}`} post={post} />
        ))}
      </div>
    </section>
  );
}