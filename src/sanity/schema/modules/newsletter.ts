import { backgroundColorField } from "../common";

export const newsletter = {
  type: "object",
  name: "newsletter",
  title: "Newsletter Subscription",
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
    {
      name: "heading",
      type: "string",
      title: "Heading",
      group: "content",
      initialValue: "STAY IN THE LOOP.",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "description",
      type: "text",
      title: "Description",
      group: "content",
      initialValue:
        "Receive the latest updates from our construction sites and architectural innovations.",
    },
    backgroundColorField("background", "surface"),
  ],
  preview: {
    select: { title: "internalTitle", heading: "heading" },
    prepare({ title, heading }: any) {
      return {
        title: title || heading || "Newsletter",
        subtitle: "NEWSLETTER",
      };
    },
  },
};
