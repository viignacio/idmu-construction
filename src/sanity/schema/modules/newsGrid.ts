export const newsGrid = {
  type: "object",
  name: "newsGrid",
  title: "News Grid",
  groups: [{ name: "content", title: "Content" }],
  fields: [
    {
      name: "internalTitle",
      title: "Internal Title",
      type: "string",
      description: "For studio purposes only",
      group: "content",
    },
    {
      name: "heading",
      type: "string",
      title: "Heading",
      description: "e.g. ARCHIVE",
      group: "content",
      validation: (Rule: any) => Rule.required(),
    },
    { name: "subheading", type: "text", title: "Subheading", group: "content" },
    {
      name: "showFilters",
      title: "Show Filters",
      type: "boolean",
      initialValue: true,
      group: "content",
    },
  ],
  preview: {
    select: { title: "internalTitle", heading: "heading" },
    prepare({ title, heading }: any) {
      return {
        title: title || heading || "News Grid",
        subtitle: "NEWS GRID",
      };
    },
  },
};
