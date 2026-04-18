import { css } from "@/styled-system/css";
import Link from "next/link";

interface CTA {
  text?: string;
  link?: string;
  variant?: "primary" | "secondary" | "tertiary" | "ghost";
}

interface CtaBlockProps {
  layout?: "one" | "two";
  heading: string;
  subheading?: string;
  backgroundColor: string;
  primaryCta?: CTA;
  secondaryCta?: CTA;
  // Legacy support for older content
  ctaText?: string;
  ctaLink?: string;
  ctaVariant?: "primary" | "secondary" | "tertiary";
}

const getThemeColors = (bg: string) => {
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
  // Dark: Primary (Steel), Slate, Surface (Canvas)
  // Light: Tertiary (Yellow), Background, Blueprint (Ice Blue)
  const isDark = ["primary", "secondary", "surface"].includes(activeToken);
  
  // Use white text on dark backgrounds; primary text on light backgrounds
  const mainTextColor = isDark ? "white" : "text.main";
  
  return {
    bg: activeToken,
    text: mainTextColor,
    subtext: mainTextColor,
    // Dark BG -> Tertiary (Yellow) button
    // Light BG -> Primary (Steel) button
    button: isDark ? "tertiary" : "primary",
    buttonText: isDark ? "primary" : "white",
  };
};

const ButtonRenderer = ({ cta, theme, isTwoLayout }: { cta: CTA, theme: any, isTwoLayout: boolean }) => {
  const { text, link, variant = "primary" } = cta;
  if (!text || !link) return null;

  // Solid Variant
  if (variant === "primary") {
    return (
      <Link
        href={link}
        className={css({
          backgroundColor: theme.button,
          color: theme.buttonText,
          paddingX: isTwoLayout ? "3rem" : "4rem",
          paddingY: "1.25rem",
          fontSize: isTwoLayout ? "sm" : "xl",
          fontWeight: "bold",
          fontFamily: "headline",
          textTransform: "uppercase",
          letterSpacing: "widest",
          transition: "all 0.2s ease-out",
          boxShadow: isTwoLayout ? "none" : "xl",
          cursor: "pointer",
          display: "inline-block",
          textAlign: "center",
          _hover: {
            transform: isTwoLayout ? "none" : "scale(1.05)",
            filter: "brightness(1.1)",
          },
          _active: {
            transform: "scale(0.95)",
          },
        })}
      >
        {text}
      </Link>
    );
  }

  // Underlined Variant
  if (variant === "secondary") {
    return (
      <Link
        href={link}
        className={"group " + css({
          color: theme.text,
          fontSize: isTwoLayout ? "sm" : "xl",
          fontWeight: "bold",
          fontFamily: "headline",
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
        {text}
      </Link>
    );
  }

  // Ghost Variant (Used in two-layout)
  if (variant === "ghost") {
    const isDarkBackground = theme.text === "white";
    return (
      <Link
        href={link}
        className={css({
          backgroundColor: "transparent",
          color: theme.text,
          border: "2px solid",
          borderColor: isDarkBackground ? "rgba(255,255,255,0.2)" : "rgba(13,27,42,0.2)",
          paddingX: "3rem",
          paddingY: "1.25rem",
          fontSize: "sm",
          fontWeight: "bold",
          fontFamily: "headline",
          textTransform: "uppercase",
          letterSpacing: "widest",
          transition: "all 0.2s ease-out",
          cursor: "pointer",
          display: "inline-block",
          textAlign: "center",
          _hover: {
            backgroundColor: theme.text,
            color: isDarkBackground ? "primary" : "white",
          },
          _active: {
            transform: "scale(0.95)",
          },
        })}
      >
        {text}
      </Link>
    );
  }

  // Arrow Variant
  return (
    <Link
      href={link}
      className={css({
        fontSize: "sm",
        fontWeight: "black",
        fontFamily: "headline",
        textTransform: "uppercase",
        letterSpacing: "widest",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        transition: "gap 0.3s",
        color: theme.text,
        _hover: {
          gap: "1rem",
        }
      })}
    >
      {text}
      <span className={css({
        fontSize: "1.25rem",
        fontWeight: "normal",
        fontFamily: "Material Symbols Outlined"
      })}>
        arrow_forward
      </span>
    </Link>
  );
};

export default function CtaBlock({
  layout = "one",
  heading,
  subheading,
  backgroundColor,
  primaryCta,
  secondaryCta,
  // Legacy
  ctaText,
  ctaLink,
  ctaVariant = "primary",
}: CtaBlockProps) {
  const theme = getThemeColors(backgroundColor);
  const isTwoLayout = layout === "two";

  // Normalize CTAs
  const pCta = primaryCta || (ctaText ? { text: ctaText, link: ctaLink, variant: ctaVariant } : null);

  if (isTwoLayout) {
    return (
      <section className={css({
        paddingY: { base: "6rem", md: "8rem" },
        paddingX: { base: "2rem", md: "6rem" },
      })}>
        <div className={css({
          backgroundColor: theme.bg,
          padding: { base: "3rem", md: "6rem" },
          display: "flex",
          flexDirection: { base: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: "4rem",
          width: "100%",
          marginX: "auto",
        })}>
          <div className={css({ maxWidth: "2xl" })}>
            <h2 className={css({
              fontFamily: "headline",
              fontWeight: "black",
              fontSize: { base: "4xl", md: "6xl" },
              lineHeight: "1",
              letterSpacing: "tighter",
              textTransform: "uppercase",
              marginBottom: "1.5rem",
              color: theme.text,
            })}>
              {heading}
            </h2>
            {subheading && (
              <p className={css({
                fontSize: "lg",
                lineHeight: "relaxed",
                color: theme.subtext,
                opacity: 0.8,
                maxWidth: "xl",
              })}>
                {subheading}
              </p>
            )}
          </div>

          <div className={css({
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            width: { base: "100%", md: "auto" },
          })}>
            {pCta && <ButtonRenderer cta={pCta} theme={theme} isTwoLayout={true} />}
            {secondaryCta && <ButtonRenderer cta={secondaryCta} theme={theme} isTwoLayout={true} />}
          </div>
        </div>
      </section>
    );
  }

  // One Layout (Centered - Original)
  return (
    <section
      className={css({
        paddingY: { base: "6rem", md: "8rem" },
        paddingX: { base: "2rem", md: "6rem" },
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
            opacity: 0.8,
            maxWidth: "2xl",
            marginBottom: "3rem",
            color: theme.subtext,
          })}
        >
          {subheading}
        </p>
      )}

      {pCta && <ButtonRenderer cta={pCta} theme={theme} isTwoLayout={false} />}
    </section>
  );
}
