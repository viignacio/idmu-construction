import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { css, cx } from "@/styled-system/css";
import { CtaButton } from "@/components/common/CtaButton";

interface HeroProps {
  variant?: "full" | "compact" | "text" | "image-text";
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  backgroundImage?: any;
  backgroundVideo?: string | any;
  backgroundVideoUrl?: string;
  videoPlaceholder?: any;
  backgroundType?: "image" | "video";
  primaryCTA?: { label: string; link: string };
  secondaryCTA?: { label: string; link: string };
  highlightedWord?: string;
  preamble?: string;
  alignment?: "left" | "right";
  backgroundColor?: string;
}

export default function Hero({
  variant = "full",
  eyebrow,
  heading,
  subheading,
  backgroundImage,
  backgroundVideo,
  backgroundVideoUrl,
  videoPlaceholder,
  backgroundType = "image",
  primaryCTA,
  secondaryCTA,
  highlightedWord,
  preamble,
  alignment = "left",
  backgroundColor = "surface-container-high",
}: HeroProps) {
  const isDarkTheme = variant !== "text";

  const getHighlightedHeading = () => {
    if (!heading) return null;
    if (!highlightedWord) return heading;

    // Escape special regex characters in the highlight word
    const escapedWord = highlightedWord.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const parts = heading.split(new RegExp(`(${escapedWord})`, "gi"));
    
    return parts.map((part, i) =>
      part.toLowerCase() === highlightedWord.toLowerCase() ? (
        <span key={i} className={css({ color: "secondary" })}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  if (variant === "text") {
    return (
      <header
        className={css({
          paddingX: { base: "2rem", md: "6rem" },
          paddingTop: "5rem",
          paddingBottom: "5rem",
          width: "full",
          maxWidth: "72rem",
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
                  fontSize: "10px",
                  fontWeight: "900",
                  letterSpacing: "0.2em",
                  color: "tertiary",
                  textTransform: "uppercase",
                  marginBottom: "1rem",
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
                  fontSize: { base: "4rem", md: "8rem" },
                  letterSpacing: "tighter",
                  lineHeight: "none",
                  marginBottom: "1.5rem",
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
                  fontSize: "1.25rem", // 20px
                  lineHeight: "relaxed",
                  color: "primary",
                  opacity: 0.9,
                  maxWidth: "32rem",
                })}
              >
                {subheading}
              </p>
            )}
          </div>
          <div
            className={css({
              display: "flex",
              gap: "1.5rem",
              marginBottom: { base: "0", md: "1rem" },
              alignItems: "center",
            })}
          >
            {primaryCTA?.label && (
              <CtaButton
                text={primaryCTA.label}
                link={primaryCTA.link}
                variant="primary"
                theme="light"
              />
            )}
            {secondaryCTA?.label && (
              <CtaButton
                text={secondaryCTA.label}
                link={secondaryCTA.link}
                variant="secondary"
                theme="light"
              />
            )}
          </div>
        </div>
      </header>
    );
  }

  if (variant === "image-text") {
    return (
      <section
        className={css({
          paddingX: { base: "2rem", md: "8rem" },
          paddingTop: { base: "4rem", md: "6rem" },
          paddingBottom: { base: "6rem", md: "10rem" },
          maxWidth: "1440px",
          marginX: "auto",
        })}
      >
        <div
          className={css({
            display: "flex",
            flexDirection: {
              base: "column",
              md: alignment === "left" ? "row" : "row-reverse",
            },
            alignItems: "stretch",
            gap: "0",
            position: "relative",
          })}
        >
          {/* Image Part (2/3) */}
          <div
            className={css({
              width: { base: "full", md: "70%" },
              position: "relative",
              height: { base: "400px", md: "650px" },
              overflow: "hidden",
              zIndex: 1,
            })}
          >
            {backgroundImage && (
              <Image
                src={urlFor(backgroundImage).url()}
                alt={heading || "Hero background"}
                fill
                className={css({
                  objectFit: "cover",
                })}
                priority
              />
            )}
            {eyebrow && (
              <div
                className={css({
                  position: "absolute",
                  top: "2.5rem",
                  left: "2.5rem",
                  backgroundColor: "tertiary",
                  color: "white",
                  paddingX: "1.25rem",
                  paddingY: "0.5rem",
                  fontSize: "10px",
                  fontWeight: "bold",
                  tracking: "0.2em",
                  textTransform: "uppercase",
                  fontFamily: "body",
                  zIndex: 20,
                })}
              >
                {eyebrow}
              </div>
            )}
          </div>

          {/* Text Part (1/3) */}
          <div
            className={css({
              width: { base: "full", md: "38%" },
              backgroundColor: backgroundColor || "surface-container-high",
              padding: { base: "3rem", md: "4.5rem" },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginTop: { base: "-2rem", md: "4rem" }, // Vertical shift
              marginLeft: {
                base: "0",
                md: alignment === "left" ? "-8rem" : "0",
              },
              marginRight: {
                base: "0",
                md: alignment === "right" ? "-8rem" : "0",
              },
              zIndex: 10,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
            })}
          >
            {preamble && (
              <span
                className={css({
                  color:
                    backgroundColor === "primary" ||
                    backgroundColor === "secondary" ||
                    backgroundColor === "surface"
                      ? "rgba(255,255,255,0.7)"
                      : "on-primary-container",
                  fontSize: "sm",
                  fontWeight: "bold",
                  tracking: "widest",
                  textTransform: "uppercase",
                  marginBottom: "1rem",
                  fontFamily: "body",
                })}
              >
                {preamble}
              </span>
            )}
            {heading && (
              <h1
                className={css({
                  fontSize: { base: "2.25rem", md: "3.25rem" },
                  fontFamily: "headline",
                  fontWeight: "bold",
                  lineHeight: "1",
                  marginBottom: "1.5rem",
                  tracking: "tightest",
                  color:
                    backgroundColor === "primary" ||
                    backgroundColor === "secondary" ||
                    backgroundColor === "surface"
                      ? "white"
                      : "primary",
                })}
              >
                {getHighlightedHeading()}
              </h1>
            )}
            {subheading && (
              <p
                className={css({
                  color:
                    backgroundColor === "primary" ||
                    backgroundColor === "secondary" ||
                    backgroundColor === "surface"
                      ? "rgba(255,255,255,0.9)"
                      : "on-surface-variant",
                  lineHeight: "relaxed",
                  marginBottom: "2.5rem",
                  fontFamily: "body",
                  fontSize: "1rem",
                })}
              >
                {subheading}
              </p>
            )}
            <div className={css({ width: "fit-content" })}>
              {primaryCTA?.label && (
                <CtaButton
                  text={primaryCTA.label}
                  link={primaryCTA.link}
                  variant="tertiary"
                  theme={
                    backgroundColor === "primary" ||
                    backgroundColor === "secondary" ||
                    backgroundColor === "surface"
                      ? "dark"
                      : "light"
                  }
                />
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <header
      className={css({
        position: "relative",
        height: variant === "full" ? "100vh" : "60vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        backgroundColor: "primary",
      })}
    >
      {/* Background Layer */}
      <div className={css({ position: "absolute", inset: 0, zIndex: 0 })}>
        {(backgroundType === "video" && (backgroundVideoUrl || (typeof backgroundVideo === 'string' && backgroundVideo))) ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={videoPlaceholder ? urlFor(videoPlaceholder).url() : ""}
            className={css({
              width: "full",
              height: "full",
              objectFit: "cover",
              filter: "grayscale(1) brightness(0.5)",
            })}
          >
            <source src={backgroundVideoUrl || backgroundVideo} type="video/mp4" />
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
            background: "linear-gradient(to right, rgba(13, 27, 42, 0.9), transparent)",
          })}
        />
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
              fontFamily: "body",
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
              fontSize: { base: "4xl", lg: "9xl" },
              color: "white",
              lineHeight: "0.9",
              letterSpacing: "tighter",
              marginBottom: "2rem",
              whiteSpace: "pre-line",
              textTransform: "uppercase",
            })}
          >
            {getHighlightedHeading()}
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
            gap: "2rem",
            alignItems: { base: "stretch", md: "center" },
          })}
        >
          {primaryCTA?.label && (
            <CtaButton
              text={primaryCTA.label}
              link={primaryCTA.link}
              variant="primary"
              theme="dark"
            />
          )}

          {secondaryCTA?.label && (
            <CtaButton
              text={secondaryCTA.label}
              link={secondaryCTA.link}
              variant="secondary"
              theme="dark"
            />
          )}
        </div>
      </div>
    </header>
  );
}
