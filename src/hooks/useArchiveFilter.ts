"use client";

import { useState, useMemo, useEffect } from "react";

interface UseArchiveFilterOptions<T extends Record<string, any>> {
  /** The full array of items to filter and paginate. */
  items: T[];
  /** The key on each item to extract filter categories from (e.g. "sector", "category"). */
  filterKey: keyof T;
  /** Prefix for DOM element IDs used in scroll-to-next-page (e.g. "project", "news"). */
  idPrefix: string;
  /** How many items to show per page load. Defaults to 6. */
  pageSize?: number;
}

interface UseArchiveFilterResult<T> {
  /** All unique filter values derived from items, prefixed with "All". */
  activeFilters: string[];
  /** Currently selected filter value. */
  activeFilter: string;
  /** The slice of items currently visible on screen. */
  visibleItems: T[];
  /** Total count of items that match the current filter. */
  totalInFilter: number;
  /** Call when the user clicks a filter chip. Resets page back to first page. */
  handleFilterChange: (value: string) => void;
  /** Call when the user clicks "See More". Appends the next page and scrolls to it. */
  handleSeeMore: () => void;
}

/**
 * Generic filter + paginate + scroll-to-next hook.
 * Eliminates the identical stateful logic shared by ProjectGrid and NewsGrid.
 */
export function useArchiveFilter<T extends Record<string, any>>({
  items,
  filterKey,
  idPrefix,
  pageSize = 6,
}: UseArchiveFilterOptions<T>): UseArchiveFilterResult<T> {
  const [activeFilter, setActiveFilter] = useState("All");
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const [shouldScroll, setShouldScroll] = useState(false);

  // Derive unique filter labels from the item set dynamically
  const activeFilters = useMemo(() => {
    const values = new Set(
      items.map((item) => item[filterKey]).filter(Boolean) as string[]
    );
    return ["All", ...Array.from(values).sort()];
  }, [items, filterKey]);

  // Reset page when items change externally (e.g. on route change)
  useEffect(() => {
    setActiveFilter("All");
    setVisibleCount(pageSize);
  }, [items, pageSize]);

  const handleFilterChange = (value: string) => {
    setActiveFilter(value);
    setVisibleCount(pageSize);
    setShouldScroll(false);
  };

  const allFiltered = useMemo(() => {
    return activeFilter === "All"
      ? items
      : items.filter((item) => item[filterKey] === activeFilter);
  }, [activeFilter, items, filterKey]);

  const visibleItems = allFiltered.slice(0, visibleCount);
  const totalInFilter = allFiltered.length;

  // Smooth-scroll to the first newly appended item after "See More"
  useEffect(() => {
    if (shouldScroll && visibleCount > pageSize) {
      const targetId = `${idPrefix}-${visibleCount - pageSize}`;
      const element = document.getElementById(targetId);
      if (element) {
        setTimeout(() => {
          const offset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }, 50);
      }
      setShouldScroll(false);
    }
  }, [visibleCount, shouldScroll, idPrefix, pageSize]);

  const handleSeeMore = () => {
    setShouldScroll(true);
    setVisibleCount((prev) => prev + pageSize);
  };

  return {
    activeFilters,
    activeFilter,
    visibleItems,
    totalInFilter,
    handleFilterChange,
    handleSeeMore,
  };
}
