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
        paddingY: { base: "4rem", md: "8rem" }, 
        backgroundColor: "background" 
      })}
    >
      {/* Intro Header */}
      <div className={css({ paddingX: { base: "2rem", md: "6rem" }, marginBottom: "5rem" })}>
        {preamble && (
          <span className={css({
            display: "inline-block",
            fontFamily: "body",
            fontWeight: "800",
            fontSize: "10px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "secondary",
            marginBottom: "1.5rem",
          })}>
            {preamble}
          </span>
        )}

        {heading && (
          <h2 className={css({
            fontFamily: "headline",
            fontWeight: "bold",
            fontSize: { base: "4xl", md: "6xl" },
            color: "primary",
            lineHeight: "none",
            letterSpacing: "tighter",
            marginBottom: "2rem",
            textTransform: "uppercase",
          })}>
            {heading}
          </h2>
        )}

        {subheading && (
          <p className={css({
            color: "secondary",
            fontSize: { base: "lg", md: "xl" },
            fontWeight: "light",
            maxWidth: "36rem",
            lineHeight: "relaxed",
          })}>
            {subheading}
          </p>
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
        gridAutoRows: "1fr",
        width: "full",
        borderTop: "1px solid {colors.secondary/10}",
      })}>
        {gridItems.map((item, index) => {
          // Calculate step-down opacity for backgrounds: 5%, 10%, 15%, 20%
          const opacity = (index + 1) * 0.05;
          const bgTone = `rgba(65, 90, 119, ${opacity})`;

          return (
            <div
              key={index}
              className={css({
                position: "relative",
                padding: { base: "2.5rem", md: "4rem" },
                backgroundColor: bgTone,
                transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                overflow: "hidden",
                cursor: "default",
                group: true,
                _hover: {
                  backgroundColor: "surface", // #1B263B
                }
              })}
            >
              {/* Icon */}
              {item.iconUrl && (
                <div 
                  className={css({
                    width: "3rem",
                    height: "3rem",
                    backgroundColor: "secondary",
                    transition: "all 0.4s",
                    mask: `url(${item.iconUrl}) no-repeat center`,
                    maskSize: "contain",
                    _groupHover: {
                      backgroundColor: "tertiary",
                      transform: "translateY(-4px)"
                    }
                  })}
                />
              )}

              {/* Title */}
              <h3 className={css({
                fontFamily: "headline",
                fontSize: "2xl",
                fontWeight: "bold",
                color: "primary",
                textTransform: "uppercase",
                letterSpacing: "tight",
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
                transition: "all 0.4s",
                _groupHover: {
                  color: "background",
                  opacity: 0.8
                }
              })}>
                {item.description}
              </p>

              {/* Bullets - Only on Hover */}
              {item.bullets && item.bullets.length > 0 && (
                <ul className={css({
                  listStyle: "none",
                  marginTop: "1rem",
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                  opacity: 0,
                  transform: "translateY(20px)",
                  transition: "all 0.4s ease-out",
                  _groupHover: {
                    opacity: 1,
                    transform: "translateY(0)"
                  }
                })}>
                  {item.bullets.map((bullet, bIndex) => (
                    <li 
                      key={bIndex}
                      className={css({
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        color: "tertiary",
                        fontSize: "sm",
                        fontWeight: "bold",
                        letterSpacing: "wide",
                        textTransform: "uppercase",
                      })}
                    >
                      <span className={css({
                        width: "8px",
                        height: "2px",
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
