import { css, cx } from "@/styled-system/css";
import Link from "next/link";

export interface CtaButtonProps {
  text?: string;
  link?: string;
  variant?: "primary" | "secondary" | "tertiary" | "ghost";
  theme?: "dark" | "light";
  className?: string;
}

export const CtaButton = ({
  text,
  link,
  variant = "primary",
  theme = "dark",
  className,
}: CtaButtonProps) => {
  if (!text || !link) return null;

  const isDark = theme === "dark";

  // SOLID (PRIMARY)
  if (variant === "primary") {
    return (
      <Link
        href={link}
        className={cx(
          className,
          css({
            display: "inline-block",
            backgroundColor: isDark ? "tertiary" : "primary",
            color: isDark ? "primary" : "white",
            paddingX: "3rem",
            paddingY: "1rem",
            fontSize: "sm",
            fontWeight: "bold",
            fontFamily: "headline",
            textTransform: "uppercase",
            letterSpacing: "widest",
            textAlign: "center",
            textDecoration: "none",
            transition: "all 0.2s ease-out",
            cursor: "pointer",
            border: "none",
            _hover: {
              transform: "translateY(-2px)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              filter: "brightness(1.1)",
            },
            _active: {
              transform: "translateY(0)",
            },
          })
        )}
      >
        {text}
      </Link>
    );
  }

  // UNDERLINED (SECONDARY)
  if (variant === "secondary") {
    return (
      <Link
        href={link}
        className={cx(
          className,
          css({
            display: "inline-block",
            color: isDark ? "white" : "primary",
            borderBottom: "2px solid {colors.tertiary}",
            paddingX: "3rem",
            paddingY: "1.25rem",
            fontSize: "sm",
            fontWeight: "bold",
            fontFamily: "headline",
            textTransform: "uppercase",
            letterSpacing: "widest",
            textDecoration: "none",
            textAlign: "center",
            transition: "all 0.2s",
            _hover: {
              color: isDark ? "white" : "primary",
              borderColor: "{colors.tertiary}",
              filter: "brightness(1.2)",
            },
          })
        )}
      >
        {text}
      </Link>
    );
  }

  // GHOST (GHOST)
  if (variant === "ghost") {
    return (
      <Link
        href={link}
        className={cx(
          className,
          css({
            display: "inline-block",
            backgroundColor: "transparent",
            color: isDark ? "white" : "primary",
            border: "1px solid",
            borderColor: isDark ? "rgba(255,255,255,0.3)" : "rgba(13,27,42,0.3)",
            paddingX: "3rem",
            paddingY: "1rem",
            fontSize: "sm",
            fontWeight: "bold",
            fontFamily: "headline",
            textTransform: "uppercase",
            letterSpacing: "widest",
            textAlign: "center",
            textDecoration: "none",
            transition: "all 0.2s ease-out",
            cursor: "pointer",
            _hover: {
              backgroundColor: isDark ? "white" : "primary",
              color: isDark ? "primary" : "white",
              borderColor: isDark ? "white" : "primary",
            },
          })
        )}
      >
        {text}
      </Link>
    );
  }

  // ARROW (TERTIARY)
  return (
    <Link
      href={link}
      className={cx(
        className,
        css({
          display: "inline-flex",
          alignItems: "center",
          gap: "0.75rem",
          color: isDark ? "white" : "primary",
          fontSize: "xs",
          fontWeight: "bold",
          fontFamily: "headline",
          textTransform: "uppercase",
          letterSpacing: "widest",
          textDecoration: "none",
          transition: "all 0.2s",
          _hover: {
            gap: "1.25rem",
            color: "tertiary",
          },
        })
      )}
    >
      {text}
      <span
        className={css({
          fontFamily: "Material Symbols Outlined",
          fontSize: "1.25rem",
          fontWeight: "normal",
        })}
      >
        arrow_forward
      </span>
    </Link>
  );
};
