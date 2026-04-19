import Link from "next/link";
import { css } from "@/styled-system/css";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

interface ArchiveNewsCardProps {
  news: {
    _id: string;
    title: string;
    slug: { current: string };
    category: string;
    date: string;
    excerpt?: string;
    mainImage: any;
  };
  priority?: boolean;
}

export default function ArchiveNewsCard({ news, priority = false }: ArchiveNewsCardProps) {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(news.date));

  return (
    <article className={css({
      display: "flex",
      flexDirection: "column",
      height: "100%",
      group: true,
    })}>
      <Link href={`/news/${news.slug.current}`} className={css({
        display: "flex",
        flexDirection: "column",
        height: "100%",
        textDecoration: "none",
        _hover: {
          "& h3": {
            color: "tertiary",
          }
        }
      })}>
        {/* Image Container */}
        <div className={css({
          height: "16rem",
          marginBottom: "1.5rem",
          overflow: "hidden",
          backgroundColor: "surface-container-low",
          position: "relative",
        })}>
          {news.mainImage && (
            <Image
              src={urlFor(news.mainImage).width(800).height(500).url()}
              alt={news.title}
              fill
              priority={priority}
              className={css({
                objectFit: "cover",
                filter: "grayscale(100%)",
                transition: "all 0.5s ease",
                _groupHover: {
                  filter: "grayscale(0%)",
                  transform: "scale(1.05)",
                }
              })}
            />
          )}
        </div>

        {/* Category */}
        <span className={css({
          fontSize: "xs",
          fontWeight: "bold",
          color: "tertiary",
          marginBottom: "0.75rem",
          fontFamily: "headline",
          letterSpacing: "widest",
          textTransform: "uppercase",
        })}>
          {news.category}
        </span>

        {/* Title */}
        <h3 className={css({
          fontSize: "2xl",
          fontFamily: "headline",
          fontWeight: "bold",
          marginBottom: "1rem",
          color: "primary",
          letterSpacing: "tight",
          lineHeight: "tight",
          transition: "colors 0.3s ease",
        })}>
          {news.title}
        </h3>

        {/* Excerpt */}
        {news.excerpt && (
          <p className={css({
            color: "on-surface-variant",
            fontSize: "sm",
            marginBottom: "1.5rem",
            flexGrow: 1,
            lineHeight: "relaxed",
          })}>
            {news.excerpt}
          </p>
        )}

        {/* Date */}
        <time className={css({
          fontSize: "10px",
          fontWeight: "bold",
          color: "on-surface-variant",
          textTransform: "uppercase",
          letterSpacing: "widest",
          fontFamily: "headline",
          opacity: 0.8,
        })}>
          {formattedDate}
        </time>
      </Link>
    </article>
  );
}
