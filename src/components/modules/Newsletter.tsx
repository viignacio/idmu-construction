"use client";

import { css } from "@/styled-system/css";
import SectionContainer from "../common/SectionContainer";
import { getThemeColors } from "@/lib/theme";

interface NewsletterProps {
  heading?: string;
  subheading?: string;
  placeholder?: string;
  buttonText?: string;
  backgroundColor?: string;
}

export default function Newsletter({
  heading = "Stay Ahead of the Build",
  subheading = "Get technical whitepapers, project updates, and industrial insights delivered to your inbox every month.",
  placeholder = "Professional Email",
  buttonText = "Subscribe",
  backgroundColor = "surface",
}: NewsletterProps) {
  const theme = getThemeColors(backgroundColor);

  return (
    <section className={css({
      paddingY: { base: "6rem", md: "8rem" },
      paddingX: { base: "2rem", md: "6rem" },
      maxWidth: "7xl",
      marginX: "auto",
    })}>
      <div className={css({
        backgroundColor: theme.bg,
        padding: { base: "3rem", md: "6rem" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      })}>
        <h2 className={css({
          fontFamily: "headline",
          fontWeight: "bold",
          fontSize: { base: "3rem", md: "4.5rem" },
          letterSpacing: "tighter",
          lineHeight: "0.85",
          marginBottom: "1.5rem",
          textTransform: "uppercase",
          color: theme.text,
        })}>
          {heading}
        </h2>
        
        <p className={css({
          fontSize: { base: "lg", md: "xl" },
          lineHeight: "relaxed",
          marginBottom: "3.5rem",
          opacity: 0.8,
          color: theme.subtext,
          maxWidth: "2xl",
        })}>
          {subheading}
        </p>

        <form className={css({
          display: "flex",
          flexDirection: { base: "column", md: "row" },
          width: "100%",
          maxWidth: "lg",
          gap: "0",
        })} onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder={placeholder}
            className={css({
              flex: 1,
              backgroundColor: "white",
              _placeholder: {
                color: "rgba(13, 27, 42, 0.5)",
              },
              border: "none",
              borderBottom: "2px solid",
              borderColor: "rgba(13, 27, 42, 0.2)",
              padding: "1rem",
              fontFamily: "body",
              fontSize: "sm",
              outline: "none",
              borderRadius: "0",
              color: "primary",
              transition: "all 0.3s",
              _focus: {
                borderColor: "tertiary",
              },
            })}
          />
          <button
            type="submit"
            className={css({
              backgroundColor: "primary",
              color: "white",
              paddingX: "2.5rem",
              paddingY: "1rem",
              fontFamily: "headline",
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "widest",
              fontSize: "xs",
              cursor: "pointer",
              borderRadius: "0",
              transition: "all 0.3s",
              _hover: {
                backgroundColor: "secondary",
              },
            })}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}

