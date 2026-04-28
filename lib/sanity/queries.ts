import { groq } from "next-sanity";

export const projectsQuery = groq`
  *[_type == "project"] | order(_createdAt desc) {
    title,
    description,
    "techStack": techStack[],
    liveUrl,
    githubUrl,
    liveNote,
    codeNote,
    detailUrl
  }
`;

export const blogPostsQuery = groq`
  *[_type == "post" && hidden != true] | order(coalesce(sortOrder, 999999) asc, date desc) {
    title,
    "slug": slug.current,
    date,
    excerpt
  }
`;
