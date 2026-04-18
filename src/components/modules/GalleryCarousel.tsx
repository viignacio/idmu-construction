"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { css, cx } from "@/styled-system/css";
import { urlFor } from "@/sanity/lib/image";

interface GalleryCarouselProps {
  images: any[];
  title?: string;
}

export default function GalleryCarousel({ images, title }: GalleryCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  if (!images || images.length === 0) return null;

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth * index;
    scrollRef.current.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
    const newIndex = Math.round(scrollLeft / clientWidth);
    setCurrentIndex(newIndex);
    
    // Calculate progress
    const maxScroll = scrollWidth - clientWidth;
    const currentProgress = (scrollLeft / maxScroll) * 100;
    setProgress(currentProgress);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", handleScroll);
      return () => el.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div className={css({ 
      paddingX: { base: "2rem", md: "6rem" },
      paddingBottom: "8rem",
      maxWidth: "1400px",
      margin: "0 auto",
    })}>
      {/* Controls Header */}
      <div className={css({
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginBottom: "2rem",
      })}>
        <div>
          <span className={css({
            fontSize: "10px",
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: "widest",
            color: "tertiary",
            display: "block",
            marginBottom: "0.5rem"
          })}>Project Gallery</span>
          <h3 className={css({
            fontFamily: "headline",
            fontSize: "2xl",
            fontWeight: "bold",
            color: "primary",
            textTransform: "uppercase"
          })}>
            {currentIndex + 1} / {images.length}
          </h3>
        </div>

        <div className={css({ display: "flex", gap: "1rem" })}>
          <button 
            onClick={() => scrollToIndex(currentIndex - 1)}
            disabled={currentIndex === 0}
            className={css({
              width: "3rem",
              height: "3rem",
              border: "1px solid",
              borderColor: currentIndex === 0 ? "border" : "primary",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: currentIndex === 0 ? "not-allowed" : "pointer",
              backgroundColor: "white",
              color: currentIndex === 0 ? "secondary" : "primary",
              transition: "all 0.3s",
              _hover: currentIndex !== 0 ? {
                backgroundColor: "primary",
                color: "white"
              } : {}
            })}
          >
            <span className="material-symbols-outlined">west</span>
          </button>
          <button 
            onClick={() => scrollToIndex(currentIndex + 1)}
            disabled={currentIndex === images.length - 1}
            className={css({
              width: "3rem",
              height: "3rem",
              border: "1px solid",
              borderColor: currentIndex === images.length - 1 ? "border" : "primary",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: currentIndex === images.length - 1 ? "not-allowed" : "pointer",
              backgroundColor: "white",
              color: currentIndex === images.length - 1 ? "secondary" : "primary",
              transition: "all 0.3s",
              _hover: currentIndex !== images.length - 1 ? {
                backgroundColor: "primary",
                color: "white"
              } : {}
            })}
          >
            <span className="material-symbols-outlined">east</span>
          </button>
        </div>
      </div>

      {/* Carousel Container */}
      <div 
        ref={scrollRef}
        className={cx(
          "hide-scrollbar",
          css({
            display: "flex",
            gap: "2rem",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            scrollBehavior: "smooth",
            WebkitOverflowScrolling: "touch",
            paddingBottom: "2rem"
          })
        )}
      >
        {images.map((img, i) => (
          <div 
            key={i} 
            className={css({ 
              flex: "0 0 100%", 
              scrollSnapAlign: "start",
              position: "relative", 
              aspectRatio: "16/9", 
              width: "full", 
              overflow: "hidden",
              backgroundColor: "surface-container-high",
              // Subtle pulse for loading feedback
              animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
            })}
          >
             <Image 
              src={urlFor(img).width(1600).auto("format").quality(85).url()} 
              alt={`${title || "Project"} gallery image ${i + 1}`} 
              fill 
              priority={i === 0}              className={css({ 
                objectFit: "cover", 
                filter: "grayscale(10%)", 
                transition: "transform 0.5s", 
                _hover: { transform: "scale(1.02)" } 
              })} 
             />
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className={css({
        width: "full",
        height: "2px",
        backgroundColor: "border",
        position: "relative",
        marginTop: "2rem"
      })}>
        <div 
          className={css({
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            backgroundColor: "tertiary",
            transition: "width 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
          })}
          style={{ width: `${((currentIndex + 1) / images.length) * 100}%` }}
        />
      </div>
    </div>
  );
}
