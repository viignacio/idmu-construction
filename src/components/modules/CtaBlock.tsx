import { css } from "@/styled-system/css";
import { CtaButton } from "@/components/common/CtaButton";

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
            minWidth: { md: "240px" },
            alignItems: "stretch",
          })}>
            {pCta && (
              <CtaButton 
                {...pCta} 
                theme={theme.isDark ? "dark" : "light"} 
                className={css({ width: "100% !important", display: "flex !important", justifyContent: "center" })}
              />
            )}
            {secondaryCta && (
              <CtaButton 
                {...secondaryCta} 
                theme={theme.isDark ? "dark" : "light"} 
                className={css({ width: "100% !important", display: "flex !important", justifyContent: "center" })}
              />
            )}
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

      <div className={css({
        display: "flex",
        flexDirection: { base: "column", md: "row" },
        alignItems: "center",
        justifyContent: "center",
        gap: "2.5rem",
        marginTop: "1rem",
      })}>
        {pCta && <CtaButton {...pCta} theme={theme.isDark ? "dark" : "light"} />}
        {secondaryCta && <CtaButton {...secondaryCta} theme={theme.isDark ? "dark" : "light"} />}
      </div>
    </section>
  );
}
