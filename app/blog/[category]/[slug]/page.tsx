import { getPost, getAllPosts } from '@/lib/posts';

type Props = {
  params: Promise<{ category: string; slug: string }>;
};

export async function generateStaticParams() {
  const params = getAllPosts().map(({ category, slug }) => ({ category, slug }));
  console.log('Static params:', params);
  return params;
}

export default async function PostPage({ params }: Props) {
  const { category, slug } = await params;
  const post = await getPost(category, slug);

  return (
    <main>
      <header>
        <h1>{post.title}</h1>
        <time dateTime={post.date}>{post.date}</time>
        <a href={`/blog?category=${post.category}`}>{post.category}</a>
        <div>
          {post.tags.map((tag) => (
            <a key={tag} href={`/blog?tag=${tag}`}>{tag}</a>
          ))}
        </div>
      </header>

      <article dangerouslySetInnerHTML={{ __html: post.content }} />
    </main>
  );
}