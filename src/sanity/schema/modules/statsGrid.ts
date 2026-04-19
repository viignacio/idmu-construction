export const statsGrid = {
  type: "object",
  name: "statsGrid",
  title: "Stats Grid",
  groups: [{ name: "content", title: "Content" }],
  fields: [
    {
      name: "internalTitle",
      title: "Internal Title",
      type: "string",
      description: "For studio purposes only (e.g. 'Project Stats')",
    },
    {
      name: "stats",
      type: "array",
      group: "content",
      of: [
        {
          type: "object",
          fields: [
            { name: "value", type: "string" },
            { name: "label", type: "string" },
          ],
        },
      ],
    },
  ],
  preview: {
    select: { title: "internalTitle" },
    prepare({ title }: any) {
      return {
        title: title || "Project Stats",
        subtitle: "STATS GRID",
      };
    },
  },
};
