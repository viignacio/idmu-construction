import { css } from "../../../styled-system/css";

interface GridItem {
  iconUrl?: string;
  title?: string;
  description?: string;
  bullets?: string[];
}

interface TextWithGridProps {
  variant?: "3-grid" | "4-grid";
  preamble?: string;
  heading?: string;
  subheading?: string;
  gridItems?: GridItem[];
}

export default function TextWithGrid({
  variant = "3-grid",
  preamble,
  heading,
  subheading,
  gridItems = [],
}: TextWithGridProps) {
  return (
    <section 
      className={css({ 
        paddingY: { base: "6rem", md: "8rem" }, 
        paddingX: { base: "2rem", md: "6rem" },
        backgroundColor: "background" 
      })}
    >
      {/* Intro Header - Asymmetrical 12-column Grid */}
      <div className={css({ 
        display: "grid",
        gridTemplateColumns: { base: "1fr", md: "repeat(12, 1fr)" },
        gap: { base: "2rem", md: "4rem" },
        alignItems: "end",
        marginBottom: "6rem" 
      })}>
        <div className={css({ md: { gridColumn: "span 8" } })}>
          {preamble && (
            <span className={css({
              display: "block",
              fontFamily: "body",
              fontWeight: "900",
              fontSize: "xs", // Increased from 10px
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "secondary",
              marginBottom: "1rem",
            })}>
              {preamble}
            </span>
          )}

          {heading && (
            <h2 className={css({
              fontFamily: "headline",
              fontWeight: "bold",
              fontSize: { base: "4xl", md: "7xl" },
              color: "primary",
              lineHeight: "0.9",
              letterSpacing: "tighter",
              textTransform: "uppercase",
            })}>
              {heading}
            </h2>
          )}
        </div>

        {subheading && (
          <div className={css({ 
            md: { gridColumn: "span 4" },
            color: "secondary",
            fontSize: "lg",
            lineHeight: "relaxed",
            fontWeight: "medium" // Reverted from semibold
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
          md: variant === "3-grid" ? "repeat(3, 1fr)" : "repeat(2, 1fr)",
          lg: variant === "3-grid" ? "repeat(3, 1fr)" : "repeat(4, 1fr)"
        },
        width: "full",
      })}>
        {gridItems.map((item, index) => {
          const opacity = (index + 1) * 0.05;
          const bgTone = `rgba(59, 130, 246, ${opacity})`; // Using 'blueprint' token base

          return (
            <div
              key={index}
              style={{ backgroundColor: bgTone }}
              className={`group ${css({
                position: "relative",
                padding: "3rem",
                transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "500px",
                _hover: {
                  backgroundColor: "surface !important",
                }

              })}`}
            >



              <div>
                {/* Icon */}
                {item.iconUrl && (
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
                      width: "3rem",
                      height: "3rem",
                      backgroundColor: "surface", // Using 'canvas' as requested
                      transition: "all 0.4s",
                      marginBottom: "2rem",
                      _groupHover: {
                        backgroundColor: "tertiary",
                      }
                    })}
                  />
                )}



                {/* Title */}
                <h3 className={css({
                  fontFamily: "headline",
                  fontSize: "3xl",
                  fontWeight: "bold",
                  color: "primary",
                  textTransform: "uppercase",
                  letterSpacing: "tight",
                  marginBottom: "1.5rem",
                  transition: "all 0.4s",
                  _groupHover: {
                    color: "background",
                  }
                })}>
                  {item.title}
                </h3>

                {/* Description */}
                <p className={css({
                  color: "secondary",
                  fontSize: "md",
                  lineHeight: "relaxed",
                  fontWeight: "medium", // Increased weight for legibility
                  transition: "all 0.4s",
                  _groupHover: {
                    color: "background",
                    opacity: 0.5, // Making it lighter/higher contrast while remaining "secondary"
                  }

                })}>
                  {item.description}
                </p>
              </div>

              {/* Bullets */}
              {item.bullets && item.bullets.length > 0 && (
                <ul className={css({
                  listStyle: "none",
                  marginTop: "2rem",
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                  opacity: 0,
                  transition: "opacity 0.4s ease-out",
                  _groupHover: {
                    opacity: 1,
                  }
                })}>
                  {item.bullets.map((bullet, bIndex) => (
                    <li 
                      key={bIndex}
                      className={css({
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        color: "background", // Bullet text on hover
                        fontSize: "sm",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        letterSpacing: "wide"
                      })}
                    >
                      <span className={css({
                        width: "6px",
                        height: "6px",
                        backgroundColor: "tertiary"
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

