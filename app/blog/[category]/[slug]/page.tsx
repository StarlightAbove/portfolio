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
    <main className="mx-auto max-w-3xl px-6 py-12">
      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight mb-3">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <time dateTime={post.date}>{post.date}</time>
          
          {post.tags.length > 0 && (
            <>
              <span>·</span>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <a
                    key={tag}
                    href={`/blog?tag=${tag}`}
                    className="rounded-full border px-2.5 py-0.5 text-xs font-medium hover:bg-accent transition-colors"
                  >
                    #{tag}
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </header>

      <article
        className="prose prose-zinc max-w-none
          prose-headings:font-semibold prose-headings:tracking-tight
          prose-a:underline prose-a:underline-offset-4 prose-a:decoration-muted-foreground hover:prose-a:decoration-foreground
          prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:font-mono
          prose-pre:rounded-lg prose-pre:border prose-pre:bg-muted
          prose-blockquote:border-l-4 prose-blockquote:border-muted-foreground/30 prose-blockquote:pl-4 prose-blockquote:italic
          prose-img:rounded-lg prose-img:border"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </main>
  );
}