import { defineField, defineType } from "sanity";

// Page Builder Modules
import { hero } from "./modules/hero";
import { textWithGrid } from "./modules/textWithGrid";
import { statsGrid } from "./modules/statsGrid";
import { projectShowcase } from "./modules/projectShowcase";
import { projectGrid } from "./modules/projectGrid";
import { newsShowcase } from "./modules/newsShowcase";
import { newsGrid } from "./modules/newsGrid";
import { ctaBlock } from "./modules/ctaBlock";
import { personnelGrid } from "./modules/personnelGrid";
import { splitTextContent } from "./modules/splitTextContent";
import { highlightsGrid } from "./modules/highlightsGrid";
import { newsletter } from "./modules/newsletter";
import { contactForm } from "./modules/contactForm";

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
        hero,
        textWithGrid,
        statsGrid,
        projectShowcase,
        projectGrid,
        newsShowcase,
        newsGrid,
        ctaBlock,
        personnelGrid,
        splitTextContent,
        highlightsGrid,
        newsletter,
        contactForm,
      ],
    }),
  ],
});
