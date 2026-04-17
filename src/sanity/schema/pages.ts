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
              name: "internalTitle",
              title: "Internal Title",
              type: "string",
              description: "For studio purposes only (e.g. 'Project Stats')",
            },
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
          preview: {
            select: {
              title: "internalTitle",
            },
            prepare({ title }) {
              return {
                title: title || "Stats Grid",
              };
            },
          },
        },
        {
          type: "object",
          name: "projectShowcase",
          title: "Project Showcase",
          groups: [
            { name: "content", title: "Content" },
            { name: "cta", title: "CTA" },
            { name: "items", title: "Projects" },
          ],
          fields: [
            {
              name: "internalTitle",
              title: "Internal Title",
              type: "string",
              description: "For studio purposes only (e.g. 'Home - Featured Projects')",
              group: "content",
            },
            { name: "heading", type: "string", title: "Heading", group: "content" },
            { name: "subheading", type: "text", title: "Subheading", group: "content" },
            {
              name: "cta",
              type: "object",
              title: "CTA Link",
              group: "cta",
              fields: [
                { name: "label", type: "string" },
                { name: "link", type: "string" },
              ],
            },
            {
              name: "projects",
              type: "array",
              title: "Projects",
              group: "items",
              of: [
                {
                  type: "object",
                  name: "projectItem",
                  title: "Project Item",
                  groups: [
                    { name: "content", title: "Content" },
                    { name: "layout", title: "Grid & Position" },
                    { name: "animation", title: "Animation & Style" },
                  ],
                  fields: [
                    {
                      name: "project",
                      type: "reference",
                      to: [{ type: "project" }],
                      title: "Project Reference",
                      group: "content",
                    },
                    {
                      name: "size",
                      type: "string",
                      title: "Size",
                      group: "layout",
                      options: {
                        list: [
                          { title: "Landscape (2/3 Grid)", value: "landscape" },
                          { title: "Portrait (1/3 Grid)", value: "portrait" },
                        ],
                      },
                      initialValue: "portrait",
                    },
                    {
                      name: "hoverEffect",
                      type: "string",
                      title: "Hover Animation",
                      group: "animation",
                      options: {
                        list: [
                          { title: "Card Peek", value: "cardPeek" },
                          { title: "Show Text (Immersive Overlay)", value: "showText" },
                          { title: "Zoom Out Only", value: "zoomOut" },
                          { title: "Zoom In Only", value: "zoomIn" },
                        ],
                      },
                      initialValue: "zoomOut",
                    },
                    {
                      name: "cardColor",
                      type: "string",
                      title: "Card Background Color",
                      group: "animation",
                      options: {
                        list: [
                          { title: "Navy (Primary)", value: "navy" },
                          { title: "Yellow (Tertiary)", value: "yellow" },
                          { title: "White (Surface)", value: "white" },
                        ],
                      },
                      initialValue: "navy",
                    },
                    {
                      name: "position",
                      type: "string",
                      title: "Content Position",
                      group: "layout",
                      description: "Ignored if 'Show Text' is selected.",
                      options: {
                        list: [
                          { title: "Top Left", value: "topLeft" },
                          { title: "Top Right", value: "topRight" },
                          { title: "Bottom Left", value: "bottomLeft" },
                          { title: "Bottom Right", value: "bottomRight" },
                        ],
                      },
                      initialValue: "bottomLeft",
                    },
                    {
                      name: "isOffset",
                      type: "boolean",
                      title: "Add Offset Margin",
                      group: "layout",
                      description: "Adds padding from the edge so the card isn't flushed.",
                      initialValue: false,
                    },
                  ],
                  preview: {
                    select: {
                      title: "project.title",
                      subtitle: "size",
                      media: "project.mainImage",
                    },
                    prepare({ title, subtitle, media }) {
                      return {
                        title: title || "Select a project...",
                        subtitle: subtitle ? subtitle.toUpperCase() : "",
                        media,
                      };
                    },
                  },
                },
              ],
            },
          ],
          preview: {
            select: {
              title: "internalTitle",
            },
            prepare({ title }) {
              return {
                title: title || "Project Showcase",
              };
            },
          },
        },
        {
          type: "object",
          name: "newsShowcase",
          title: "News Showcase",
          groups: [{ name: "content", title: "Content" }],
          fields: [
            {
              name: "internalTitle",
              title: "Internal Title",
              type: "string",
              description: "For studio purposes only (e.g. 'Home - From the Job Site')",
              group: "content",
            },
            { name: "heading", type: "string", title: "Heading", group: "content" },
            { name: "subheading", type: "text", title: "Subheading", group: "content" },
          ],
          preview: {
            select: { title: "internalTitle" },
            prepare({ title }) {
              return { title: title || "News Showcase" };
            },
          },
        },
        {
          name: "ctaBlock",
          title: "CTA Block",
          type: "object",
          fields: [
            {
              name: "heading",
              title: "Heading",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            { name: "subheading", title: "Subheading", type: "text" },
            {
              name: "backgroundColor",
              title: "Background Color",
              type: "string",
              options: {
                list: [
                  { title: "Steel (Primary)", value: "primary" },
                  { title: "Slate (Secondary)", value: "secondary" },
                  { title: "Mustard (Tertiary)", value: "tertiary" },
                  { title: "Navy (Surface)", value: "surface" },
                  { title: "Off-White (Background)", value: "background" },
                  { title: "Ice Blue (Blueprint)", value: "blueprint" },
                  { title: "White", value: "white" },
                ],
              },
              initialValue: "primary",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "ctaText",
              title: "CTA Text",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "ctaLink",
              title: "CTA Link",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "ctaVariant",
              title: "CTA Variant",
              type: "string",
              options: {
                list: [
                  { title: "Solid (Primary)", value: "primary" },
                  { title: "Underlined (Secondary)", value: "secondary" },
                  { title: "Arrow (Tertiary)", value: "tertiary" },
                ],
              },
              initialValue: "primary",
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),
  ],
});
