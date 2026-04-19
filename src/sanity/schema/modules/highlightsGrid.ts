import { backgroundColorField } from "../common";

const ctaVariantOptions = [
  { title: "Solid (Primary)", value: "primary" },
  { title: "Underlined (Secondary)", value: "secondary" },
  { title: "Arrow (Tertiary)", value: "tertiary" },
  { title: "Ghost (White Border)", value: "ghost" },
];

export const highlightsGrid = {
  type: "object",
  name: "highlightsGrid",
  title: "Highlights Grid",
  groups: [
    { name: "content", title: "Content" },
    { name: "grid", title: "Grid Items" },
    { name: "background", title: "Appearance" },
    { name: "cta", title: "CTA" },
  ],
  fields: [
    {
      name: "internalTitle",
      title: "Internal Title",
      type: "string",
      description: "For studio purposes only (e.g. 'Home - Safety Highlights')",
      group: "content",
    },
    {
      name: "reverseLayout",
      title: "Reverse Layout",
      description: "Switch text content to the left side (default is text on right)",
      type: "boolean",
      initialValue: false,
      group: "background",
    },
    backgroundColorField("background", "primary"),
    {
      name: "heading",
      type: "string",
      title: "Heading",
      group: "content",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "subheading",
      type: "text",
      title: "Subheading",
      group: "content",
    },
    {
      name: "highlights",
      title: "Highlights",
      type: "array",
      group: "grid",
      validation: (Rule: any) => Rule.max(4),
      of: [
        {
          type: "object",
          name: "highlightItem",
          fields: [
            { name: "iconName", type: "string", title: "Material Symbol Name" },
            { name: "title", type: "string", title: "Title" },
            { name: "description", type: "text", title: "Description" },
          ],
        },
      ],
    },
    {
      name: "cta",
      title: "Call to Action",
      type: "object",
      group: "cta",
      fields: [
        { name: "text", type: "string" },
        { name: "link", type: "string" },
        {
          name: "variant",
          type: "string",
          options: { list: ctaVariantOptions },
          initialValue: "secondary",
        },
      ],
    },
  ],
  preview: {
    select: { title: "internalTitle", heading: "heading" },
    prepare({ title, heading }: any) {
      return {
        title: title || heading || "Highlights Grid",
        subtitle: "HIGHLIGHTS GRID",
      };
    },
  },
};
