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

  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current && itemsRef.current) {
        setIsOverflowing(itemsRef.current.scrollWidth > containerRef.current.clientWidth);
      }
    };

    const observer = new ResizeObserver(checkOverflow);
    if (containerRef.current) observer.observe(containerRef.current);
    
    checkOverflow();
    window.addEventListener('resize', checkOverflow);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', checkOverflow);
    };
  }, [filters]);

  if (filters.length <= 1) return null;

  return (
    <>
      {/* Scrollable / Row Filters */}
      <div 
        ref={containerRef}
        className={css({
          display: { base: "none", md: "flex" },
          width: "100%",
          borderBottom: "2px solid",
          borderColor: "rgba(196, 198, 204, 0.2)",
          paddingBottom: "1.25rem",
          overflowX: isOverflowing ? "auto" : "visible",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
          WebkitOverflowScrolling: "touch",
        })}
      >
        <div 
          ref={itemsRef}
          className={css({
            display: "flex",
            gap: "2.5rem",
            width: "max-content", // Ensure it doesn't wrap inside the measurement ref
            marginLeft: isOverflowing ? "0" : "auto", // Align to right if it fits
            flexWrap: "nowrap",
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
