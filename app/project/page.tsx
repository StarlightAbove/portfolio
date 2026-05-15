import { getProjects } from '@/lib/getProjects';
import ProjectCard from '@/app/_components/ProjectCard';

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main>
      <h1>Projects</h1>
      <div>
        {projects.map((project) => (
          <ProjectCard key={project.slug} {...project} />
        ))}
      </div>
    </main>
  );
}