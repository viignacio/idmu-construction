import { css } from "@/styled-system/css";

interface ReadMoreLinkProps {
  /** Link text label. Defaults to "Read More". */
  label?: string;
  /**
   * Color context. "inherit" uses current text color; "white" forces white.
   * On hover the color always transitions to tertiary (gold).
   */
  color?: "inherit" | "white";
}

/**
 * Animated "Read More →" inline link indicator.
 * The gap between label and arrow animates outward on parent group hover.
 *
 * Usage: wrap the parent container with className="group" (or cx("group", ...))
 * so the _groupHover pseudo-class fires correctly.
 */
export default function ReadMoreLink({
  label = "Read More",
  color = "inherit",
}: ReadMoreLinkProps) {
  return (
    <div
      className={css({
        fontSize: "xs",
        fontWeight: "black",
        textTransform: "uppercase",
        letterSpacing: "widest",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        transition: "gap 0.3s, color 0.3s",
        _groupHover: {
          gap: "1rem",
          color: "tertiary",
        },
      })}
      style={{ color: color === "white" ? "white" : "inherit" }}
    >
      {label}
      <span
        className={css({
          fontSize: "1rem",
          fontWeight: "normal",
          fontFamily: "Material Symbols Outlined",
        })}
      >
        arrow_forward
      </span>
    </div>
  );
}
