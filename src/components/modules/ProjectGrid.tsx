"use client";

import { css } from "@/styled-system/css";
import ArchiveProjectCard from "./ArchiveProjectCard";
import ArchiveFilter from "../common/ArchiveFilter";
import ArchivePagination from "../common/ArchivePagination";
import SectionHeader from "../common/SectionHeader";
import { useArchiveFilter } from "@/hooks/useArchiveFilter";

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
  const { activeFilters, activeFilter, visibleItems, totalInFilter, handleFilterChange, handleSeeMore } =
    useArchiveFilter({ items: projects, filterKey: "sector", idPrefix: "project" });

  const displayedProjects = limit ? visibleItems.slice(0, limit) : visibleItems;

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
        gap: { base: "2.5rem", md: "4rem" },
        marginBottom: { base: "4rem", md: "6rem" },
      })}>
        <SectionHeader heading={heading} subheading={subheading} size="large" />

        <div className={css({ flex: 1, minWidth: 0 })}>
          {showFilters && (
            <ArchiveFilter
              activeFilter={activeFilter}
              filters={activeFilters}
              onFilterChange={handleFilterChange}
              allLabel="ALL WORKS"
            />
          )}
        </div>
      </div>

      {/* Grid */}
      <div className={css({
        display: "grid",
        gridTemplateColumns: { base: "1fr", md: "repeat(2, 1fr)" },
        gap: { base: "1.5rem", md: "3rem" },
        width: "100%",
      })}>
        {displayedProjects.map((project, index) => (
          <div key={project._id || index} id={`project-${index}`}>
            <ArchiveProjectCard project={project} priority={index < 2} />
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
