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
          primary: { value: "#0D1B2A" }, // The Steel
          secondary: { value: "#415A77" }, // The Slate
          surface: { value: "#1B263B" }, // The Canvas
          tertiary: { value: "#E09F3E" }, // The Draftsman's Ink
          appBackground: { value: "#F9F9FF" },
        },
        fonts: {
          headline: { value: "var(--font-space-grotesk), sans-serif" },
          body: { value: "var(--font-inter), sans-serif" },
        },
      },
      semanticTokens: {
        colors: {
          text: {
            main: { value: "{colors.primary}" },
            muted: { value: "{colors.secondary}" },
            inverse: { value: "{colors.appBackground}" },
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
