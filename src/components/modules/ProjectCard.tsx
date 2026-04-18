import { css, cx } from "../../../styled-system/css";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  project: {
    title: string;
    sector?: string;
    year?: string;
    imageUrl?: string;
    slug?: string;
    location?: string;
    status?: "COMPLETE" | "ONGOING";
    completionPercentage?: number;
    ctaLabel?: string;
  };
  size?: "landscape" | "portrait" | "square";
  variant?: "standard" | "architectural";
  hoverEffect?: "cardPeek" | "showText" | "zoomOut" | "zoomIn" | "industrial";
  cardColor?: "navy" | "yellow" | "white" | "transparent";
  position?: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
  isOffset?: boolean;
}

export default function ProjectCard({
  project,
  size = "portrait",
  variant = "standard",
  hoverEffect = "zoomOut",
  cardColor = "navy",
  position = "bottomLeft",
  isOffset = false,
}: ProjectCardProps) {
  if (!project) return null;

  const { title, sector, year, imageUrl, slug, location, status, completionPercentage, ctaLabel } = project;
  const hasMetadata = sector && year;

  // Determine styling mode
  // Standard: Metadata + Title, smaller font, colored based on cardColor logic
  // Impact: No metadata, larger bold title, yellow by default unless overridden
  const isImpactLayout = !hasMetadata;

  // Panda CSS classes for the container
  const containerClass = css({
    position: "relative",
    overflow: "hidden",
    // Use clamp() to ensure that cards in the same row have the exact same height,
    // scaling with the viewport while staying within reasonable bounds.
    height: { 
      base: size === "landscape" ? "300px" : "400px", 
      md: "clamp(500px, 38vw, 700px)" 
    },
    gridColumn: { base: "span 12", md: size === "landscape" ? "span 8" : "span 4" },
    backgroundColor: "surface",
    cursor: "pointer",
    display: "block",
    textDecoration: "none",
  });

  // ... (rest of the classes remain the same)
  // Image wrapper for zoom effects
  const imageWrapperClass = css({
    width: "100%",
    height: "100%",
    transition: "transform 1s cubic-bezier(0.16, 1, 0.3, 1)", // Smoother zoom
    transform: hoverEffect === "zoomIn" ? "scale(1)" : "scale(1.08)",
    _groupHover: {
      transform:
        hoverEffect === "zoomIn"
          ? "scale(1.15)"
          : hoverEffect === "zoomOut" || hoverEffect === "cardPeek" || hoverEffect === "showText"
          ? "scale(1)"
          : "scale(1.08)",
    },
  });

  // Immersive Overlay (for showText)
  const immersiveOverlayClass = css({
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
    opacity: 0,
    backgroundColor:
      cardColor === "yellow"
        ? "rgba(224, 159, 62, 0)"
        : cardColor === "white"
        ? "rgba(249, 249, 255, 0)"
        : "rgba(13, 27, 42, 0)",
    _groupHover: {
      opacity: 1,
      backgroundColor:
        cardColor === "yellow"
          ? "rgba(224, 159, 62, 0.85)"
          : cardColor === "white"
          ? "rgba(249, 249, 255, 0.85)"
          : "rgba(13, 27, 42, 0.85)",
    },
  });

  // Standard Card Box
  const cardBoxClass = css({
    position: "absolute",
    padding: isImpactLayout ? "2rem" : "3rem", // Impact mode uses p-8, Standard uses p-12
    width: "fit-content",
    minWidth: "280px",
    maxWidth: "calc(100% - 6rem)",
    transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
    backgroundColor: cardColor === "yellow" ? "tertiary" : cardColor === "white" ? "background" : "primary",
    color: cardColor === "yellow" ? "primary" : cardColor === "white" ? "primary" : "white",
    boxShadow: "0 24px 48px rgba(0,0,0,0.15)",

    // Positioning logic (relative to corners)
    top: position.toLowerCase().includes("top") ? (isOffset ? "3rem" : "0") : "auto",
    bottom: position.toLowerCase().includes("bottom") ? (isOffset ? "3rem" : "0") : "auto",
    left: position.toLowerCase().includes("left") ? (isOffset ? "3rem" : "0") : "auto",
    right: position.toLowerCase().includes("right") ? (isOffset ? "3rem" : "0") : "auto",

    // Animation: Card Peek (vibration/slide effect)
    transform: hoverEffect === "cardPeek" ? "translateY(1.5rem)" : "none",
    opacity: 1,

    _groupHover: {
      transform: "translateY(0)",
    },
  });

  return (
    <Link href={slug ? `/projects/${slug}` : "#"} className={cx("group", containerClass)}>
      {imageUrl && (
        <div className={imageWrapperClass}>
          <Image
            src={imageUrl}
            alt={title}
            fill
            draggable={false}
            className={css({ 
              objectFit: "cover", 
              filter: "grayscale(20%)",
              userSelect: "none"
            })}
          />
        </div>
      )}

      {variant === "architectural" ? (
        <div className={css({
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "2rem",
          zIndex: 20,
        })}>
          {/* Gradient Overlay */}
          <div className={css({
            position: "absolute",
            inset: 0,
            backgroundImage: "linear-gradient(to top, rgba(13, 27, 42, 0.9), rgba(13, 27, 42, 0.2), transparent)",
            zIndex: -1,
            opacity: 0.6,
            transition: "opacity 0.5s ease",
            _groupHover: { opacity: 0.8 }
          })} />
          {/* Top Badge */}
          <div className={css({
            alignSelf: "start",
          })}>
            <span className={css({
              backgroundColor: sector === "Industrial" || sector === "Infrastructure" ? "tertiary" : "surface.highest",
              color: sector === "Industrial" || sector === "Infrastructure" ? "primary" : "onSurfaceVariant",
              px: "3",
              py: "1",
              fontSize: "10px",
              fontWeight: "black", // font-black tracking-widest
              letterSpacing: "0.2em",
              textTransform: "uppercase"
            })}>
              {sector}
            </span>
          </div>

          {/* Bottom Info Area */}
          <div className={css({
            width: "100%",
          })}>
            <div className={css({
              display: "flex",
              justifyContent: "space-between",
              alignItems: "end",
              marginBottom: status === "ONGOING" ? "1.5rem" : "1rem",
            })}>
              <div>
                <h3 className={css({
                  fontFamily: "headline",
                  fontSize: { base: "2xl", md: "3xl" },
                  fontWeight: "bold",
                  color: "white",
                  lineHeight: "none",
                  marginBottom: "0.5rem"
                })}>
                  {title}
                </h3>
                {location && (
                  <p className={css({
                    color: "white/70",
                    fontSize: "sm",
                    display: "flex",
                    alignItems: "center",
                    gap: "2",
                    fontFamily: "label"
                  })}>
                    <span className="material-symbols-outlined" style={{ fontSize: '12px' }}>location_on</span> {location}
                  </p>
                )}
              </div>
              
              {status && (
                <div className={css({ textAlign: "right" })}>
                  <span className={css({
                    color: "tertiary",
                    fontSize: "10px",
                    fontWeight: "black",
                    letterSpacing: "0.2em",
                    display: "block",
                    marginBottom: "0.25rem"
                  })}>STATUS</span>
                  <span className={css({
                    color: "white",
                    fontSize: "10px",
                    fontWeight: "medium"
                  })}>{status}</span>
                </div>
              )}
            </div>

            {status === "ONGOING" && (
              <div className={css({
                width: "100%",
                height: "1px",
                backgroundColor: "white/10",
                marginBottom: "1.5rem"
              })}>
                <div className={css({
                  height: "100%",
                  backgroundColor: "tertiary",
                  width: `${completionPercentage || 0}%`
                })} />
              </div>
            )}

            {ctaLabel ? (
              <button className={css({
                width: "100%",
                backgroundColor: "white",
                color: "primary",
                paddingY: "1rem",
                fontFamily: "headline",
                fontWeight: "bold",
                fontSize: "sm",
                letterSpacing: "0.1em",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "2",
                transition: "all 0.3s",
                _groupHover: {
                  backgroundColor: "tertiary",
                }
              })}>
                {ctaLabel}
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            ) : (
              <button className={css({
                color: "white",
                fontFamily: "headline",
                fontWeight: "bold",
                fontSize: "xs",
                letterSpacing: "0.1em",
                borderBottom: "2px solid",
                borderColor: "tertiary",
                paddingBottom: "1",
                width: "fit-content"
              })}>
                VIEW DETAILS
              </button>
            )}
          </div>
        </div>
      ) : hoverEffect === "showText" ? (
        <div className={immersiveOverlayClass}>
          {hasMetadata && (
            <span className={css({
              color: cardColor === "yellow" ? "primary" : "tertiary",
              fontWeight: "bold",
              fontSize: "10px",
              textTransform: "uppercase",
              letterSpacing: "0.4em", // tracking-widest
              marginBottom: "0.5rem",
              display: "block",
            })}>
              {sector} / {year}
            </span>
          )}
          <h4 className={css({
            fontFamily: "headline",
            fontWeight: "black",
            fontSize: "3xl",
            color: cardColor === "white" ? "primary" : "white",
            textTransform: "uppercase",
            textAlign: "center"
          })}>
            {title}
          </h4>
        </div>
      ) : (
        <div className={cardBoxClass}>
          {hasMetadata && (
            <span className={css({
              color: cardColor === "yellow" ? "primary" : cardColor === "white" ? "primary" : "tertiary",
              fontWeight: "bold",
              fontSize: "10px",
              textTransform: "uppercase",
              letterSpacing: "0.4em", // tracking-widest
              marginBottom: "0.5rem",
              display: "block",
            })}>
              {sector} / {year}
            </span>
          )}
          <h4 className={css({
            fontFamily: "headline",
            fontWeight: isImpactLayout ? "black" : "bold",
            fontSize: isImpactLayout ? "3xl" : "2xl",
            textTransform: "uppercase",
            lineHeight: "none",
            letterSpacing: isImpactLayout ? "tighter" : "normal", // tracking-tighter for Forge Industrial style
            color: cardColor === "yellow" ? "primary" : cardColor === "white" ? "primary" : "white",
          })}>
            {title}
          </h4>
        </div>
      )}
    </Link>
  );
}
