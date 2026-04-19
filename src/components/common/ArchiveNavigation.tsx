import Link from "next/link";
import { css, cx } from "@/styled-system/css";

interface NavLink {
  title: string;
  slug: string;
}

interface ArchiveNavigationProps {
  next?: NavLink;
  prev?: NavLink;
  type: "projects" | "news";
}

export default function ArchiveNavigation({ next, prev, type }: ArchiveNavigationProps) {
  const basePath = type === "projects" ? "/projects" : "/news";
  const typeLabel = type === "projects" ? "Project" : "Article";

  return (
    <nav className={css({
      borderTop: "1px solid",
      borderColor: "rgba(13, 27, 42, 0.1)", // Subdued primary color
      display: "flex",
      width: "100%",
      backgroundColor: "white",
    })}>
      <Link 
        href={prev ? `${basePath}/${prev.slug}` : "#"} 
        className={cx(
          "group",
          css({
            flex: 1,
            padding: { base: "2rem", md: "4rem" },
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            textDecoration: "none",
            borderRight: "1px solid",
            borderColor: "rgba(13, 27, 42, 0.05)",
            transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            position: "relative",
            _hover: {
              backgroundColor: "surface-container-low",
            }
          })
        )}
      >
        <div className={css({
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          color: "tertiary",
        })}>
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_back</span>
          <span className={css({
            fontSize: "10px",
            fontWeight: "900",
            fontFamily: "headline",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          })}>
            Previous {typeLabel}
          </span>
        </div>
        {prev && (
          <h4 className={css({
            fontSize: { base: "lg", md: "2xl" },
            fontWeight: "bold",
            color: "primary",
            fontFamily: "headline",
            letterSpacing: "tight",
            lineHeight: "tight",
            textTransform: "uppercase",
            maxWidth: "400px",
          })}>
            {prev.title}
          </h4>
        )}
      </Link>

      {/* Next Link */}
      <Link 
        href={next ? `${basePath}/${next.slug}` : "#"} 
        className={cx(
          "group",
          css({
            flex: 1,
            padding: { base: "2rem", md: "4rem" },
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            textAlign: "right",
            gap: "1rem",
            textDecoration: "none",
            transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            _hover: {
              backgroundColor: "surface-container-low",
            }
          })
        )}
      >
        <div className={css({
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          color: "tertiary",
          flexDirection: "row-reverse",
        })}>
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
          <span className={css({
            fontSize: "10px",
            fontWeight: "900",
            fontFamily: "headline",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          })}>
            Next {typeLabel}
          </span>
        </div>
        {next && (
          <h4 className={css({
            fontSize: { base: "lg", md: "2xl" },
            fontWeight: "bold",
            color: "primary",
            fontFamily: "headline",
            letterSpacing: "tight",
            lineHeight: "tight",
            textTransform: "uppercase",
            maxWidth: "400px",
          })}>
            {next.title}
          </h4>
        )}
      </Link>
    </nav>
  );
}
