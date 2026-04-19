import { backgroundColorField } from "../common";

export const hero = {
  type: "object",
  name: "hero",
  title: "Hero",
  groups: [
    { name: "content", title: "Text Content" },
    { name: "background", title: "Background" },
    { name: "cta", title: "CTA" },
  ],
  fields: [
    {
      name: "internalTitle",
      title: "Internal Title",
      type: "string",
      description: "For studio purposes only (e.g. 'Home - Top Hero')",
    },
    {
      name: "variant",
      type: "string",
      options: {
        list: [
          { title: "Full (Viewport)", value: "full" },
          { title: "Compact", value: "compact" },
          { title: "Text Only", value: "text" },
          { title: "Image and Text", value: "image-text" },
        ],
      },
      initialValue: "full",
      group: "background",
    },
    {
      name: "eyebrow",
      type: "string",
      title: "Eyebrow",
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
      name: "preamble",
      type: "string",
      title: "Preamble (Text above Hero)",
      group: "content",
      hidden: ({ parent }: any) => parent?.variant !== "image-text",
    },
    {
      name: "subheading",
      type: "text",
      title: "Subheading",
      group: "content",
    },
    {
      name: "highlightedWord",
      type: "string",
      title: "Highlighted Word",
      description: "A word or phrase from the heading to highlight. Case-insensitive.",
      group: "content",
      hidden: ({ parent }: any) => parent?.variant !== "text",
    },
    {
      name: "alignment",
      type: "string",
      title: "Image Alignment",
      options: {
        list: [
          { title: "Image Left", value: "left" },
          { title: "Image Right", value: "right" },
        ],
      },
      initialValue: "left",
      group: "background",
      hidden: ({ parent }: any) => parent?.variant !== "image-text",
    },
    backgroundColorField("background", "surface"),
    {
      name: "backgroundType",
      type: "string",
      title: "Background Type",
      options: {
        list: [
          { title: "Image", value: "image" },
          { title: "Video", value: "video" },
        ],
      },
      initialValue: "image",
      group: "background",
      hidden: ({ parent }: any) =>
        parent?.variant === "text" || parent?.variant === "compact",
    },
    {
      name: "backgroundImage",
      type: "image",
      options: { hotspot: true },
      title: "Background Image",
      group: "background",
      hidden: ({ parent }: any) =>
        parent?.variant === "text" ||
        parent?.backgroundType === "video" ||
        (parent?.variant === "compact" && parent?.backgroundType === "video"),
    },
    {
      name: "backgroundVideo",
      type: "file",
      title: "Background Video",
      options: { accept: "video/*" },
      group: "background",
      hidden: ({ parent }: any) =>
        parent?.variant === "text" ||
        parent?.variant === "compact" ||
        parent?.backgroundType !== "video",
    },
    {
      name: "videoPlaceholder",
      type: "image",
      title: "Video Placeholder",
      description: "Optional image to show while video loads",
      options: { hotspot: true },
      group: "background",
      hidden: ({ parent }: any) =>
        parent?.variant === "text" ||
        parent?.variant === "compact" ||
        parent?.backgroundType !== "video",
    },
    {
      name: "primaryCTA",
      type: "object",
      title: "Primary CTA",
      group: "cta",
      fields: [
        { name: "label", type: "string" },
        { name: "link", type: "string" },
        {
          name: "variant",
          title: "Variant",
          type: "string",
          initialValue: "tertiary",
          options: {
            list: [
              { title: "Primary (Solid)", value: "primary" },
              { title: "Secondary (Underlined)", value: "secondary" },
              { title: "Tertiary (Arrow)", value: "tertiary" },
              { title: "Ghost (Outline)", value: "ghost" },
            ],
          },
        },
      ],
      hidden: ({ parent }: any) => parent?.variant === "text",
    },
    {
      name: "secondaryCTA",
      type: "object",
      title: "Secondary CTA",
      group: "cta",
      fields: [
        { name: "label", type: "string" },
        { name: "link", type: "string" },
      ],
      hidden: ({ parent }: any) => parent?.variant === "text",
    },
  ],
  preview: {
    select: {
      title: "internalTitle",
      heading: "heading",
    },
    prepare({ title, heading }: any) {
      return {
        title: title || heading || "Hero",
        subtitle: "HERO",
      };
    },
  },
};
