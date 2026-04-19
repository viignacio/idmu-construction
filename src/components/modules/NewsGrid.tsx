"use client";

import { useState, useMemo, useEffect } from "react";
import { css } from "@/styled-system/css";
import ArchiveNewsCard from "./ArchiveNewsCard";
import ArchiveFilter from "../common/ArchiveFilter";
import ArchivePagination from "../common/ArchivePagination";

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
  const [activeFilter, setActiveFilter] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);
  const [shouldScroll, setShouldScroll] = useState(false);

  // Dynamically determine which categories have news
  const activeCategories = useMemo(() => {
    const categoriesWithContent = new Set(news.map(n => n.category).filter(Boolean));
    return ["All", ...Array.from(categoriesWithContent).sort()];
  }, [news]);

  // Handle filter changes and reset visibility
  const handleFilterChange = (category: string) => {
    setActiveFilter(category);
    setVisibleCount(6);
    setShouldScroll(false);
  };

  const allFilteredNews = useMemo(() => {
    return activeFilter === "All" 
      ? news 
      : news.filter(n => n.category === activeFilter);
  }, [activeFilter, news]);

  const displayedNews = allFilteredNews.slice(0, visibleCount);
  const totalInFilter = allFilteredNews.length;

  // Smooth scroll logic
  useEffect(() => {
    if (shouldScroll && visibleCount > 6) {
      const targetId = `news-${visibleCount - 6}`;
      const element = document.getElementById(targetId);
      if (element) {
        setTimeout(() => {
          const offset = 100;
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
        alignItems: { base: "start", md: "sm:end" },
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
              color: "on-surface-variant",
              maxWidth: "2xl",
              fontSize: "lg",
              lineHeight: "relaxed",
            })}>
              {subheading}
            </p>
          )}
        </div>

        {showFilters && (
          <ArchiveFilter
            activeFilter={activeFilter}
            filters={activeCategories}
            onFilterChange={handleFilterChange}
            allLabel="ALL UPDATES"
          />
        )}
      </div>

      {/* Grid */}
      <div className={css({
        display: "grid",
        gridTemplateColumns: {
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)"
        },
        gap: { base: "3rem", md: "3rem" },
        width: "100%",
      })}>
        {displayedNews.map((article, index) => (
          <div key={article._id || index} id={`news-${index}`}>
            <ArchiveNewsCard
              news={article}
              priority={index < 3}
            />
          </div>
        ))}
      </div>
      
      <ArchivePagination
        displayedCount={displayedNews.length}
        totalCount={totalInFilter}
        onSeeMore={handleSeeMore}
        itemType="updates"
      />
    </section>
  );
}
