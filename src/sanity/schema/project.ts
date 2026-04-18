import React from "react";
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
    }),
    defineField({
      name: "startDate",
      title: "Project Start Date",
      type: "date",
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
      of: [
        { 
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [{ title: "Bullet", value: "bullet" }, { title: "Number", value: "number" }],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              {
                title: "Internal Link",
                name: "internalLink",
                type: "object",
                icon: () => React.createElement(
                    'svg',
                    {
                      fill: 'none',
                      stroke: 'currentColor',
                      strokeWidth: '2',
                      viewBox: '0 0 24 24',
                      width: '1em',
                      height: '1em',
                    },
                    React.createElement('path', {
                      d: 'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71',
                    }),
                    React.createElement('path', {
                      d: 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71',
                    })
                ),
                fields: [
                  {
                    name: "reference",
                    type: "reference",
                    title: "Reference",
                    to: [
                      { type: "project" },
                      { type: "news" },
                      { type: "page" },
                    ],
                  },
                ],
              },
              {
                title: "External Link",
                name: "link",
                type: "object",
                icon: () => React.createElement(
                    'svg',
                    {
                      fill: 'none',
                      stroke: 'currentColor',
                      strokeWidth: '2',
                      viewBox: '0 0 24 24',
                      width: '1em',
                      height: '1em',
                    },
                    React.createElement('path', {
                      d: 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6',
                    }),
                    React.createElement('polyline', {
                      points: '15 3 21 3 21 9',
                    }),
                    React.createElement('line', {
                      x1: '10',
                      y1: '14',
                      x2: '21',
                      y2: '3',
                    })
                ),
                fields: [
                  {
                    title: "URL",
                    name: "href",
                    type: "url",
                  },
                ],
              },
            ],
          },
        }
      ],
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
  ],
});
