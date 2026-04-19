export const projectShowcase = {
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
    {
      name: "heading",
      type: "string",
      title: "Heading",
      group: "content",
      validation: (Rule: any) => Rule.required(),
    },
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
              validation: (Rule: any) => Rule.required(),
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
            prepare({ title, subtitle, media }: any) {
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
    prepare({ title, heading }: any) {
      return {
        title: title || heading || "Project Showcase",
        subtitle: "PROJECT SHOWCASE",
      };
    },
  },
};
