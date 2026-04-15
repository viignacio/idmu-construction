import { defineField, defineType } from "sanity";

export const footer = defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  fields: [
    defineField({
      name: "brandName",
      title: "Brand Name",
      type: "string",
      description: "Fallback text used if the Logo in Business Info is not set.",
      initialValue: "IDMU Construction",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [
        {
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
          },
        },
      ],
    }),
    defineField({
      name: "column1",
      title: "Column 1",
      type: "object",
      fields: [
        { name: "title", type: "string", initialValue: "Navigation" },
        {
          name: "links",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "text", type: "string" },
                { name: "url", type: "string" },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: "column2",
      title: "Column 2",
      type: "object",
      fields: [
        { name: "title", type: "string", initialValue: "Insights" },
        {
          name: "links",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "text", type: "string" },
                { name: "url", type: "string" },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: "connect",
      title: "Connect Section",
      type: "object",
      fields: [
        { name: "title", type: "string", initialValue: "Connect" },
      ],
    }),
    defineField({
      name: "copyright",
      title: "Copyright Text",
      type: "string",
      initialValue: "© 2024 IDMU Construction. All Rights Reserved.",
    }),
    defineField({
      name: "attribution",
      title: "Attribution Text",
      type: "string",
      initialValue: "Built with Structural Integrity",
    }),
  ],
});
