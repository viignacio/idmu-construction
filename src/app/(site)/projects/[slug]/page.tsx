import { client } from "@/sanity/lib/client";
import { PROJECT_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import { css } from "@/styled-system/css";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await client.fetch(PROJECT_QUERY, { slug });

  if (!project) {
    return {
      title: "Project Not Found | IDMU Construction",
    };
  }

  return {
    title: `${project.title} | Projects | IDMU Construction`,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await client.fetch(PROJECT_QUERY, { slug });

  if (!project) {
    notFound();
  }

  return (
    <article className={css({ backgroundColor: "white", minHeight: "100vh" })}>
      {/* Hero Section */}
      <div className={css({ position: "relative", height: { base: "60vh", md: "80vh" }, width: "full", overflow: "hidden" })}>
        {project.mainImage && (
          <Image
            src={urlFor(project.mainImage).width(2000).auto("format").quality(90).url()}
            alt={project.title}
            fill
            priority
            className={css({ objectFit: "cover", filter: "grayscale(10%)" })}
          />
        )}
        <div className={css({ 
          position: "absolute", 
          inset: 0, 
          background: "linear-gradient(to bottom, rgba(13,27,42,0) 50%, rgba(13,27,42,0.8) 100%)",
          display: "flex",
          alignItems: "flex-end",
          padding: { base: "2rem", md: "6rem" }
        })}>
          <div className={css({ maxWidth: "5xl" })}>
             <h1 className={css({
              fontFamily: "headline",
              fontSize: { base: "5xl", md: "9xl" },
              fontWeight: "900",
              color: "white",
              textTransform: "uppercase",
              lineHeight: "0.85",
              letterSpacing: "tighter",
            })}>
              {project.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className={css({ 
        paddingX: { base: "2rem", md: "6rem" },
        paddingY: { base: "4rem", md: "6rem" },
        display: "grid",
        gridTemplateColumns: { base: "1fr", md: "repeat(12, 1fr)" },
        gap: "4rem"
      })}>
        {/* Sidebar Metadata */}
        <aside className={css({ 
          gridColumn: { base: "span 1", md: "span 4" },
          display: "flex",
          flexDirection: "column",
          gap: "3rem"
        })}>
          <div className={css({ borderLeft: "4px solid", borderColor: "tertiary", paddingLeft: "2rem" })}>
            {/* Metadata Grid */}
            <div className={css({ display: "flex", flexDirection: "column", gap: "2rem" })}>
              {project.sector && (
                <div>
                  <span className={css({ 
                    fontSize: "10px", 
                    fontWeight: "bold", 
                    textTransform: "uppercase", 
                    letterSpacing: "widest", 
                    color: "tertiary", // Updated to tertiary
                    display: "block", 
                    marginBottom: "0.5rem" 
                  })}>Sector</span>
                  <p className={css({ fontSize: "xl", fontWeight: "bold", color: "primary", textTransform: "uppercase", fontFamily: "headline" })}>
                    {project.sector}
                  </p>
                </div>
              )}

              {project.startDate && (
                <div>
                  <span className={css({ 
                    fontSize: "10px", 
                    fontWeight: "bold", 
                    textTransform: "uppercase", 
                    letterSpacing: "widest", 
                    color: "tertiary", 
                    display: "block", 
                    marginBottom: "0.5rem" 
                  })}>Project Start Date</span>
                  <p className={css({ fontSize: "xl", fontWeight: "bold", color: "primary", fontFamily: "headline" })}>
                    {new Date(project.startDate).toLocaleDateString("en-US", { month: "long", year: "numeric", day: "numeric" })}
                  </p>
                </div>
              )}

              {project.completionDate && (
                <div>
                  <span className={css({ 
                    fontSize: "10px", 
                    fontWeight: "bold", 
                    textTransform: "uppercase", 
                    letterSpacing: "widest", 
                    color: "tertiary", 
                    display: "block", 
                    marginBottom: "0.5rem" 
                  })}>Project Completion Date</span>
                  <p className={css({ fontSize: "xl", fontWeight: "bold", color: "primary", fontFamily: "headline" })}>
                    {new Date(project.completionDate).toLocaleDateString("en-US", { month: "long", year: "numeric", day: "numeric" })}
                  </p>
                </div>
              )}

              {project.status && (
                <div>
                  <span className={css({ 
                    fontSize: "10px", 
                    fontWeight: "bold", 
                    textTransform: "uppercase", 
                    letterSpacing: "widest", 
                    color: "tertiary", 
                    display: "block", 
                    marginBottom: "0.5rem" 
                  })}>Project Status</span>
                  <div className={css({ display: "flex", alignItems: "center", gap: "1rem" })}>
                    <p className={css({ fontSize: "xl", fontWeight: "bold", color: "primary", textTransform: "uppercase", fontFamily: "headline" })}>
                      {project.status}
                    </p>
                    {project.status === "ONGOING" && project.completionPercentage !== undefined && (
                      <span className={css({
                        backgroundColor: "primary",
                        color: "white",
                        paddingX: "0.5rem",
                        paddingY: "0.25rem",
                        fontSize: "xs",
                        fontWeight: "black",
                        borderRadius: "none"
                      })}>
                        {project.completionPercentage}%
                      </span>
                    )}
                  </div>
                </div>
              )}

              {project.location && (
                <div>
                  <span className={css({ 
                    fontSize: "10px", 
                    fontWeight: "bold", 
                    textTransform: "uppercase", 
                    letterSpacing: "widest", 
                    color: "tertiary", 
                    display: "block", 
                    marginBottom: "0.5rem" 
                  })}>Location</span>
                  <p className={css({ fontSize: "xl", fontWeight: "bold", color: "primary", textTransform: "uppercase", fontFamily: "headline" })}>
                    {project.location}
                  </p>
                </div>
              )}

              {project.client && (
                <div>
                  <span className={css({ 
                    fontSize: "10px", 
                    fontWeight: "bold", 
                    textTransform: "uppercase", 
                    letterSpacing: "widest", 
                    color: "tertiary", 
                    display: "block", 
                    marginBottom: "0.5rem" 
                  })}>Client</span>
                  <p className={css({ fontSize: "xl", fontWeight: "bold", color: "primary", textTransform: "uppercase", fontFamily: "headline" })}>
                    {project.client}
                  </p>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Main Body */}
        <div className={css({ 
          gridColumn: { base: "span 1", md: "span 8" },
          fontFamily: "body",
          fontSize: "lg",
          lineHeight: "relaxed",
          color: "primary",
          "& p": { marginBottom: "2rem" },
          "& h2": { 
              fontFamily: "headline", 
              fontSize: "3xl", 
              fontWeight: "bold", 
              textTransform: "uppercase", 
              marginTop: "4rem", 
              marginBottom: "2rem",
              letterSpacing: "tight"
          }
        })}>
          <PortableText value={project.description} />
        </div>
      </div>

      {/* Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <div className={css({ 
          paddingX: { base: "2rem", md: "6rem" },
          paddingBottom: "8rem",
          display: "grid",
          gridTemplateColumns: { base: "1fr", md: "repeat(2, 1fr)" },
          gap: "2rem"
        })}>
          {project.gallery.map((img: any, i: number) => (
            <div key={i} className={css({ position: "relative", height: "500px", width: "full", overflow: "hidden" })}>
               <Image 
                src={urlFor(img).width(1200).auto("format").quality(85).url()} 
                alt={`${project.title} gallery ${i}`} 
                fill 
                className={css({ objectFit: "cover", filter: "grayscale(10%)", transition: "transform 0.5s", _hover: { transform: "scale(1.05)" } })} 
               />
            </div>
          ))}
        </div>
      )}
    </article>
  );
}

export async function generateStaticParams() {
  const projects = await client.fetch(`*[_type == "project" && defined(slug.current)]{ "slug": slug.current }`);
  
  return projects.map((project: { slug: string }) => ({
    slug: project.slug,
  }));
}
