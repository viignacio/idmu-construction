import { css } from "../../../styled-system/css";
import Link from "next/link";

interface CtaBlockProps {
  heading: string;
  subheading?: string;
  backgroundColor: string;
  ctaText: string;
  ctaLink: string;
  ctaVariant: "primary" | "secondary" | "tertiary";
}

const getThemeColors = (bg: string) => {
  // Dark Backgrounds (Steel, Slate, Navy Surface)
  const isDark = ["primary", "surface", "secondary"].includes(bg);
  
  return {
    bg: bg,
    text: isDark ? "white" : "text.main",
    button: isDark ? "white" : "primary",
    buttonText: isDark ? "primary" : "white",
  };
};

export default function CtaBlock({
  heading,
  subheading,
  backgroundColor,
  ctaText,
  ctaLink,
  ctaVariant = "primary",
}: CtaBlockProps) {
  const theme = getThemeColors(backgroundColor);

  return (
    <section
      className={css({
        paddingY: { base: "6rem", md: "8rem" },
        paddingX: "2rem",
        backgroundColor: theme.bg as any,
        color: theme.text as any,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      })}
    >
      <h2
        className={css({
          fontFamily: "headline",
          fontWeight: "black",
          fontSize: { base: "4xl", md: "7xl" },
          lineHeight: "0.9",
          letterSpacing: "tighter",
          textTransform: "uppercase",
          marginBottom: "2rem",
          maxWidth: "4xl",
        })}
      >
        {heading}
      </h2>

      {subheading && (
        <p
          className={css({
            fontSize: { base: "lg", md: "xl" },
            lineHeight: "relaxed",
            opacity: 0.9,
            maxWidth: "2xl",
            marginBottom: "3rem",
          })}
        >
          {subheading}
        </p>
      )}

      {/* Primary CTA Variant (Solid) */}
      {ctaVariant === "primary" && (
        <Link
          href={ctaLink}
          className={css({
            backgroundColor: theme.button as any,
            color: theme.buttonText as any,
            paddingX: "4rem",
            paddingY: "1.5rem",
            fontSize: "xl",
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: "widest",
            transition: "all 0.2s ease-out",
            boxShadow: "xl",
            cursor: "pointer",
            display: "inline-block",
            _hover: {
              transform: "scale(1.05)",
            },
            _active: {
              transform: "scale(0.95)",
            },
          })}
        >
          {ctaText}
        </Link>
      )}

      {/* Secondary CTA Variant (Ghost with Underline) */}
      {ctaVariant === "secondary" && (
        <Link
          href={ctaLink}
          className={"group " + css({
            color: theme.text as any,
            fontSize: "xl",
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: "widest",
            display: "inline-flex",
            alignItems: "center",
            position: "relative",
            paddingBottom: "0.5rem",
            transition: "all 0.2s",
            _after: {
              content: '""',
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "2px",
              backgroundColor: "tertiary",
              transform: "scaleX(0.7)",
              transformOrigin: "left",
              transition: "transform 0.3s ease-out",
            },
            _hover: {
              _after: {
                transform: "scaleX(1)",
              }
            }
          })}
        >
          {ctaText}
        </Link>
      )}

      {/* Tertiary CTA Variant (Arrow) */}
      {ctaVariant === "tertiary" && (
        <Link
          href={ctaLink}
          className={css({
            fontSize: "sm",
            fontWeight: "black",
            textTransform: "uppercase",
            letterSpacing: "widest",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            transition: "gap 0.3s",
            _hover: {
              gap: "1rem",
            }
          })}
        >
          {ctaText}
          <span className={css({
            fontSize: "1.25rem",
            fontWeight: "normal",
            fontFamily: "Material Symbols Outlined"
          })}>
            arrow_forward
          </span>
        </Link>
      )}
    </section>
  );
}
