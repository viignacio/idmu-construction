export const newsShowcase = {
  type: "object",
  name: "newsShowcase",
  title: "News Showcase",
  groups: [{ name: "content", title: "Content" }],
  fields: [
    {
      name: "internalTitle",
      title: "Internal Title",
      type: "string",
      description: "For studio purposes only (e.g. 'Home - From the Job Site')",
      group: "content",
    },
    {
      name: "heading",
      type: "string",
      title: "Heading",
      group: "content",
      validation: (Rule: any) => Rule.required(),
    },
    { name: "subheading", type: "text", title: "Subheading", group: "content" },
  ],
  preview: {
    select: { title: "internalTitle", heading: "heading" },
    prepare({ title, heading }: any) {
      return {
        title: title || heading || "News Showcase",
        subtitle: "NEWS SHOWCASE",
      };
    },
  },
};
