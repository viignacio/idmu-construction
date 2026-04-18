"use client";

import { useState } from "react";
import { css } from "../../../styled-system/css";
import ProjectCard from "./ProjectCard";

interface ProjectGridProps {
  heading?: string;
  subheading?: string;
  showFilters?: boolean;
  limit?: number;
  projects?: any[];
}

const SECTORS = [
  "All",
  "Industrial",
  "Commercial",
  "Residential",
  "Interior",
  "Institutional",
  "Infrastructure",
];

export default function ProjectGrid({
  heading,
  subheading,
  showFilters = true,
  limit,
  projects = [],
}: ProjectGridProps) {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = (activeFilter === "All" 
    ? projects 
    : projects.filter(p => p.sector === activeFilter)
  ).slice(0, limit || projects.length);

  return (
    <section className={css({
      paddingY: { base: "6rem", md: "8rem" },
      maxWidth: "1600px",
      marginX: "auto",
      paddingX: "2rem",
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
              fontSize: { base: "5xl", md: "7xl" },
              color: "primary",
              letterSpacing: "tighter",
              textTransform: "uppercase",
              lineHeight: "0.9",
              marginBottom: "1.5rem"
            })}>
              {heading}
            </h2>
          )}
          {subheading && (
            <p className={css({
              color: "secondary",
              maxWidth: "2xl",
              fontSize: "lg",
              lineHeight: "relaxed",
            })}>
              {subheading}
            </p>
          )}
        </div>

        {showFilters && (
          <div className={css({
            display: "flex",
            flexWrap: "wrap",
            gap: "1.5rem",
            borderBottom: "1px solid",
            borderColor: "outline.variant",
            paddingBottom: "1rem",
            width: { base: "100%", md: "auto" }
          })}>
            {SECTORS.map((sector) => (
              <button
                key={sector}
                onClick={() => setActiveFilter(sector)}
                className={css({
                  fontSize: "xs",
                  fontWeight: "black",
                  fontFamily: "headline",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  paddingBottom: "0.5rem",
                  transition: "all 0.3s",
                  cursor: "pointer",
                  color: activeFilter === sector ? "primary" : "onSurfaceVariant",
                  borderBottom: activeFilter === sector ? "2px solid" : "2px solid",
                  borderColor: activeFilter === sector ? "tertiary" : "transparent",
                  _hover: {
                    color: "primary",
                  }
                })}
              >
                {sector}
              </button>
            ))}
          </div>
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
        gap: "2rem",
      })}>
        {filteredProjects.map((project, index) => (
          <ProjectCard
            key={project._id || index}
            project={project}
            variant="architectural"
            size="square" // Project Grid usually uses a more uniform look initially
            cardColor="transparent"
          />
        ))}
      </div>
      
      {filteredProjects.length === 0 && (
        <div className={css({
          paddingY: "10rem",
          textAlign: "center",
          border: "1px dashed",
          borderColor: "outline.variant",
          color: "secondary",
          gridColumn: "span 3"
        })}>
          <p className={css({ fontFamily: "label", textTransform: "uppercase", letterSpacing: "widest" })}>
            No projects found in this sector.
          </p>
        </div>
      )}
    </section>
  );
}
