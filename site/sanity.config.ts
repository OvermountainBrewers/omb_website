import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "../cms/schemaTypes";
import { buildStructure } from "./sanity.structure_builder";

export default defineConfig({
  basePath: "/cms",
  name: "production",
  title: "OvermountainBrewers",
  projectId: "ilp5p0ny",
  dataset: "production",
  plugins: [
    structureTool({
      structure: buildStructure,
    }),
  ],
  schema: { types: schemaTypes },
});
