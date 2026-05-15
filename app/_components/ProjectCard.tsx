import Link from 'next/link';
import type { Project } from '@/lib/getProjects';

export default function ProjectCard({ slug, category, projTitle, description, date }: Project) {
  return (
    <Link href={`/blog/${category}/${slug}`}>
      <div>
        <h2>{projTitle}</h2>
        {description && <p>{description}</p>}
        {date && <time dateTime={date}>{new Date(date).toLocaleDateString()}</time>}
      </div>
    </Link>
  );
}