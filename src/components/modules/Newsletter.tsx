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
    <SectionContainer backgroundColor={backgroundColor}>
      <div className={css({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        maxWidth: "3xl",
        marginX: "auto",
      })}>
        <h2 className={css({
          fontFamily: "headline",
          fontWeight: "bold",
          fontSize: { base: "3.5rem", md: "5rem" },
          tracking: "tighter",
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
          maxWidth: "2xl",
          gap: "0",
        })} onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder={placeholder}
            className={css({
              flex: 1,
              backgroundColor: "rgba(255, 255, 255, 0.05)", // Subtle backdrop if on dark
              _placeholder: {
                color: theme.isDark ? "rgba(255, 255, 255, 0.5)" : "rgba(13, 27, 42, 0.5)",
              },
              border: "none",
              borderBottom: "2px solid",
              borderColor: theme.isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(13, 27, 42, 0.2)",
              padding: "1.25rem",
              fontFamily: "body",
              fontSize: "lg",
              outline: "none",
              borderRadius: "0",
              color: theme.text,
              transition: "all 0.3s",
              _focus: {
                borderColor: "tertiary",
                backgroundColor: theme.isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(13, 27, 42, 0.05)",
              },
            })}
          />
          <button
            type="submit"
            className={css({
              backgroundColor: theme.isDark ? "tertiary" : "primary",
              color: theme.isDark ? "primary" : "white",
              paddingX: "3rem",
              paddingY: "1.25rem",
              fontFamily: "headline",
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "widest",
              fontSize: "xs",
              cursor: "pointer",
              borderRadius: "0",
              transition: "all 0.3s",
              _hover: {
                backgroundColor: theme.isDark ? "white" : "secondary",
                color: theme.isDark ? "primary" : "white",
              },
            })}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </SectionContainer>
  );
}
