"use client";

import { css } from "@/styled-system/css";

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
  if (filters.length <= 1) return null;

  return (
    <>
      {/* Desktop Filters */}
      <div className={css({
        display: { base: "none", md: "flex" },
        flexWrap: "wrap",
        gap: "2.5rem",
        justifyContent: "flex-end",
        borderBottom: "2px solid",
        borderColor: "rgba(196, 198, 204, 0.2)",
        paddingBottom: "1.25rem",
        width: "auto",
        marginLeft: "auto"
      })}>
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
