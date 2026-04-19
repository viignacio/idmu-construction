import { css, cx } from "@/styled-system/css";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

interface ArchiveProjectCardProps {
  project: {
    title: string;
    sector?: string;
    mainImage?: any;
    slug?: string;
    location?: string;
    status?: "COMPLETE" | "ONGOING";
    completionPercentage?: number;
  };
  priority?: boolean;
}

export default function ArchiveProjectCard({ project, priority = false }: ArchiveProjectCardProps) {
  if (!project) return null;

  const { title, sector, mainImage, slug, location, status, completionPercentage } = project;

  return (
    <Link 
      href={slug ? `/projects/${slug}` : "#"} 
      className={cx(
        "group",
        css({
          position: "relative",
          overflow: "hidden",
          backgroundColor: "surface",
          cursor: "pointer",
          display: "block",
          textDecoration: "none",
          width: "100%",
          // Enforce 3:2 aspect ratio strictly
          aspectRatio: "3/2",
          height: "auto",
        })
      )}
    >
      {mainImage && (
        <div className={css({
          position: "absolute",
          inset: 0,
          transition: "transform 1s cubic-bezier(0.16, 1, 0.3, 1)",
          _groupHover: { transform: "scale(1.05)" },
          backgroundColor: "surface-container-high",
        })}>
          <Image
            src={urlFor(mainImage).width(1200).auto("format").quality(85).url()}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px" 
            priority={priority}
            draggable={false}
            className={css({ 
              objectFit: "cover", 
              filter: "grayscale(100%)",
              transition: "filter 0.7s ease",
              userSelect: "none",
              _groupHover: {
                filter: "grayscale(0%)",
              }
            })}
          />
        </div>
      )}

      <div className={css({
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end", // Always anchor content to the bottom
        padding: "2rem",
        zIndex: 20,
      })}>
        {/* Gradient Overlay */}
        <div className={css({
          position: "absolute",
          inset: 0,
          // More aggressive gradient for superior legibility and "Monolith" mood
          backgroundImage: "linear-gradient(to top, rgba(13, 27, 42, 0.98) 0%, rgba(13, 27, 42, 0.8) 40%, rgba(13, 27, 42, 0.3) 75%, transparent 100%)",
          zIndex: -1,
          opacity: 0.75, // Stronger base opacity
          transition: "opacity 0.5s ease",
          _groupHover: { opacity: 0.95 }
        })} />
        
        {/* Top Badge - Positioned absolutely to avoid pushing content */}
        {sector && (
          <div className={css({
            position: "absolute",
            top: "2rem",
            left: "2rem",
          })}>
            <span className={css({
              backgroundColor: ["Industrial", "Infrastructure", "Institutional"].includes(sector) ? "tertiary" : "rgba(215, 226, 255, 1)",
              color: ["Industrial", "Infrastructure", "Institutional"].includes(sector) ? "primary" : "rgba(68, 71, 76, 1)",
              px: "3",
              py: "1",
              fontSize: "10px",
              fontWeight: "900",
              letterSpacing: "0.2em",
              textTransform: "uppercase"
            })}>
              {sector}
            </span>
          </div>
        )}

        {/* Bottom Info Area */}
        <div className={css({
          width: "100%",
        })}>
          <div className={css({
            display: "flex",
            justifyContent: "space-between",
            alignItems: "end",
            marginBottom: "1rem",
          })}>
            <div>
              <h3 className={css({
                fontFamily: "headline",
                fontSize: { base: "2xl", md: title.length > 15 ? "2xl" : "3xl" },
                fontWeight: "bold",
                color: "white",
                lineHeight: "none",
                marginBottom: "0.5rem",
                textTransform: "uppercase",
                _groupHover: { color: "tertiary" }
              })}>
                {title}
              </h3>
              {location && (
                <p className={css({
                  color: "white/70",
                  fontSize: "sm",
                  display: "flex",
                  alignItems: "center",
                  gap: "2",
                  fontFamily: "body"
                })}>
                  <span className="material-symbols-outlined" style={{ fontSize: '12px' }}>location_on</span> {location}
                </p>
              )}
            </div>
            
            {status && (
              <div className={css({ textAlign: "right" })}>
                <span className={css({
                  color: "tertiary",
                  fontSize: "xs",
                  fontWeight: "900",
                  letterSpacing: "widest",
                  display: "block",
                  marginBottom: "1",
                  textTransform: "uppercase"
                })}>STATUS</span>
                <span className={css({
                  color: "white",
                  fontSize: "xs",
                  fontWeight: "medium"
                })}>{status}</span>
              </div>
            )}
          </div>

          {status === "ONGOING" && (
            <div className={css({
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
              marginBottom: "1.5rem"
            })}>
              <div className={css({
                flex: 1,
                height: "2px",
                backgroundColor: "white/10",
              })}>
                <div 
                  className={css({
                    height: "100%",
                    backgroundColor: "tertiary",
                    transition: "width 1s ease-out",
                  })} 
                  style={{ width: `${completionPercentage || 0}%` }}
                />
              </div>
              <span className={css({
                color: "white",
                fontSize: "10px",
                fontWeight: "900",
                fontFamily: "headline",
                letterSpacing: "widest"
              })}>
                {completionPercentage || 0}%
              </span>
            </div>
          )}

          <div className={css({
            fontSize: "xs",
            fontWeight: "black",
            textTransform: "uppercase",
            letterSpacing: "widest",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            transition: "gap 0.3s",
            color: "white",
            _groupHover: {
              gap: "1rem",
              color: "tertiary"
            }
          })}>
            Read More 
            <span className={css({
              fontSize: "1rem",
              fontWeight: "normal",
              fontFamily: "Material Symbols Outlined"
            })}>
              arrow_forward
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
