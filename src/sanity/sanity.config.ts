import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schema } from "./schema";

export default defineConfig({
  name: "idmu-monolith",
  title: "IDMU Construction Studio",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",

  basePath: "/studio",

  plugins: [structureTool()],

  schema: {
    types: schema.types,
  },
});
