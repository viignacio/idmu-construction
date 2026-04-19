import { css } from "@/styled-system/css";
import ProjectCard from "./ProjectCard";
import Link from "next/link";
import SectionHeader from "../common/SectionHeader";

interface ProjectShowcaseProps {
  heading?: string;
  subheading?: string;
  cta?: {
    label?: string;
    link?: string;
  };
  projects?: any[];
}

export default function ProjectShowcase({
  heading,
  subheading,
  cta,
  projects = [],
}: ProjectShowcaseProps) {
  return (
    <section className={css({
      paddingY: { base: "6rem", md: "8rem" },
      paddingX: { base: "2rem", md: "6rem" },
      backgroundColor: "background",
    })}>
      {/* Module Header */}
      <div className={css({
        display: "flex",
        flexDirection: { base: "column", md: "row" },
        justifyContent: "space-between",
        alignItems: "baseline",
        marginBottom: "6rem",
        gap: "2rem",
      })}>
        <SectionHeader
          heading={heading}
          subheading={subheading}
          size="large"
          subheadingColor="secondary"
        />

        {cta?.label && cta?.link && (
          <Link
            href={cta.link}
            className={css({
              fontWeight: "bold",
              borderBottom: "2px solid",
              borderColor: "primary",
              paddingBottom: "1",
              textTransform: "uppercase",
              letterSpacing: "widest",
              color: "primary",
              transition: "all 0.3s",
              _hover: {
                borderColor: "tertiary",
                color: "tertiary",
              }
            })}
          >
            {cta.label}
          </Link>
        )}
      </div>

      {/* Masonry-style Grid */}
      <div className={css({
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        gap: "2rem",
      })}>
        {projects.map((item, index) => (
          <ProjectCard
            key={item._key || index}
            project={item.project}
            size={item.size}
            hoverEffect={item.hoverEffect}
            cardColor={item.cardColor}
            position={item.position}
            isOffset={item.isOffset}
          />
        ))}
      </div>
    </section>
  );
}
