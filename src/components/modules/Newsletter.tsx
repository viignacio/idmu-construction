"use client";

import { css } from "@/styled-system/css";
import { getThemeColors } from "@/lib/theme";

interface NewsletterProps {
  heading?: string;
  subheading?: string;
  placeholder?: string;
  buttonText?: string;
  backgroundColor?: string;
}

export default function Newsletter({
  heading = "STAY AHEAD OF THE BUILD",
  subheading = "Get technical whitepapers, project updates, and industrial insights delivered to your inbox every month.",
  placeholder = "Professional Email",
  buttonText = "Subscribe",
  backgroundColor = "surface",
}: NewsletterProps) {
  const theme = getThemeColors(backgroundColor);

  return (
    <section className={css({
      paddingY: { base: "4rem", md: "6rem" },
      paddingX: { base: "2rem", md: "6rem" }, // 96px padding
      width: "100%",
      backgroundColor: "background", // Root background is site background
    })}>
      <div className={css({
        maxWidth: "7xl",
        marginX: "auto",
        backgroundColor: theme.bg,
        padding: { base: "3rem", md: "6rem" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      })}>
        <h2 className={css({
          fontFamily: "headline",
          fontWeight: "black",
          fontSize: { base: "2.5rem", md: "4rem" },
          letterSpacing: "tighter",
          lineHeight: "0.9",
          marginBottom: "1.5rem",
          textTransform: "uppercase",
          color: theme.text,
        })}>
          {heading}
        </h2>
        
        <p className={css({
          fontSize: { base: "lg", md: "xl" },
          lineHeight: "relaxed",
          marginBottom: "3rem",
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
                color: "rgba(13, 27, 42, 0.4)",
              },
              border: "none",
              borderBottom: "2px solid",
              borderColor: "rgba(13, 27, 42, 0.1)",
              padding: "1.25rem",
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
              paddingX: "3rem",
              paddingY: "1.25rem",
              fontFamily: "headline",
              fontWeight: "black",
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
