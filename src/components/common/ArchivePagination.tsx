"use client";

import { css } from "@/styled-system/css";

interface ArchivePaginationProps {
  displayedCount: number;
  totalCount: number;
  onSeeMore: () => void;
  itemType?: string;
}

export default function ArchivePagination({
  displayedCount,
  totalCount,
  onSeeMore,
  itemType = "items",
}: ArchivePaginationProps) {
  if (totalCount === 0) return null;

  return (
    <div className={css({
      marginTop: "6rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "2.5rem",
    })}>
      {/* Progress Counter */}
      <div className={css({
        textAlign: "center",
        width: "100%",
        maxWidth: "300px",
      })}>
        <p className={css({
          fontSize: "xs",
          fontWeight: "900",
          fontFamily: "headline",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "on-surface-variant",
          marginBottom: "1rem",
        })}>
          Seen {displayedCount} out of {totalCount} {itemType}
        </p>
        {/* Minimalist Progress Bar */}
        <div className={css({
          width: "100%",
          height: "2px",
          backgroundColor: "rgba(0,0,0,0.05)",
          position: "relative",
        })}>
          <div 
            className={css({
              position: "absolute",
              left: 0,
              top: 0,
              height: "100%",
              backgroundColor: "tertiary",
              transition: "width 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            })} 
            style={{ width: `${(displayedCount / totalCount) * 100}%` }}
          />
        </div>
      </div>

      {/* See More Button */}
      {displayedCount < totalCount && (
        <button
          onClick={onSeeMore}
          className={css({
            backgroundColor: "primary",
            color: "white",
            padding: "1.25rem 4rem",
            fontWeight: "900",
            fontFamily: "headline",
            textTransform: "uppercase",
            letterSpacing: "widest",
            fontSize: "sm",
            border: "none",
            cursor: "pointer",
            transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            _hover: {
              backgroundColor: "tertiary",
              transform: "translateY(-2px)",
              boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
            },
            _active: {
              transform: "translateY(0)",
            }
          })}
        >
          See More
        </button>
      )}
    </div>
  );
}
