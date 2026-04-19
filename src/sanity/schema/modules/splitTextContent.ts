import { backgroundColorField } from "../common";

export const splitTextContent = {
  type: "object",
  name: "splitTextContent",
  title: "Split Text Content",
  groups: [
    { name: "content", title: "Content" },
    { name: "background", title: "Appearance" },
  ],
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
      group: "content",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "intro",
      type: "array",
      title: "Intro Paragraph",
      group: "content",
      of: [{ type: "block" }],
    },
    {
      name: "infoBlocks",
      title: "Info Blocks",
      type: "array",
      group: "content",
      of: [
        {
          type: "object",
          name: "infoBlock",
          fields: [
            { name: "title", type: "string" },
            { name: "content", type: "text" },
          ],
        },
      ],
    },
    backgroundColorField("background", "surface"),
  ],
  preview: {
    select: { title: "internalTitle", heading: "heading" },
    prepare({ title, heading }: any) {
      return {
        title: title || heading || "Split Text Content",
        subtitle: "SPLIT TEXT CONTENT",
      };
    },
  },
};
