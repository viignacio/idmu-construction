import { css, cx } from "@/styled-system/css";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  project: {
    title: string;
    sector?: string;
    year?: string;
    mainImage?: any;
    slug?: string;
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
  priority = false,
}: ProjectCardProps & { priority?: boolean }) {
  if (!project) return null;

  const { title, sector, year, mainImage, slug } = project;
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
      {mainImage && (
        <div className={cx(imageWrapperClass, css({
          backgroundColor: "surface-container-high",
          animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
        }))}>
          <Image
            src={urlFor(mainImage).width(1000).auto("format").quality(85).url()}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 33vw"
            priority={priority}
            draggable={false}
            className={css({ 
              objectFit: "cover", 
              filter: "grayscale(20%)",
              userSelect: "none"
            })}
          />
        </div>
      )}

      {hoverEffect === "showText" ? (
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
            textAlign: "center",
            marginBottom: "0"
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
            marginBottom: "0",
          })}>
            {title}
          </h4>
        </div>
      )}
    </Link>
  );
}
