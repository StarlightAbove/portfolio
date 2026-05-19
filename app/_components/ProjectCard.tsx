import Link from 'next/link';
import type { Project } from '@/lib/getProjects';

export default function ProjectCard({ slug, category, projTitle, description, date }: Project & { index: number }) {
  return (
    <Link href={`/blog/${category}/${slug}`} className="block w-full group">
      <article className="grid grid-cols-[52px_1fr_auto] items-baseline gap-4 py-3.5 border-t border-gray-200 hover:bg-gray-50/50 transition-colors">

        {/* Marker */}
        <span className="font-mono text-[11px] tracking-widest text-[var(--color-green-dark)] opacity-70">
          ◆
        </span>

        {/* Title + description */}
        <div className="flex flex-col gap-0.5">
          <h2 className="font-serif text-[17px] text-zinc-800 group-hover:text-[var(--color-green-dark)] transition-colors">
            {projTitle}
          </h2>
          {description && (
            <p className="font-mono text-[11px] text-zinc-400 line-clamp-1">
              {description}
            </p>
          )}
        </div>

        {/* Date */}
        {date && (
          <time dateTime={date} className="font-mono text-[11px] text-[var(--color-green-dark)] whitespace-nowrap">
            {date}
          </time>
        )}

      </article>
    </Link>
  );
}