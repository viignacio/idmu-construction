import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schema } from "./schema";

export default defineConfig({
  name: "idmu-monolith",
  title: "IDMU Construction Studio",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",

  basePath: "/studio",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.divider().title("Business and Pages"),
            // Singleton: Business Info
            S.listItem()
              .title("Business Info")
              .id("business-info")
              .child(
                S.document()
                  .schemaType("business")
                  .documentId("business")
                  .title("Business Info")
              ),
            // Singleton: Header
            S.listItem()
              .title("Header")
              .id("header-singleton")
              .child(
                S.document()
                  .schemaType("header")
                  .documentId("header")
                  .title("Header")
              ),
            // Singleton: Footer
            S.listItem()
              .title("Footer")
              .id("footer-singleton")
              .child(
                S.document()
                  .schemaType("footer")
                  .documentId("footer")
                  .title("Footer")
              ),
            S.documentTypeListItem("page").title("Pages"),

            S.divider().title("Reference Documents"),

            // Reference Documents
            S.documentTypeListItem("project").title("Projects"),
            S.documentTypeListItem("news").title("News"),
          ]),
    }),
  ],

  schema: {
    types: schema.types,
    // Filter out the singleton from the regular "Create New" menu
    templates: (prev) =>
      prev.filter(
        (template) =>
          !["business", "header", "footer"].includes(template.schemaType)
      ),
  },

  document: {
    // Hide "unpublish", "delete", or "duplicate" for the singleton
    actions: (prev, context) =>
      ["business", "header", "footer"].includes(context.schemaType)
        ? prev.filter(
            (obj) =>
              obj.action &&
              !["unpublish", "delete", "duplicate"].includes(obj.action)
          )
        : prev,
  },
});

