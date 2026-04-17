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
    height: { base: "400px", md: size === "landscape" ? "600px" : "500px" },
    gridColumn: { base: "span 12", md: size === "landscape" ? "span 8" : "span 4" },
    backgroundColor: "surface",
    cursor: "pointer",
  });

  // Image wrapper for zoom effects
  const imageWrapperClass = css({
    width: "100%",
    height: "100%",
    transition: "transform 0.7s ease-out",
    transform: hoverEffect === "zoomIn" ? "scale(1)" : "scale(1.05)",
    _groupHover: {
      transform:
        hoverEffect === "zoomIn"
          ? "scale(1.1)"
          : hoverEffect === "zoomOut" || hoverEffect === "cardPeek" || hoverEffect === "showText"
          ? "scale(1)"
          : "scale(1.05)",
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
    transition: "all 0.5s ease",
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
          ? "rgba(224, 159, 62, 0.8)"
          : cardColor === "white"
          ? "rgba(249, 249, 255, 0.8)"
          : "rgba(13, 27, 42, 0.8)",
    },
  });

  // Standard Card Box
  const cardBoxClass = css({
    position: "absolute",
    padding: "3rem",
    width: "fit-content",
    minWidth: "280px",
    maxWidth: "calc(100% - 6rem)",
    transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
    backgroundColor: cardColor === "yellow" ? "tertiary" : cardColor === "white" ? "background" : "primary",
    color: cardColor === "yellow" ? "primary" : cardColor === "white" ? "primary" : "white",
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",

    // Positioning logic (relative to corners)
    top: position.includes("top") ? (isOffset ? "3rem" : "0") : "auto",
    bottom: position.includes("bottom") ? (isOffset ? "3rem" : "0") : "auto",
    left: position.includes("left") ? (isOffset ? "3rem" : "0") : "auto",
    right: position.includes("right") ? (isOffset ? "3rem" : "0") : "auto",

    // Animation: Card Peek (slides from outside or slightly offset)
    transform: hoverEffect === "cardPeek" ? "translateY(1.5rem)" : "none",
    opacity: hoverEffect === "cardPeek" ? 0 : 1,

    _groupHover: {
      transform: "translateY(0)",
      opacity: 1,
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
