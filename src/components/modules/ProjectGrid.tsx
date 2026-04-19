"use client";

import { useState, useMemo, useEffect } from "react";
import { css } from "@/styled-system/css";
import ArchiveProjectCard from "./ArchiveProjectCard";
import ArchiveFilter from "../common/ArchiveFilter";
import ArchivePagination from "../common/ArchivePagination";

interface ProjectGridProps {
  heading?: string;
  subheading?: string;
  showFilters?: boolean;
  limit?: number;
  projects?: any[];
}

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
              fontSize: { base: "5xl", md: "5rem" },
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
              color: "on-surface-variant",
              maxWidth: "2xl",
              fontSize: "lg",
              lineHeight: "relaxed",
            })}>
              {subheading}
            </p>
          )}
        </div>

        <div className={css({
          flex: 1,
          minWidth: 0,
        })}>
          {showFilters && (
            <ArchiveFilter
              activeFilter={activeFilter}
              filters={activeSectors}
              onFilterChange={handleFilterChange}
              allLabel="ALL WORKS"
            />
          )}
        </div>
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
      
      <ArchivePagination
        displayedCount={displayedProjects.length}
        totalCount={totalInFilter}
        onSeeMore={handleSeeMore}
        itemType="projects"
      />
    </section>
  );
}
