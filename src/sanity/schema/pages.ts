import { defineField, defineType } from "sanity";

export const page = defineType({
  name: "page",
  title: "Pages",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "modules",
      title: "Page Builder",
      type: "array",
      of: [
        {
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
            },
            {
              name: "subheading",
              type: "text",
              title: "Subheading",
              group: "content",
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
              hidden: ({ parent }) => parent?.variant !== "image-text",
            },
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
              hidden: ({ parent }) => parent?.variant === "text",
            },
            {
              name: "backgroundImage",
              type: "image",
              options: { hotspot: true },
              title: "Background Image",
              group: "background",
              hidden: ({ parent }) =>
                parent?.variant === "text" || parent?.backgroundType === "video",
            },
            {
              name: "backgroundVideo",
              type: "file",
              title: "Background Video",
              options: { accept: "video/*" },
              group: "background",
              hidden: ({ parent }) =>
                parent?.variant === "text" || parent?.backgroundType !== "video",
            },
            {
              name: "videoPlaceholder",
              type: "image",
              title: "Video Placeholder",
              description: "Optional image to show while video loads",
              options: { hotspot: true },
              group: "background",
              hidden: ({ parent }) =>
                parent?.variant === "text" || parent?.backgroundType !== "video",
            },
            {
              name: "primaryCTA",
              type: "object",
              title: "Primary CTA",
              group: "cta",
              fields: [
                { name: "label", type: "string" },
                { name: "link", type: "string" },
              ],
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
              hidden: ({ parent }) => parent?.variant === "text",
            },
          ],
        },
        {
          type: "object",
          name: "textWithGrid",
          title: "Text with Grid",
          groups: [
            { name: "content", title: "Content" },
            { name: "grid", title: "Grid Items" },
          ],
          fields: [
            {
              name: "variant",
              type: "string",
              options: {
                list: [
                  { title: "3 Columns", value: "3-grid" },
                  { title: "4 Columns", value: "4-grid" },
                ],
              },
              initialValue: "3-grid",
            },
            { name: "preamble", type: "string", title: "Preamble", group: "content" },
            { name: "heading", type: "string", title: "Heading", group: "content" },
            { name: "subheading", type: "text", title: "Subheading", group: "content" },
            {
              name: "gridItems",
              type: "array",
              title: "Grid Items",
              group: "grid",
              of: [
                {
                  type: "object",
                  fields: [
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
        },
        {
          type: "object",
          name: "statsGrid",
          title: "Stats Grid",
          fields: [
            {
              name: "stats",
              type: "array",
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
        },
        // More modules will be added later
      ],
    }),
  ],
});
