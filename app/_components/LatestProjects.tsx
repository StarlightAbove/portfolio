import { getProjects } from "@/lib/getProjects";
import ProjectCard from "./ProjectCard";

export default function LatestPosts() {
  const posts = getProjects().slice(0, 3);

  return (
    <section>
      <div className="grid grid-cols-3">
        {posts.map((post) => (
          <ProjectCard key={post.slug} {...post} />
        ))}
      </div>
    </section>
  );
}