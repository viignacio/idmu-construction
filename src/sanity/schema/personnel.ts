import { defineField, defineType } from "sanity";

export const personnel = defineType({
  name: "personnel",
  title: "Personnel",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "position",
      title: "Position",
      type: "string",
    }),
    defineField({
      name: "profileImage",
      title: "Profile Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 3,
      description: "Short biographic summary (one sentence) for the hover effect.",
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "Twitter", value: "twitter" },
                  { title: "Website", value: "website" },
                ],
              },
            },
            {
              name: "url",
              title: "URL",
              type: "url",
            },
          ],
        },
      ],
    }),
  ],
});
