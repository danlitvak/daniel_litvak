export type ProjectPreview = {
  title: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
  liveNote?: string;
  codeNote?: string;
  detailUrl?: string;
};

export type BlogPostPreview = {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
};
