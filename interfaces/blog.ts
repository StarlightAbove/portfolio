export type PostMeta = {
  slug: string;
  category: string;
  title: string;
  date: string;        // ISO string: "2026-05-15"
  tags: string[];
  excerpt: string;
};

export type Post = PostMeta & {
  content: string;     // rendered HTML
};