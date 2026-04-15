import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        colors: {
          steel: { value: "#0D1B2A" }, // The structural core
          slate: { value: "#415A77" }, // Supporting structural tones
          canvas: { value: "#1B263B" }, // Neutral base for backgrounds
          draftsmansInk: { value: "#E09F3E" }, // Accent/Highlights
          siteBackground: { value: "#F9F9FF" },
          iceBlue: { value: "#3B82F6" }, // The 'Ice Blue' from the design
        },
        fonts: {
          headline: { value: "var(--font-space-grotesk), sans-serif" },
          body: { value: "var(--font-inter), sans-serif" },
        },
      },
      semanticTokens: {
        colors: {
          primary: { value: "{colors.steel}" },
          secondary: { value: "{colors.slate}" },
          surface: { value: "{colors.canvas}" },
          tertiary: { value: "{colors.draftsmansInk}" },
          background: { value: "{colors.siteBackground}" },
          blueprint: { value: "{colors.iceBlue}" },
          text: {
            main: { value: "{colors.steel}" },
            muted: { value: "{colors.slate}" },
            inverse: { value: "{colors.siteBackground}" },
          },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: "styled-system",

  // Use clean output
  clean: true,
});
