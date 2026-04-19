export const getThemeColors = (bg: string) => {
  // Map Sanity values to their semantic counterparts in the Panda config
  const colors: Record<string, string> = {
    primary: "primary",
    secondary: "secondary",
    tertiary: "tertiary",
    surface: "surface",
    background: "background",
    blueprint: "blueprint",
  };

  const activeToken = colors[bg] || "primary";

  // Logical color detection for contrast
  const isDark = ["primary", "secondary", "surface"].includes(activeToken);
  
  // Use white text on dark backgrounds; primary text on light backgrounds
  const mainTextColor = isDark ? "white" : "text.main";
  
  return {
    bg: activeToken,
    text: mainTextColor,
    subtext: mainTextColor,
    isDark,
  };
};
