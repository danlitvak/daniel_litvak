import {
  fallbackPosts,
  fallbackProjects,
  projectLinkOverrides,
} from "@/lib/constants";
import { client } from "@/lib/sanity/client";
import { blogPostsQuery, projectsQuery } from "@/lib/sanity/queries";
import type { BlogPostPreview, ProjectPreview } from "@/lib/sanity/types";

export async function getProjects(): Promise<ProjectPreview[]> {
  if (!client) {
    return applyProjectOverrides(fallbackProjects);
  }

  try {
    const projects = await client.fetch<ProjectPreview[]>(projectsQuery);
    return applyProjectOverrides(projects?.length ? projects : fallbackProjects);
  } catch {
    return applyProjectOverrides(fallbackProjects);
  }
}

export async function getBlogPosts(): Promise<BlogPostPreview[]> {
  if (!client) {
    return fallbackPosts;
  }

  try {
    const posts = await client.fetch<BlogPostPreview[]>(blogPostsQuery);
    return posts?.length ? posts : fallbackPosts;
  } catch {
    return fallbackPosts;
  }
}

function applyProjectOverrides(projects: ProjectPreview[]) {
  return projects.map((project) => ({
    ...project,
    ...projectLinkOverrides[project.title],
  }));
}
