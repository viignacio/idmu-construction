import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { css } from "../../../styled-system/css";

interface HeroProps {
  variant?: "full" | "compact" | "text" | "image-text";
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  backgroundImage?: any;
  backgroundVideo?: string;
  videoPlaceholder?: any;
  backgroundType?: "image" | "video";
  primaryCTA?: { label: string; link: string };
  secondaryCTA?: { label: string; link: string };
  highlightedWord?: string;
}

export default function Hero({
  variant = "full",
  eyebrow,
  heading,
  subheading,
  backgroundImage,
  backgroundVideo,
  videoPlaceholder,
  backgroundType = "image",
  primaryCTA,
  secondaryCTA,
  highlightedWord,
}: HeroProps) {
  if (variant === "text") {
    const getHighlightedHeading = () => {
      if (!heading) return null;
      if (!highlightedWord) return heading;

      const parts = heading.split(new RegExp(`(${highlightedWord})`, "gi"));
      return parts.map((part, i) =>
        part.toLowerCase() === highlightedWord.toLowerCase() ? (
          <span key={i} className={css({ color: "on-primary-container" })}>
            {part}
          </span>
        ) : (
          part
        )
      );
    };

    return (
      <header
        className={css({
          paddingX: { base: "2rem", md: "6rem" }, // Synchronized with full variant
          marginBottom: "5rem",
          width: "full",
          maxWidth: "72rem", // Synchronized with full variant
          paddingTop: "8rem", // pt-32 equivalent
        })}
      >
        <div
          className={css({
            display: "flex",
            flexDirection: { base: "column", md: "row" },
            alignItems: { base: "flex-start", md: "flex-end" },
            justifyContent: "space-between",
            gap: "2rem",
          })}
        >
          <div className={css({ maxWidth: "42rem" })}>
            {eyebrow && (
              <span
                className={css({
                  display: "block",
                  fontFamily: "body",
                  fontSize: "xs",
                  fontWeight: "900",
                  letterSpacing: "0.2em",
                  color: "tertiary",
                  textTransform: "uppercase",
                  marginBottom: "1rem", // mb-4 equivalent
                })}
              >
                {eyebrow}
              </span>
            )}
            {heading && (
              <h1
                className={css({
                  fontFamily: "headline",
                  fontWeight: "bold",
                  fontSize: { base: "4rem", md: "8xl" }, // base text-6xl (approx 4rem)
                  letterSpacing: "tighter",
                  lineHeight: "none",
                  marginBottom: "1.5rem", // mb-6 equivalent
                  color: "primary",
                })}
              >
                {getHighlightedHeading()}
              </h1>
            )}
            {subheading && (
              <p
                className={css({
                  fontFamily: "body",
                  fontSize: "lg",
                  lineHeight: "relaxed",
                  color: "on-surface-variant",
                  maxWidth: "32rem", // max-w-lg equivalent
                })}
              >
                {subheading}
              </p>
            )}
          </div>
        </div>
      </header>
    );
  }

  if (variant !== "full") return null;

  return (
    <section
      className={css({
        position: "relative",
        height: "100vh", // Full viewport height
        width: "full", // Fixed from 100vw to prevent horizontal overflow
        marginTop: "-5rem", // Pull up behind the header to fill main's padding gap
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        overflow: "hidden",
      })}
    >
      {/* Background Media */}
      <div className={css({ position: "absolute", inset: 0, zIndex: 0 })}>
        {backgroundType === "video" && backgroundVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={videoPlaceholder ? urlFor(videoPlaceholder).url() : undefined}
            className={css({
              width: "full",
              height: "full",
              objectFit: "cover",
              filter: "grayscale(1) brightness(0.5)",
            })}
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        ) : (

          backgroundImage && (
            <Image
              src={urlFor(backgroundImage).url()}
              alt={heading || "Hero background"}
              fill
              className={css({
                objectFit: "cover",
                filter: "grayscale(1) brightness(0.5)",
              })}
              priority
            />
          )
        )}
        <div
          className={css({
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(13, 27, 42, 0.9), transparent)",
          })}
        ></div>
      </div>


      {/* Content */}
      <div
        className={css({
          position: "relative",
          zIndex: 10,
          paddingX: { base: "2rem", md: "6rem" },
          maxWidth: "72rem",
        })}
      >

        {eyebrow && (
          <span
            className={css({
              display: "inline-block",
              backgroundColor: "tertiary",
              color: "primary",
              fontFamily: "body", // Match DESIGN.md (Inter for labels)
              fontWeight: "800",
              fontSize: "10px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              paddingX: "0.75rem",
              paddingY: "0.25rem",
              marginBottom: "1.5rem",
            })}
          >
            {eyebrow}
          </span>
        )}

        {heading && (
          <h1
            className={css({
              fontFamily: "headline",
              fontWeight: "bold",
              fontSize: { base: "4xl", lg: "9xl" }, // Upgraded to 9xl scale
              color: "white",
              lineHeight: "0.9", // Tighter line height for large scales
              letterSpacing: "tighter",
              marginBottom: "2rem",
              whiteSpace: "pre-line",
              textTransform: "uppercase", // Forced industrial uppercase
            })}
          >
            {heading}
          </h1>
        )}

        {subheading && (
          <p
            className={css({
              color: "white",
              fontSize: { base: "lg", md: "xl" },
              fontWeight: "light",
              maxWidth: "32rem",
              marginBottom: "3rem",
              lineHeight: "relaxed",
              opacity: 0.9,
            })}
          >
            {subheading}
          </p>
        )}

        <div
          className={css({
            display: "flex",
            flexDirection: { base: "column", md: "row" },
            gap: "1rem",
            alignItems: { base: "stretch", md: "center" },
          })}
        >
          {primaryCTA?.label && (
            <Link
              href={primaryCTA.link || "#"}
              className={css({
                backgroundColor: "white",
                color: "primary",
                paddingX: "2.5rem",
                paddingY: "1.25rem",
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: "widest",
                textDecoration: "none",
                textAlign: "center",
                transition: "all 0.2s",
                fontSize: "sm",
                _hover: { backgroundColor: "tertiary" },
              })}
            >
              {primaryCTA.label}
            </Link>
          )}

          {secondaryCTA?.label && (
            <Link
              href={secondaryCTA.link || "#"}
              className={css({
                borderBottom: "2px solid {colors.tertiary}",
                color: "white",
                paddingX: "2.5rem",
                paddingY: "1.25rem",
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: "widest",
                textDecoration: "none",
                textAlign: "center",
                transition: "all 0.2s",
                fontSize: "sm",
                _hover: { color: "tertiary" },
              })}
            >
              {secondaryCTA.label}
            </Link>
          )}
        </div>

      </div>
    </section>
  );
}

