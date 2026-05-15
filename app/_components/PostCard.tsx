import { PostMeta } from '@/interfaces/blog';

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <article>
      <a href={`/blog/${post.category}/${post.slug}`}>
        <h2>{post.title}</h2>
      </a>
      <time dateTime={post.date}>{post.date}</time>
      <p>{post.excerpt}</p>
      <div>
        {post.tags.map((tag) => (
          <a key={tag} href={`/blog?tag=${tag}`}>{tag}</a>
        ))}
      </div>
    </article>
  );
}