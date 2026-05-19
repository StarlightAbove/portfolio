import { getProjects } from '@/lib/getProjects';
import ProjectCard from '@/app/_components/ProjectCard';

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main>
      <div className="font-[Menlo]">
          <h2 className="max-w-s text-2xl leading-10 tracking-tight text-black mt-5">
            Projects
        </h2>
      </div>

      <div className="mb-2">
        <p className="max-w-3xl text-md leading-8 text-zinc-400 dark:text-zinc-600">
          Research projects, tools and builds that took a bit of time, and tend up being useful. Is a combo of 
          science and engineering (typically computer or electrical). Usually has a GitHub link and documentation 
          for you to reproduce it.    
        </p>
      </div>
      <div>
        {projects.map((project) => (
          <ProjectCard index={0} key={project.slug} {...project} />
        ))}
      </div>
    </main>
  );
}