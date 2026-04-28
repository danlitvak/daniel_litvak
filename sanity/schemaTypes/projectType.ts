import { defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "techStack",
      title: "Tech Stack",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "liveUrl",
      title: "Live URL",
      type: "url",
    }),
    defineField({
      name: "githubUrl",
      title: "Code URL",
      type: "url",
    }),
    defineField({
      name: "liveNote",
      title: "Live Note",
      type: "string",
      description: "Short label for projects that need to be run locally.",
    }),
    defineField({
      name: "codeNote",
      title: "Code Note",
      type: "string",
      description: "Short label for code that is local or embedded elsewhere.",
    }),
    defineField({
      name: "detailUrl",
      title: "Internal Detail URL",
      type: "string",
      description: "Optional relative portfolio route for project details.",
    }),
  ],
});
