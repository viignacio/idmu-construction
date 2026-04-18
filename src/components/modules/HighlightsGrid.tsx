import { css } from "../../../styled-system/css";
import Link from "next/link";

interface HighlightItem {
  iconName: string;
  title: string;
  description: string;
}

interface HighlightsGridProps {
  heading: string;
  subheading?: string;
  backgroundColor?: string;
  reverseLayout?: boolean;
  highlights?: HighlightItem[];
  cta?: {
    text: string;
    link: string;
    variant: string;
  };
}

export default function HighlightsGrid({
  heading,
  subheading,
  backgroundColor = "primary",
  reverseLayout = false,
  highlights = [],
  cta,
}: HighlightsGridProps) {
  const isDarkSection = ["primary", "secondary", "tertiary", "surface"].includes(backgroundColor);

  return (
    <section className={css({
      paddingY: { base: "6rem", md: "8rem" },
      paddingX: { base: "1.5rem", md: "4rem" },
      backgroundColor: backgroundColor,
    })}>
      <div className={css({
        maxWidth: "1280px",
        marginX: "auto",
        display: "grid",
        gridTemplateColumns: { base: "1fr", lg: "repeat(2, 1fr)" },
        gap: { base: "3rem", lg: "4rem" },
        alignItems: "center",
      })}>
        {/* Highlight Cards Column */}
        <div className={css({
          order: { base: 2, lg: reverseLayout ? 2 : 1 },
        })}>
          <div className={css({
            display: "grid",
            gridTemplateColumns: { base: "1fr", sm: "repeat(2, 1fr)" },
            gap: "2rem",
          })}>
            {highlights.map((item, index) => {
              // Auto-stagger logic: 
              // If last item and total is odd (1 or 3), span full width.
              const isFullWidthDesktop = (highlights.length === 1) || (highlights.length === 3 && index === 2);

              return (
                <div 
                  key={index} 
                  className={css({
                    gridColumn: { 
                      base: "span 1", 
                      sm: isFullWidthDesktop ? "span 2" : "span 1" 
                    },
                    backgroundColor: "white/5",
                    padding: "2rem",
                    borderLeft: "4px solid",
                    borderColor: "tertiary",
                    display: "flex",
                    flexDirection: "column",
                  })}
                >
                  <span 
                    className={`material-symbols-outlined ${css({
                      display: "block",
                      color: "tertiary",
                      marginBottom: "1.5rem",
                    })}`}
                    style={{ 
                      fontSize: "40px", 
                      width: "40px",
                      height: "40px",
                      fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 40"
                    }}
                  >
                    {item.iconName}
                  </span>
                  <h4 className={css({
                    fontWeight: "bold",
                    fontSize: "lg",
                    marginBottom: "0.5rem",
                    color: isDarkSection ? "white" : "primary",
                  })}>
                    {item.title}
                  </h4>
                  <p className={css({
                    fontSize: "sm",
                    lineHeight: "relaxed",
                    color: isDarkSection ? "rgba(255, 255, 255, 0.7)" : "on-surface-variant",
                  })}>
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Narrative Column */}
        <div className={css({
          order: { base: 1, lg: reverseLayout ? 1 : 2 },
        })}>
          <h2 className={css({
            fontFamily: "headline",
            fontWeight: "bold",
            fontSize: { base: "4xl", md: "5xl" },
            letterSpacing: "tighter",
            lineHeight: "1",
            marginBottom: "2rem",
            color: isDarkSection ? "white" : "primary",
            textTransform: "uppercase",
          })}>
            {heading}
          </h2>
          {subheading && (
            <p className={css({
              fontSize: "xl",
              lineHeight: "relaxed",
              marginBottom: "2.5rem",
              color: isDarkSection ? "rgba(255, 255, 255, 0.9)" : "on-surface",
            })}>
              {subheading}
            </p>
          )}
          {cta && cta.text && (
            <Link 
              href={cta.link || "#"}
              className={css({
                display: "inline-block",
                borderBottom: "2px solid",
                borderColor: "tertiary",
                paddingBottom: "0.5rem",
                color: "tertiary",
                fontWeight: "bold",
                letterSpacing: "widest",
                textTransform: "uppercase",
                fontSize: "sm",
                transition: "all 0.2s",
                _hover: {
                  color: isDarkSection ? "white" : "primary",
                  borderColor: isDarkSection ? "white" : "primary",
                }
              })}
            >
              {cta.text}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
