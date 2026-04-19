"use client";
import { css, cx } from "@/styled-system/css";
import { useEffect, useRef, useState } from "react";

interface ArchiveFilterProps {
  activeFilter: string;
  filters: string[];
  onFilterChange: (filter: string) => void;
  allLabel?: string;
}

export default function ArchiveFilter({
  activeFilter,
  filters,
  onFilterChange,
  allLabel = "ALL",
}: ArchiveFilterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      // We use a small buffer for decimals/zoom levels
      setCanScrollLeft(scrollLeft > 1);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    }
  };

  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current && itemsRef.current) {
        // Use a 1px buffer for scrollWidth vs clientWidth
        const overflowing = itemsRef.current.offsetWidth > containerRef.current.clientWidth;
        setIsOverflowing(overflowing);
        checkScroll();
      }
    };

    const observer = new ResizeObserver(checkOverflow);
    if (containerRef.current) observer.observe(containerRef.current);
    if (itemsRef.current) observer.observe(itemsRef.current); // Observe content too
    
    checkOverflow();
    window.addEventListener('resize', checkOverflow);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', checkOverflow);
    };
  }, [filters]);

  const handleScroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = Math.min(containerRef.current.clientWidth * 0.8, 300);
      containerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  if (filters.length <= 1) return null;

  return (
    <>
      {/* Scrollable / Row Filters */}
      <div className={css({
        display: { base: "none", md: "flex" },
        alignItems: "center",
        gap: "0.5rem",
        width: "100%",
        maxWidth: "100%",
        position: "relative",
      })}>
        {isOverflowing && canScrollLeft && (
          <button 
            type="button"
            onClick={() => handleScroll("left")}
            className={css({
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "primary",
              transition: "all 0.3s",
              flexShrink: 0,
              width: "24px",
              height: "24px",
              _hover: { color: "tertiary", transform: "scale(1.1)" }
            })}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>chevron_left</span>
          </button>
        )}

        <div 
          ref={containerRef}
          onScroll={checkScroll}
          className={css({
            flex: 1,
            display: "flex",
            borderBottom: "2px solid",
            borderColor: "rgba(196, 198, 204, 0.2)",
            paddingBottom: "1.25rem",
            overflowX: "auto", // Always auto to allow detection and manual scroll
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
            WebkitOverflowScrolling: "touch",
            minWidth: 0,
          })}
        >
          <div 
            ref={itemsRef}
            className={css({
              display: "flex",
              gap: "2.5rem",
              width: "max-content",
              marginLeft: isOverflowing ? "0" : "auto",
              flexWrap: "nowrap",
              paddingX: isOverflowing ? "0.5rem" : "0", // Add little padding if scrolling
            })}
          >
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => onFilterChange(filter)}
                className={css({
                  fontSize: "xs",
                  fontWeight: "900",
                  fontFamily: "headline",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  paddingBottom: "0.25rem",
                  transition: "all 0.3s",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  color: activeFilter === filter ? "primary" : "on-surface-variant",
                  borderBottom: activeFilter === filter ? "2px solid {colors.tertiary}" : "none",
                  _hover: {
                    color: "primary",
                  }
                })}
              >
                {filter === "All" ? allLabel : filter}
              </button>
            ))}
          </div>
        </div>

        {isOverflowing && canScrollRight && (
          <button 
            type="button"
            onClick={() => handleScroll("right")}
            className={css({
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "primary",
              transition: "all 0.3s",
              flexShrink: 0,
              width: "24px",
              height: "24px",
              _hover: { color: "tertiary", transform: "scale(1.1)" }
            })}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>chevron_right</span>
          </button>
        )}
      </div>

      {/* Mobile Dropdown */}
      <div className={css({
        display: { base: "block", md: "none" },
        width: "100%",
        position: "relative"
      })}>
        <div className={css({
          position: "relative",
          backgroundColor: "surfaceContainerLow",
          border: "1px solid",
          borderColor: "outlineVariant",
          paddingX: "1.5rem",
          paddingY: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        })}>
          <select
            value={activeFilter}
            onChange={(e) => onFilterChange(e.target.value)}
            className={css({
              appearance: "none",
              background: "transparent",
              border: "none",
              outline: "none",
              width: "100%",
              fontFamily: "headline",
              fontSize: "sm",
              fontWeight: "bold",
              letterSpacing: "widest",
              textTransform: "uppercase",
              color: "primary",
              cursor: "pointer"
            })}
          >
            {filters.map((filter) => (
              <option key={filter} value={filter}>
                {filter === "All" ? `${allLabel}` : filter.toUpperCase()}
              </option>
            ))}
          </select>
          <span className="material-symbols-outlined" style={{ pointerEvents: 'none' }}>expand_more</span>
        </div>
      </div>
    </>
  );
}
