import { defineField, defineType } from "sanity";

export const header = defineType({
  name: "header",
  title: "Header",
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
      name: "links",
      title: "Navigation Links",
      type: "array",
      of: [
        {
          type: "object",
          name: "link",
          fields: [
            { name: "text", type: "string" },
            { name: "url", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "cta",
      title: "CTA Button",
      type: "object",
      fields: [
        { name: "text", type: "string", initialValue: "Get a Quote" },
        { name: "url", type: "string", initialValue: "#" },
      ],
    }),
  ],
});
