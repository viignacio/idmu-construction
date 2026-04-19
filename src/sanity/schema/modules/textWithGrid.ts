import { backgroundColorField } from "../common";

export const textWithGrid = {
  type: "object",
  name: "textWithGrid",
  title: "Text with Grid",
  groups: [
    { name: "content", title: "Content" },
    { name: "grid", title: "Grid Items" },
  ],
  fields: [
    {
      name: "internalTitle",
      title: "Internal Title",
      type: "string",
      description: "For studio purposes only (e.g. 'Home - About IDMU')",
    },
    {
      name: "variant",
      type: "string",
      options: {
        list: [
          { title: "3 Columns (Gradient)", value: "3-grid-gradient" },
          { title: "3 Columns (Checkered)", value: "3-grid-checkered" },
          { title: "4 Columns (Method)", value: "4-grid-method" },
        ],
      },
      initialValue: "3-grid-gradient",
    },
    backgroundColorField("content"),
    { name: "preamble", type: "string", title: "Preamble", group: "content" },
    {
      name: "heading",
      type: "string",
      title: "Heading",
      group: "content",
      validation: (Rule: any) => Rule.required(),
    },
    { name: "subheading", type: "text", title: "Subheading", group: "content" },
    {
      name: "gridItems",
      type: "array",
      title: "Grid Items",
      group: "grid",
      of: [
        {
          type: "object",
          name: "gridItem",
          fields: [
            { name: "label", type: "string", title: "Label (Optional prefix)" },
            {
              name: "iconName",
              type: "string",
              title: "Material Icon Name",
              description:
                "Name of the Google Material Icon (e.g. 'architecture', 'construction')",
            },
            {
              name: "icon",
              type: "file",
              title: "Icon (SVG)",
              options: { accept: ".svg" },
            },
            { name: "title", type: "string", title: "Title" },
            { name: "description", type: "text", title: "Description" },
            {
              name: "bullets",
              type: "array",
              title: "Features / Bullets",
              of: [{ type: "string" }],
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "internalTitle",
      heading: "heading",
    },
    prepare({ title, heading }: any) {
      return {
        title: title || heading || "Text with Grid",
        subtitle: "TEXT WITH GRID",
      };
    },
  },
};
