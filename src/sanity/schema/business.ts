import { defineField, defineType } from "sanity";

export const business = defineType({
  name: "business",
  title: "Business Info",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Company Name",
      type: "string",
    }),
    defineField({
      name: "slogan",
      title: "Slogan",
      type: "string",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "text",
    }),
    defineField({
      name: "socials",
      title: "Social Media",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "platform", type: "string" },
            { name: "url", type: "url" },
          ],
        },
      ],
    }),
  ],
});
