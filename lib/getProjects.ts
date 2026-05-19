import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type Project = {
  slug: string;
  category: string;
  projTitle: string;
  description: string;
  date: string | null;
};

export function getProjects(): Project[] {
  const postsDir = path.join(process.cwd(), 'posts');
  const categories = fs.readdirSync(postsDir);
  const projects: Project[] = [];

  for (const category of categories) {
    const categoryDir = path.join(postsDir, category);
    if (!fs.statSync(categoryDir).isDirectory()) continue;

    for (const file of fs.readdirSync(categoryDir)) {
      const source = fs.readFileSync(path.join(categoryDir, file), 'utf8');
      const { data } = matter(source);
      const slug = path.basename(file, path.extname(file));
      if (!data.tags?.includes('project')) continue;

      projects.push({
        slug: path.basename(file, path.extname(file)),
        category,
        projTitle: data.title ?? slug,
        description: data.description ?? '',
        date: data.date ? String(data.date) : null,
      });
    }
  }

  return projects;
}