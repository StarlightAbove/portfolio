import { getProjects } from "@/lib/getProjects";
import ProjectCard from "./ProjectCard";
import Link from "next/link";

export default function LatestProjects() {
  const projects = getProjects().slice(0, 3);

  return (
    <section className="w-full max-w-3xl pt-3">
      <div className="w-full">
        {projects.map((project, i) => (
          <ProjectCard key={`${project.category}/${project.slug}`} {...project} index={i} />
        ))}
      </div>
      <div className="border-t border-gray-200 pt-3">
        <Link href="/project" className="font-mono text-[11px] tracking-widest uppercase text-[var(--color-green-dark)] opacity-70 hover:opacity-100 transition-opacity">
          all projects →
        </Link>
      </div>
    </section>
  );
}