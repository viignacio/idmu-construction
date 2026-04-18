"use client";

import { useState, useMemo, useEffect } from "react";
import { css } from "@/styled-system/css";
import ArchiveProjectCard from "./ArchiveProjectCard";

interface ProjectGridProps {
  heading?: string;
  subheading?: string;
  showFilters?: boolean;
  limit?: number;
  projects?: any[];
}

const SECTORS = [
  "All",
  "Residential",
  "Commercial",
  "Industrial",
];

export default function ProjectGrid({
  heading,
  subheading,
  showFilters = true,
  limit,
  projects = [],
}: ProjectGridProps) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);
  const [shouldScroll, setShouldScroll] = useState(false);

  // Dynamically determine which sectors have projects
  const activeSectors = useMemo(() => {
    const sectorsWithContent = new Set(projects.map(p => p.sector).filter(Boolean));
    return ["All", ...Array.from(sectorsWithContent).sort()];
  }, [projects]);

  // Handle filter changes and reset visibility
  const handleFilterChange = (sector: string) => {
    setActiveFilter(sector);
    setVisibleCount(6);
    setShouldScroll(false);
  };

  const allFilteredProjects = useMemo(() => {
    return activeFilter === "All" 
      ? projects 
      : projects.filter(p => p.sector === activeFilter);
  }, [activeFilter, projects]);

  const displayedProjects = allFilteredProjects.slice(0, visibleCount);
  const totalInFilter = allFilteredProjects.length;

  // Smooth scroll logic
  useEffect(() => {
    if (shouldScroll && visibleCount > 6) {
      // Find the card that was just appended (the one at index visibleCount - 6)
      const targetId = `project-${visibleCount - 6}`;
      const element = document.getElementById(targetId);
      if (element) {
        // Delay slightly to ensure DOM has rendered new items
        setTimeout(() => {
          const offset = 100; // Leave some space at the top
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }, 50);
      }
      setShouldScroll(false);
    }
  }, [visibleCount, shouldScroll]);

  const handleSeeMore = () => {
    setShouldScroll(true);
    setVisibleCount(prev => prev + 6);
  };

  return (
    <section className={css({
      paddingY: { base: "6rem", md: "8rem" },
      width: "100%",
      marginX: "auto",
      paddingX: { base: "2rem", md: "6rem" },
      backgroundColor: "background",
    })}>
      {/* Header & Filters */}
      <div className={css({
        display: "flex",
        flexDirection: { base: "column", md: "row" },
        justifyContent: "space-between",
        alignItems: { base: "start", md: "end" },
        gap: "4rem",
        marginBottom: "6rem",
      })}>
        <div>
          {heading && (
            <h2 className={css({
              fontFamily: "headline",
              fontWeight: "bold",
              fontSize: { base: "5xl", md: "8xl" },
              color: "primary",
              letterSpacing: "tighter",
              lineHeight: "0.85",
              marginBottom: "1.5rem",
              textTransform: "uppercase"
            })}>
              {heading}
            </h2>
          )}
          {subheading && (
            <p className={css({
              color: "onSurfaceVariant",
              maxWidth: "2xl",
              fontSize: "lg",
              lineHeight: "relaxed",
            })}>
              {subheading}
            </p>
          )}
        </div>

        {showFilters && activeSectors.length > 1 && (
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
              {activeSectors.map((sector) => (
                <button
                  key={sector}
                  onClick={() => handleFilterChange(sector)}
                  className={css({
                    fontSize: "xs",
                    fontWeight: "900",
                    fontFamily: "headline",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    paddingBottom: "0.25rem",
                    transition: "all 0.3s",
                    cursor: "pointer",
                    color: activeFilter === sector ? "primary" : "onSurfaceVariant",
                    borderBottom: activeFilter === sector ? "2px solid" : "none",
                    borderColor: "tertiary",
                    _hover: {
                      color: "primary",
                    }
                  })}
                >
                  {sector === "All" ? "ALL WORKS" : sector}
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
                  onChange={(e) => handleFilterChange(e.target.value)}
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
                  {activeSectors.map((sector) => (
                    <option key={sector} value={sector}>
                      {sector === "All" ? "FILTER BY SECTOR: ALL" : sector.toUpperCase()}
                    </option>
                  ))}
                </select>
                <span className="material-symbols-outlined" style={{ pointerEvents: 'none' }}>expand_more</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Grid */}
      <div className={css({
        display: "grid",
        gridTemplateColumns: {
          base: "1fr",
          md: "repeat(2, 1fr)"
        },
        gap: { base: "1.5rem", md: "3rem" }, // Larger gap for architectural scale
        width: "100%",
      })}>
        {displayedProjects.map((project, index) => (
          <div key={project._id || index} id={`project-${index}`}>
            <ArchiveProjectCard
              project={project}
              priority={index < 2}
            />
          </div>
        ))}
      </div>
      
      {displayedProjects.length === 0 && (
        <div className={css({
          paddingY: "10rem",
          textAlign: "center",
          border: "1px dashed",
          borderColor: "outline.variant",
          color: "secondary",
        })}>
          <p className={css({ fontFamily: "label", textTransform: "uppercase", letterSpacing: "widest" })}>
            No projects found in this sector.
          </p>
        </div>
      )}

      {/* Pagination & Counter */}
      {totalInFilter > 0 && (
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
              color: "onSurfaceVariant",
              marginBottom: "1rem",
            })}>
              Seen {displayedProjects.length} out of {totalInFilter} projects
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
                style={{ width: `${(displayedProjects.length / totalInFilter) * 100}%` }}
              />
            </div>
          </div>

          {/* See More Button */}
          {visibleCount < totalInFilter && (
            <button
              onClick={handleSeeMore}
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
      )}
    </section>
  );
}
