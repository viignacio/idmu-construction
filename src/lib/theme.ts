export type Theme = "light" | "dark";

export interface ThemeColors {
  bg: string;
  isDark: boolean;
  text: string;
  subtext: string;
}

// Single source of truth for matching background colors to their contrast needs
export const THEME_MAP: Record<string, ThemeColors> = {
  primary: { bg: "primary", isDark: true, text: "white", subtext: "rgba(255, 255, 255, 0.9)" },
  secondary: { bg: "secondary", isDark: true, text: "white", subtext: "rgba(255, 255, 255, 0.9)" },
  tertiary: { bg: "tertiary", isDark: false, text: "text.main", subtext: "on-surface-variant" },
  surface: { bg: "surface", isDark: true, text: "white", subtext: "rgba(255, 255, 255, 0.9)" },
  background: { bg: "background", isDark: false, text: "text.main", subtext: "on-surface-variant" },
  blueprint: { bg: "blueprint", isDark: true, text: "white", subtext: "rgba(255, 255, 255, 0.9)" },
  white: { bg: "white", isDark: false, text: "text.main", subtext: "on-surface-variant" },
};

/**
 * Returns whether a given background color token should use a light or dark theme for its content.
 */
export function getThemeForBackground(backgroundColor?: string): Theme {
  const config = THEME_MAP[backgroundColor || "primary"] || THEME_MAP.primary;
  return config.isDark ? "dark" : "light";
}

/**
 * Returns the appropriate text color token or RGBA value for content sitting on top of a specific background.
 */
export function getOnSurfaceColor(
  backgroundColor?: string,
  variant: "primary" | "secondary" | "muted" = "primary"
): string {
  const config = THEME_MAP[backgroundColor || "primary"] || THEME_MAP.primary;

  if (variant === "primary") return config.text;
  if (variant === "secondary") return config.subtext;
  // Fallback for mutated (like preambles)
  return config.isDark ? "rgba(255, 255, 255, 0.7)" : "on-surface-variant";
}

/**
 * Shared utility for mapping Sanity background colors to Panda tokens and contrast logic.
 */
export const getThemeColors = (bg: string) => {
  const config = THEME_MAP[bg] || THEME_MAP.primary;
  return {
    bg: config.bg,
    text: config.text,
    subtext: config.subtext,
    isDark: config.isDark,
  };
};
