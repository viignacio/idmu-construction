import { css } from "@/styled-system/css";
import { urlFor } from "@/sanity/lib/image";

interface GridItem {
  label?: string;
  iconUrl?: string;
  iconName?: string;
  title?: string;
  description?: string;
  bullets?: string[];
}

interface TextWithGridProps {
  variant?: "3-grid" | "3-grid-gradient" | "3-grid-checkered" | "4-grid";
  preamble?: string;
  heading?: string;
  subheading?: string;
  gridItems?: GridItem[];
  backgroundColor?: string;
}

export default function TextWithGrid({
  variant = "3-grid-gradient",
  backgroundColor = "background",
  preamble,
  heading,
  subheading,
  gridItems = [],
}: TextWithGridProps) {
  const isCheckered = variant === "3-grid-checkered";
  const isMethod = variant === "4-grid-method";
  const isDarkSection = ["primary", "secondary", "surface", "blueprint", "primary-container"].includes(backgroundColor);

  return (
    <section 
      className={css({ 
        paddingY: { base: "6rem", md: "8rem" }, 
        paddingX: { base: "2rem", md: "6rem" },
        backgroundColor: backgroundColor || "background" 
      })}
    >
      {/* Intro Header - Asymmetrical 12-column Grid */}
      <div className={css({ 
        display: "grid",
        gridTemplateColumns: { base: "1fr", md: "repeat(12, 1fr)" },
        gap: { base: "2rem", md: (isCheckered || isMethod) ? "1.5rem" : "4rem" },
        alignItems: (isCheckered || isMethod) ? "flex-start" : "end",
        marginBottom: "6rem" 
      })}>
        <div className={css({ md: { gridColumn: (isCheckered || isMethod) ? "span 12" : "span 8" } })}>
          {preamble && !isMethod && (
            <span className={css({
              display: "block",
              fontFamily: "body",
              fontWeight: "900",
              fontSize: "xs",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: isDarkSection ? "rgba(255, 255, 255, 0.6)" : "secondary",
              marginBottom: "1rem",
            })}>
              {preamble}
            </span>
          )}

          {heading && (
            <h2 className={css({
              fontFamily: "headline",
              fontWeight: "bold",
              fontSize: { base: "4xl", md: "5xl" }, // Adjusted to match design
              color: isDarkSection ? "white" : "primary",
              letterSpacing: "tighter",
              textTransform: "uppercase",
              marginBottom: (isCheckered || isMethod) ? 0 : "1.5rem",
            })}>
              {heading}
            </h2>
          )}

          {preamble && isMethod && (
            <p className={css({
              color: backgroundColor === "tertiary" ? "primary" : "tertiary",
              fontWeight: "bold",
              fontSize: "xs",
              letterSpacing: "widest",
              textTransform: "uppercase",
            })}>
              {preamble}
            </p>
          )}
        </div>

        {subheading && !isMethod && (
          <div className={css({ 
            md: { gridColumn: isCheckered ? "span 7" : "span 4" }, // Restricted to 7 columns if stacked for better readability
            color: isDarkSection ? "rgba(255, 255, 255, 0.7)" : "on-surface-variant",
            fontSize: "lg",
            lineHeight: "relaxed",
            fontWeight: "medium"
          })}>
            {subheading}
          </div>
        )}
      </div>

      {/* Grid Container */}
      <div className={css({
        display: "grid",
        gridTemplateColumns: {
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: isMethod ? "repeat(4, 1fr)" : (variant.startsWith("3-grid") ? "repeat(3, 1fr)" : "repeat(4, 1fr)")
        },
        gridAutoRows: "1fr", // Force consistent row height
        width: "full",
        gap: 0, // Cards sit flush
      })}>
        {gridItems.map((item, index) => {
          const opacity = (index + 1) * 0.05;
          const bgTone = `rgba(59, 130, 246, ${opacity})`;

          // Adaptive checkered background
          const checkeredBg = isDarkSection
            ? (index % 2 === 0 ? "rgba(255, 255, 255, 0.03)" : "rgba(255, 255, 255, 0.07)")
            : (index % 2 === 0 ? "rgba(59, 130, 246, 0.04)" : "rgba(59, 130, 246, 0.09)");
          
          return (
            <div
              key={index}
              style={{ backgroundColor: (isCheckered || isMethod) ? checkeredBg : bgTone }}
              className={`group ${css({
                position: "relative",
                padding: { base: "2.5rem", md: "3rem" },
                transition: "all 0.5s ease",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "transparent",
                _hover: {
                  backgroundColor: isDarkSection ? "rgba(255, 255, 255, 0.05) !important" : "primary !important",
                }
              })}`}
            >
              <div>
                {/* Label (Step Number / Prefix) */}
                {item.label && (
                  <span className={css({
                    color: backgroundColor === "tertiary" ? "primary" : "tertiary",
                    fontWeight: "bold",
                    fontSize: "lg",
                    marginBottom: "1.5rem",
                    display: "block",
                    _groupHover: {
                      color: isDarkSection ? "tertiary" : "white",
                    }
                  })}>
                    {item.label}
                  </span>
                )}

                {/* Icon (Material Symbol) */}
                {item.iconName && !isMethod && (
                  <div className={css({ marginBottom: "3rem" })}>
                    <span 
                      className={`material-symbols-outlined ${css({
                        fontSize: "2.5rem !important",
                        color: isDarkSection ? "white" : "primary",
                        transition: "color 0.4s",
                        _groupHover: {
                          color: "tertiary",
                        }
                      })}`}
                    >
                      {item.iconName}
                    </span>
                  </div>
                )}

                {/* Legacy Icon (SVG Filter) */}
                {item.iconUrl && !item.iconName && (
                  <div 
                    style={{
                      WebkitMaskImage: `url("${item.iconUrl}")`,
                      WebkitMaskRepeat: "no-repeat",
                      WebkitMaskPosition: "center",
                      WebkitMaskSize: "contain",
                      maskImage: `url("${item.iconUrl}")`,
                      maskRepeat: "no-repeat",
                      maskPosition: "center",
                      maskSize: "contain",
                    }}
                    className={css({
                      width: "2.5rem",
                      height: "2.5rem",
                      backgroundColor: isCheckered ? "tertiary" : "primary",
                      transition: "all 0.4s",
                      marginBottom: "2rem",
                      _groupHover: {
                        backgroundColor: isCheckered ? "white" : "tertiary",
                      }
                    })}
                  />
                )}

                {/* Title */}
                <h3 className={css({
                  fontFamily: "headline",
                  fontSize: "xl",
                  fontWeight: "bold",
                  color: isDarkSection ? "white" : "primary",
                  textTransform: "uppercase",
                  letterSpacing: "tight",
                  marginBottom: "1rem",
                  transition: "color 0.4s",
                  _groupHover: {
                    color: "white",
                  }
                })}>
                  {item.title}
                </h3>

                {/* Description */}
                <p className={css({
                  color: isDarkSection ? "rgba(255, 255, 255, 0.6)" : "on-surface-variant",
                  fontSize: "sm",
                  lineHeight: "relaxed",
                  fontWeight: "normal",
                  transition: "color 0.4s",
                  _groupHover: {
                    color: "rgba(255, 255, 255, 0.9)",
                  }
                })}>
                  {item.description}
                </p>
              </div>

              {/* Bullets - Only show if they exist */}
              {item.bullets && item.bullets.length > 0 && (
                <ul className={css({
                  listStyle: "none",
                  marginTop: "2rem",
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                  opacity: isCheckered ? 1 : 0, 
                  transform: isCheckered ? "none" : "translateY(10px)",
                  transition: "all 0.4s ease-out",
                  _groupHover: {
                    opacity: 1,
                    transform: "none",
                  }
                })}>
                  {item.bullets.map((bullet, bIndex) => (
                    <li 
                      key={bIndex}
                      className={css({
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        color: isDarkSection ? "white" : "primary",
                        fontSize: "xs",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        letterSpacing: "wide",
                        transition: "color 0.4s",
                        _groupHover: {
                          color: "tertiary",
                        }
                      })}
                    >
                      <span className={css({
                        width: "6px",
                        height: "6px",
                        borderRadius: "full",
                        backgroundColor: isDarkSection ? "tertiary" : (backgroundColor === "tertiary" ? "primary" : "tertiary"),
                        transition: "background-color 0.4s",
                        _groupHover: {
                          backgroundColor: "tertiary",
                        }
                      })} />
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

