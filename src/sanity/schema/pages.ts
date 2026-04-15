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
          fields: [
            { name: "heading", type: "string" },
            { name: "subheading", type: "text" },
            { name: "backgroundImage", type: "image", options: { hotspot: true } },
            {
              name: "variant",
              type: "string",
              options: { list: ["full", "compact"] },
              initialValue: "full",
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
