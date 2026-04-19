import { css } from "@/styled-system/css";

interface SectionHeaderProps {
  /** The main section heading */
  heading?: string | null;
  /** Optional supporting text below the heading */
  subheading?: string | null;
  /**
   * Visual size scale.
   * - "large"  → used in full-width archive/showcase sections (5xl → 5rem)
   * - "medium" → used in more compact module headers (4xl → 5xl)
   */
  size?: "large" | "medium";
  /** Panda CSS color token for the heading. Defaults to "primary". */
  headingColor?: string;
  /** Panda CSS color token for the subheading. Defaults to "on-surface-variant". */
  subheadingColor?: string;
}

/**
 * Reusable module section header — heading + optional subheading.
 * Eliminates the repeated heading/subheading pattern across ProjectGrid,
 * NewsGrid, ProjectShowcase, and NewsShowcase.
 */
export default function SectionHeader({
  heading,
  subheading,
  size = "large",
  headingColor = "primary",
  subheadingColor = "on-surface-variant",
}: SectionHeaderProps) {
  if (!heading && !subheading) return null;

  const headingSize =
    size === "large"
      ? { base: "5xl" as const, md: "5rem" }
      : { base: "4xl" as const, md: "5xl" as const };

  return (
    <div>
      {heading && (
        <h2
          className={css({
            fontFamily: "headline",
            fontWeight: "bold",
            letterSpacing: "tighter",
            lineHeight: "0.85",
            textTransform: "uppercase",
            marginBottom: subheading ? "1.5rem" : "0",
          })}
          style={{
            fontSize: `clamp(2rem, 5vw, ${size === "large" ? "5rem" : "3.5rem"})`,
            color: `var(--colors-${headingColor}, inherit)`,
          }}
        >
          {heading}
        </h2>
      )}
      {subheading && (
        <p
          className={css({
            maxWidth: "2xl",
            fontSize: "lg",
            lineHeight: "relaxed",
          })}
          style={{ color: `var(--colors-${subheadingColor}, inherit)` }}
        >
          {subheading}
        </p>
      )}
    </div>
  );
}
