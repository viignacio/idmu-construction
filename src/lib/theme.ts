export type Theme = "light" | "dark";

/**
 * Returns whether a given background color token should use a light or dark theme for its content.
 */
export function getThemeForBackground(backgroundColor?: string): Theme {
  const darkBackgrounds = ["primary", "secondary", "tertiary", "surface"];
  if (backgroundColor && darkBackgrounds.includes(backgroundColor)) {
    return "dark";
  }
  return "light";
}

/**
 * Returns the appropriate text color token or RGBA value for content sitting on top of a specific background.
 */
export function getOnSurfaceColor(
  backgroundColor?: string,
  variant: "primary" | "secondary" | "muted" = "primary"
): string {
  const isDark = getThemeForBackground(backgroundColor) === "dark";

  if (isDark) {
    switch (variant) {
      case "primary":
        return "white";
      case "secondary":
        return "rgba(255, 255, 255, 0.9)";
      case "muted":
        return "rgba(255, 255, 255, 0.7)";
      default:
        return "white";
    }
  }

  // Light theme defaults
  switch (variant) {
    case "primary":
      return "primary";
    case "secondary":
      return "on-surface-variant";
    case "muted":
      return "on-surface-variant";
    default:
      return "primary";
  }
}
