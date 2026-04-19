export const projectGrid = {
  type: "object",
  name: "projectGrid",
  title: "Project Grid",
  groups: [
    { name: "content", title: "Content" },
    { name: "settings", title: "Display Settings" },
  ],
  fields: [
    {
      name: "internalTitle",
      title: "Internal Title",
      type: "string",
      description: "For studio purposes only (e.g. 'Project Archive Grid')",
    },
    {
      name: "heading",
      title: "Heading",
      type: "string",
      group: "content",
    },
    {
      name: "subheading",
      title: "Subheading",
      type: "text",
      group: "content",
    },
    {
      name: "showFilters",
      title: "Show Category Filters",
      type: "boolean",
      group: "settings",
      initialValue: true,
    },
    {
      name: "limit",
      title: "Limit Projects",
      type: "number",
      group: "settings",
      description: "Leave empty to show all projects.",
    },
  ],
  preview: {
    select: {
      title: "internalTitle",
      heading: "heading",
    },
    prepare({ title, heading }: any) {
      return {
        title: title || heading || "Project Grid",
        subtitle: "PROJECT GRID",
      };
    },
  },
};
