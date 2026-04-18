import { css } from "@/styled-system/css";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";

interface NewsCardProps {
  news: {
    title: string;
    category: string;
    mainImage?: any;
    slug?: string;
  };
}

export default function NewsCard({ news }: NewsCardProps) {
  if (!news) return null;

  const { title, category, mainImage, slug } = news;

  return (
    <Link 
      href={slug ? `/news/${slug}` : "#"}
      className={"group " + css({
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        height: "full",
        overflow: "hidden",
        cursor: "pointer",
        textDecoration: "none",
        color: "inherit",
      })}
    >
      {/* Image Container */}
      <div className={css({
        height: "12rem", // h-48
        overflow: "hidden",
        position: "relative",
        backgroundColor: "surface-container-high",
        animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
      })}>
        {mainImage && (
          <Image
            src={urlFor(mainImage).width(800).auto("format").quality(85).url()}
            alt={title}
            fill
            className={css({
              objectFit: "cover",
              transition: "transform 0.5s ease-out",
              _groupHover: {
                transform: "scale(1.1)",
              }
            })}
          />
        )}
      </div>

      {/* Content Area */}
      <div className={css({ 
        padding: "2rem",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      })}>
        <div>
          <span className={css({
            color: "tertiary",
            fontWeight: "bold",
            fontSize: "10px",
            textTransform: "uppercase",
            letterSpacing: "0.4em", // tracking-widest
            display: "block",
            marginBottom: "0.5rem",
          })}>
            {category}
          </span>
          
          <h5 className={css({
            fontFamily: "headline",
            fontWeight: "bold",
            fontSize: "xl",
            marginBottom: "2rem", // Added more space for title
            transition: "color 0.3s",
            _groupHover: {
              color: "primary",
            }
          })}>
            {title}
          </h5>
        </div>

        <div className={css({
          fontSize: "xs",
          fontWeight: "black",
          textTransform: "uppercase",
          letterSpacing: "widest",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          transition: "gap 0.3s",
          _groupHover: {
            gap: "1rem",
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
    </Link>
  );
}
