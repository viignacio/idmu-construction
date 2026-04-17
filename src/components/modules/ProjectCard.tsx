import { css, cx } from "../../../styled-system/css";
import Image from "next/image";

interface ProjectCardProps {
  project: {
    title: string;
    sector?: string;
    year?: string;
    imageUrl?: string;
  };
  size?: "landscape" | "portrait";
  hoverEffect?: "cardPeek" | "showText" | "zoomOut" | "zoomIn";
  cardColor?: "navy" | "yellow" | "white";
  position?: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
  isOffset?: boolean;
}

export default function ProjectCard({
  project,
  size = "portrait",
  hoverEffect = "zoomOut",
  cardColor = "navy",
  position = "bottomLeft",
  isOffset = false,
}: ProjectCardProps) {
  if (!project) return null;

  const { title, sector, year, imageUrl } = project;
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
  });

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
    padding: "3rem",
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
    // It remains visible (opacity: 1) and just shifts slightly
    transform: hoverEffect === "cardPeek" ? "translateY(1.5rem)" : "none",
    opacity: 1, // Explicitly always visible as requested

    _groupHover: {
      transform: "translateY(0)",
    },
  });

  return (
    <div className={cx("group", containerClass)}>
      {imageUrl && (
        <div className={imageWrapperClass}>
          <Image
            src={imageUrl}
            alt={title}
            fill
            className={css({ objectFit: "cover", filter: "grayscale(20%)" })}
          />
        </div>
      )}

      {hoverEffect === "showText" ? (
        <div className={immersiveOverlayClass}>
          {hasMetadata && (
            <span className={css({
              color: "tertiary",
              fontWeight: "bold",
              fontSize: "10px",
              textTransform: "uppercase",
              letterSpacing: "0.4em",
              marginBottom: "0.5rem"
            })}>
              {sector} / {year}
            </span>
          )}
          <h4 className={css({
            fontFamily: "headline",
            fontWeight: "black",
            fontSize: "3xl",
            color: "white",
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
              color: cardColor === "yellow" ? "primary" : "tertiary",
              fontWeight: "bold",
              fontSize: "10px",
              textTransform: "uppercase",
              letterSpacing: "0.3em",
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
            letterSpacing: isImpactLayout ? "tighter" : "normal",
            color: cardColor === "yellow" ? "primary" : cardColor === "white" ? "primary" : "white",
          })}>
            {title}
          </h4>
        </div>
      )}
    </div>
  );
}
