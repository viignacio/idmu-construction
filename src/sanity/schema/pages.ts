import { defineField, defineType } from "sanity";
import { backgroundColorField } from "./common";

export const page = defineType({
  name: "page",
  title: "Pages",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (Rule) => Rule.required(),
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
              validation: (Rule) => Rule.required(),
            },
            {
              name: "preamble",
              type: "string",
              title: "Preamble (Text above Hero)",
              group: "content",
              hidden: ({ parent }) => parent?.variant !== "image-text",
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
              hidden: ({ parent }) => parent?.variant !== "text",
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
              hidden: ({ parent }) => parent?.variant === "text" || parent?.variant === "compact",
            },
            {
              name: "backgroundImage",
              type: "image",
              options: { hotspot: true },
              title: "Background Image",
              group: "background",
              hidden: ({ parent }) =>
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
              hidden: ({ parent }) =>
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
              hidden: ({ parent }) =>
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
              ],
              hidden: ({ parent }) => parent?.variant === "text",
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
          preview: {
            select: {
              title: "internalTitle",
              heading: "heading",
            },
            prepare({ title, heading }) {
              return {
                title: title || heading || "Hero",
                subtitle: "HERO",
              };
            },
          },
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
            { name: "heading", type: "string", title: "Heading", group: "content", validation: (Rule) => Rule.required() },
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
                      description: "Name of the Google Material Icon (e.g. 'architecture', 'construction')",
                    },
                    {
                      name: "icon",
                      type: "file",
                      title: "Icon (SVG)",
                      options: { accept: ".svg" },
                      iconColor: { value: "{colors.slate}" },
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
            prepare({ title, heading }) {
              return {
                title: title || heading || "Text with Grid",
                subtitle: "TEXT WITH GRID",
              };
            },
          },
        },
        {
          type: "object",
          name: "statsGrid",
          title: "Stats Grid",
          groups: [
            { name: "content", title: "Content" },
          ],
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
            select: {
              title: "internalTitle",
            },
            prepare({ title }) {
              return {
                title: title || "Project Stats",
                subtitle: "STATS GRID",
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
            { name: "heading", type: "string", title: "Heading", group: "content", validation: (Rule) => Rule.required() },
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
                      validation: (Rule) => Rule.required(),
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
              heading: "heading",
            },
            prepare({ title, heading }) {
              return {
                title: title || heading || "Project Showcase",
                subtitle: "PROJECT SHOWCASE",
              };
            },
          },
        },
        {
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
            prepare({ title, heading }) {
              return {
                title: title || heading || "Project Grid",
                subtitle: "PROJECT GRID",
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
            { name: "heading", type: "string", title: "Heading", group: "content", validation: (Rule) => Rule.required() },
            { name: "subheading", type: "text", title: "Subheading", group: "content" },
          ],
          preview: {
            select: { title: "internalTitle", heading: "heading" },
            prepare({ title, heading }) {
              return { 
                title: title || heading || "News Showcase",
                subtitle: "NEWS SHOWCASE",
              };
            },
          },
        },
        {
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
              validation: (Rule) => Rule.required(),
            },
            { name: "subheading", title: "Subheading", type: "text", group: "content" },
            backgroundColorField("background", "primary"),
            {
              name: "primaryCta",
              title: "Primary CTA",
              type: "object",
              group: "cta",
              fields: [
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
              ],
            },
            {
              name: "secondaryCta",
              title: "Secondary CTA",
              type: "object",
              group: "cta",
              fields: [
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
              ],
            },
          ],
          preview: {
            select: {
              title: "internalTitle",
              heading: "heading",
            },
            prepare({ title, heading }) {
              return {
                title: title || heading || "CTA Block",
                subtitle: "CTA BLOCK",
              };
            },
          },
        },
        {
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
            { name: "heading", type: "string", title: "Heading", group: "content", validation: (Rule) => Rule.required() },
            { name: "subheading", type: "text", title: "Subheading", group: "content" },
            backgroundColorField("background", "surface"),
            {
              name: "members",
              title: "Members",
              type: "array",
              of: [{ type: "reference", to: [{ type: "personnel" }] }],
              validation: (Rule) => Rule.required().min(1),
            },
          ],
          preview: {
            select: { title: "internalTitle", heading: "heading" },
            prepare({ title, heading }) {
              return { 
                title: title || heading || "Personnel Grid",
                subtitle: "PERSONNEL GRID",
              };
            },
          },
        },
        {
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
            { name: "heading", type: "string", title: "Heading", group: "content", validation: (Rule) => Rule.required() },
            { 
              name: "intro", 
              type: "array", 
              title: "Intro Paragraph", 
              group: "content",
              of: [{ type: "block" }] 
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
                    { name: "content", type: "text" }
                  ]
                }
              ]
            },
            backgroundColorField("background", "surface"),
          ],
          preview: {
            select: { title: "internalTitle", heading: "heading" },
            prepare({ title, heading }) {
              return { 
                title: title || heading || "Split Text Content",
                subtitle: "SPLIT TEXT CONTENT",
              };
            },
          },
        },
        {
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
                  options: {
                    list: [
                      { title: "Solid (Primary)", value: "primary" },
                      { title: "Underlined (Secondary)", value: "secondary" },
                      { title: "Arrow (Tertiary)", value: "tertiary" },
                      { title: "Ghost (White Border)", value: "ghost" },
                    ],
                  },
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
        },
      ],
    }),
  ],
});
