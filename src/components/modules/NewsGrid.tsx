"use client";

import { css } from "@/styled-system/css";
import ArchiveNewsCard from "./ArchiveNewsCard";
import ArchiveFilter from "../common/ArchiveFilter";
import ArchivePagination from "../common/ArchivePagination";
import SectionHeader from "../common/SectionHeader";
import { useArchiveFilter } from "@/hooks/useArchiveFilter";

interface NewsGridProps {
  heading?: string;
  subheading?: string;
  showFilters?: boolean;
  news?: any[];
}

export default function NewsGrid({
  heading,
  subheading,
  showFilters = true,
  news = [],
}: NewsGridProps) {
  const { activeFilters, activeFilter, visibleItems, totalInFilter, handleFilterChange, handleSeeMore } =
    useArchiveFilter({ items: news, filterKey: "category", idPrefix: "news" });

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
              allLabel="ALL TECHNICAL UPDATES"
            />
          )}
        </div>
      </div>

      {/* Grid */}
      <div className={css({
        display: "grid",
        gridTemplateColumns: { base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" },
        gap: { base: "3rem", md: "3rem" },
        width: "100%",
      })}>
        {visibleItems.map((article, index) => (
          <div key={article._id || index} id={`news-${index}`}>
            <ArchiveNewsCard news={article} priority={index < 3} />
          </div>
        ))}
      </div>

      <ArchivePagination
        displayedCount={visibleItems.length}
        totalCount={totalInFilter}
        onSeeMore={handleSeeMore}
        itemType="technical updates"
      />
    </section>
  );
}
