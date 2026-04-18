import { defineField } from "sanity";

export const backgroundOptions = [
  { title: "Primary (Steel)", value: "primary" },
  { title: "Secondary (Slate)", value: "secondary" },
  { title: "Tertiary (Draftsman's Ink)", value: "tertiary" },
  { title: "Surface (Canvas)", value: "surface" },
  { title: "Background (Light)", value: "background" },
  { title: "Blueprint (Ice Blue)", value: "blueprint" },
];

export const backgroundColorField = (group = "background", initialValue = "background") => defineField({
  name: "backgroundColor",
  title: "Background Color",
  type: "string",
  options: {
    list: backgroundOptions,
  },
  initialValue,
  group,
});
