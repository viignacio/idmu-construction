import { backgroundColorField } from "../common";

const ctaButtonFields = [
  { name: "text", type: "string" },
  { name: "link", type: "string" },
  {
    name: "variant",
    type: "string",
    options: {
      list: [
        { title: "Solid (Primary)", value: "primary" },
        { title: "Underlined (Secondary)", value: "secondary" },
        { title: "Arrow (Tertiary)", value: "tertiary" },
        { title: "Ghost (White Border)", value: "ghost" },
      ],
    },
  },
];

export const ctaBlock = {
  name: "ctaBlock",
  title: "CTA Block",
  type: "object",
  groups: [
    { name: "content", title: "Content" },
    { name: "background", title: "Appearance" },
    { name: "cta", title: "CTAs" },
  ],
  fields: [
    {
      name: "internalTitle",
      title: "Internal Title",
      type: "string",
      description: "For studio purposes only (e.g. 'Home - Contact CTA')",
    },
    {
      name: "layout",
      title: "Block Variant",
      type: "string",
      group: "background",
      options: {
        list: [
          { title: "Centered", value: "one" },
          { title: "Split Horizontal", value: "two" },
        ],
      },
      initialValue: "one",
    },
    {
      name: "heading",
      title: "Heading",
      type: "string",
      group: "content",
      validation: (Rule: any) => Rule.required(),
    },
    { name: "subheading", title: "Subheading", type: "text", group: "content" },
    backgroundColorField("background", "primary"),
    {
      name: "primaryCta",
      title: "Primary CTA",
      type: "object",
      group: "cta",
      fields: ctaButtonFields,
    },
    {
      name: "secondaryCta",
      title: "Secondary CTA",
      type: "object",
      group: "cta",
      fields: ctaButtonFields,
    },
  ],
  preview: {
    select: {
      title: "internalTitle",
      heading: "heading",
    },
    prepare({ title, heading }: any) {
      return {
        title: title || heading || "CTA Block",
        subtitle: "CTA BLOCK",
      };
    },
  },
};
