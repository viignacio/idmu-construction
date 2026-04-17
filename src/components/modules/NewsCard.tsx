import { css } from "../../../styled-system/css";
import Image from "next/image";
import Link from "next/link";

interface NewsCardProps {
  news: {
    title: string;
    category: string;
    imageUrl?: string;
    slug?: { current: string };
  };
}

export default function NewsCard({ news }: NewsCardProps) {
  if (!news) return null;

  const { title, category, imageUrl } = news;

  return (
    <div className={"group " + css({
      backgroundColor: "white",
      display: "flex",
      flexDirection: "column",
      height: "full",
      overflow: "hidden",
      cursor: "pointer",
    })}>
      {/* Image Container */}
      <div className={css({
        height: "12rem", // h-48
        overflow: "hidden",
        position: "relative",
      })}>
        {imageUrl && (
          <Image
            src={imageUrl}
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
      <div className={css({ padding: "2rem" })}>
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
          marginBottom: "1rem",
          transition: "color 0.3s",
          _groupHover: {
            color: "primary",
          }
        })}>
          {title}
        </h5>

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
    </div>
  );
}
