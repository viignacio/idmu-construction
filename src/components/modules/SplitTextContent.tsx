import { css } from "../../../styled-system/css";
import PortableTextContent from "../PortableTextContent";

interface InfoBlock {
  title: string;
  content: string;
}

interface SplitTextContentProps {
  heading: string;
  intro?: any;
  infoBlocks?: InfoBlock[];
  backgroundColor?: string;
}

export default function SplitTextContent({
  heading,
  intro,
  infoBlocks,
  backgroundColor = "surface",
}: SplitTextContentProps) {
  const isDarkSection = backgroundColor === "primary" || backgroundColor === "surface" || backgroundColor === "tertiary" || backgroundColor === "secondary";

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
        gridTemplateColumns: { base: "1fr", md: "repeat(12, 1fr)" },
        gap: { base: "3rem", md: "4rem" },
      })}>
        {/* Left Column: Heading & Accent */}
        <div className={css({ md: { gridColumn: "span 5" } })}>
          <h2 className={css({
            fontFamily: "headline",
            fontWeight: "bold",
            fontSize: { base: "4xl", md: "5xl" },
            letterSpacing: "tighter",
            lineHeight: "tight",
            color: isDarkSection ? "white" : "primary",
            textTransform: "uppercase",
          })}>
            {heading}
          </h2>
          <div className={css({
            marginTop: "2rem",
            height: "4px",
            width: "6rem", // 24 accent width roughly
            backgroundColor: "tertiary",
          })} />
        </div>

        {/* Right Column: Narrative Content */}
        <div className={css({
          md: { gridColumn: "span 7" },
          display: "flex",
          flexDirection: "column",
          gap: "3rem",
        })}>
          {intro && (
            <div className={css({
              fontSize: { base: "xl", md: "2xl" },
              fontWeight: "light",
              lineHeight: "relaxed",
              color: isDarkSection ? "rgba(255, 255, 255, 0.9)" : "on-surface",
              "& p": { marginBottom: "1.5rem" }
            })}>
              <PortableTextContent value={intro} />
            </div>
          )}

          {infoBlocks && infoBlocks.length > 0 && (
            <div className={css({
              display: "grid",
              gridTemplateColumns: { base: "1fr", md: "repeat(2, 1fr)" },
              gap: "2.5rem",
              paddingTop: "3rem",
              borderTop: "1px solid",
              borderColor: isDarkSection ? "rgba(255, 255, 255, 0.1)" : "outline-variant/10",
            })}>
              {infoBlocks.map((item, index) => (
                <div key={index}>
                  <h3 className={css({
                    fontWeight: "bold",
                    fontSize: "lg",
                    marginBottom: "0.5rem",
                    color: isDarkSection ? "white" : "primary",
                  })}>
                    {item.title}
                  </h3>
                  <p className={css({
                    color: isDarkSection ? "rgba(255, 255, 255, 0.7)" : "on-surface-variant",
                    lineHeight: "relaxed",
                    fontSize: "sm",
                  })}>
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
