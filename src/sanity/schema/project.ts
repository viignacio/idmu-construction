import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Projects",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Project Title",
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
      name: "sector",
      title: "Sector",
      type: "string",
      options: {
        list: [
          { title: "Residential (Homes, Villas)", value: "Residential" },
          { title: "Commercial (Offices, Retail)", value: "Commercial" },
          { title: "Industrial (Plants, Warehousing)", value: "Industrial" },
          { title: "Interior (Fit-outs, Renovations)", value: "Interior" },
          { title: "Institutional (Schools, Hospitals)", value: "Institutional" },
          { title: "Infrastructure (Highways, Bridges)", value: "Infrastructure" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "startDate",
      title: "Project Start Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "completionDate",
      title: "Project Completion Date",
      type: "date",
    }),
    defineField({
      name: "status",
      title: "Project Status",
      type: "string",
      options: {
        list: [
          { title: "Complete", value: "COMPLETE" },
          { title: "Ongoing", value: "ONGOING" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "completionPercentage",
      title: "Completion Percentage",
      type: "number",
      description: "0-100%",
      validation: (Rule) => Rule.min(0).max(100),
      hidden: ({ document }) => document?.status !== "ONGOING",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      placeholder: "e.g. Rotterdam, NL",
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA Label",
      type: "string",
      placeholder: "VIEW WALKTHROUGH",
    }),
    defineField({
      name: "client",
      title: "Client",
      type: "string",
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Project Description",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
  ],
});
