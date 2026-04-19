import React from "react";
import { defineField, defineType } from "sanity";

export const news = defineType({
  name: "news",
  title: "News",
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
      name: "category",
      title: "Category",
      type: "string",
      description: "e.g. Innovation, Safety, Update",
      options: {
        list: [
          { title: "Technical Update", value: "Technical Update" },
          { title: "Project Milestone", value: "Project Milestone" },
          { title: "Safety Standards", value: "Safety Standards" },
          { title: "Innovation", value: "Innovation" },
          { title: "Community", value: "Community" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Publish Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      validation: (Rule) => Rule.required(),
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
      name: "excerpt",
      title: "Excerpt",
      type: "text",
    }),
    defineField({
      name: "content",
      title: "Content",
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
  ],
});
