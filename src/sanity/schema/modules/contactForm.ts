import { backgroundColorField } from "../common";

export const contactForm = {
  type: "object",
  name: "contactForm",
  title: "Contact Form & Info",
  groups: [
    { name: "content", title: "Content" },
    { name: "background", title: "Appearance" },
  ],
  fields: [
    {
      name: "internalTitle",
      title: "Internal Title",
      type: "string",
      description: "For studio purposes only (e.g. 'Contact Page - Main Form')",
      group: "content",
    },
    {
      name: "heading",
      title: "Section Heading",
      type: "string",
      group: "content",
      initialValue: "Let's build the future.",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "subheading",
      title: "Subheading",
      type: "text",
      group: "content",
      initialValue:
        "Whether you're planning a commercial complex or a residential masterpiece, our team is ready to execute your vision with precision.",
    },
    {
      name: "mapEmbedUrl",
      title: "Map Embed URL",
      type: "url",
      description:
        "Google Maps iframe src link (e.g. https://www.google.com/maps/embed?...)",
      group: "content",
    },
    backgroundColorField("background", "background"),
  ],
  preview: {
    select: { title: "internalTitle", heading: "heading" },
    prepare({ title, heading }: any) {
      return {
        title: title || heading || "Contact Form",
        subtitle: "CONTACT FORM",
      };
    },
  },
};
