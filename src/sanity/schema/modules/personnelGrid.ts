import { backgroundColorField } from "../common";

export const personnelGrid = {
  type: "object",
  name: "personnelGrid",
  title: "Personnel Grid",
  groups: [
    { name: "content", title: "Content" },
    { name: "background", title: "Appearance" },
  ],
  fields: [
    {
      name: "internalTitle",
      title: "Internal Title",
      type: "string",
      description: "For studio purposes only (e.g. 'Home - The Masters')",
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
    backgroundColorField("background", "surface"),
    {
      name: "members",
      title: "Members",
      type: "array",
      of: [{ type: "reference", to: [{ type: "personnel" }] }],
      validation: (Rule: any) => Rule.required().min(1),
    },
  ],
  preview: {
    select: { title: "internalTitle", heading: "heading" },
    prepare({ title, heading }: any) {
      return {
        title: title || heading || "Personnel Grid",
        subtitle: "PERSONNEL GRID",
      };
    },
  },
};
