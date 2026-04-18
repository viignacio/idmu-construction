import { client } from "@/sanity/lib/client";
import { NEWS_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import { css } from "@/styled-system/css";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";

interface NewsPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: NewsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const news = await client.fetch(NEWS_QUERY, { slug });

  if (!news) {
    return {
      title: "News Not Found | IDMU Construction",
    };
  }

  return {
    title: `${news.title} | News | IDMU Construction`,
  };
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { slug } = await params;
  const news = await client.fetch(NEWS_QUERY, { slug });

  if (!news) {
    notFound();
  }

  const formattedDate = news.date 
    ? new Date(news.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <article className={css({ backgroundColor: "white", minHeight: "100vh" })}>
      <div className={css({ 
        maxWidth: "4xl", 
        margin: "0 auto", 
        paddingX: "2rem", 
        paddingTop: { base: "4rem", md: "8rem" },
        paddingBottom: "8rem" 
      })}>
        {/* Header */}
        <header className={css({ marginBottom: "4rem" })}>
          <span className={css({ 
            display: "block", 
            fontSize: "xs", 
            fontWeight: "bold", 
            textTransform: "uppercase", 
            letterSpacing: "widest", 
            color: "tertiary", 
            marginBottom: "1.5rem" 
          })}>
            {news.category} / {formattedDate}
          </span>
          <h1 className={css({ 
            fontFamily: "headline", 
            fontSize: { base: "4xl", md: "7xl" }, 
            fontWeight: "900", 
            color: "primary", 
            textTransform: "uppercase", 
            lineHeight: "0.9", 
            letterSpacing: "tighter",
            marginBottom: "2rem" 
          })}>
            {news.title}
          </h1>
          {news.author && (
            <p className={css({ 
              fontSize: "sm", 
              fontWeight: "bold", 
              color: "secondary", 
              textTransform: "uppercase", 
              letterSpacing: "widest" 
            })}>
              By {news.author}
            </p>
          )}
        </header>

        {/* Main Image */}
        {news.mainImage && (
          <div className={css({ 
            position: "relative", 
            height: { base: "300px", md: "600px" }, 
            width: "full", 
            marginBottom: "4rem",
            backgroundColor: "surface-container-high"
          })}>
            <Image 
              src={urlFor(news.mainImage).width(1600).auto("format").quality(85).url()} 
              alt={news.title} 
              fill 
              className={css({ objectFit: "cover", filter: "grayscale(5%)" })} 
            />
          </div>
        )}

        {/* Excerpt */}
        {news.excerpt && (
          <p className={css({ 
            fontSize: "2xl", 
            lineHeight: "relaxed", 
            color: "primary", 
            fontFamily: "body", 
            marginBottom: "4rem",
            fontWeight: "medium",
            fontStyle: "italic",
            borderLeft: "2px solid",
            borderColor: "tertiary",
            paddingLeft: "2rem"
          })}>
            {news.excerpt}
          </p>
        )}

        {/* content */}
        <div className={css({ 
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
          },
          "& h3": { 
              fontFamily: "headline", 
              fontSize: "xl", 
              fontWeight: "bold", 
              textTransform: "uppercase", 
              marginTop: "3rem", 
              marginBottom: "1.5rem"
          }
        })}>
          <PortableText value={news.content} />
        </div>
      </div>
    </article>
  );
}

export async function generateStaticParams() {
  const newsItems = await client.fetch(`*[_type == "news" && defined(slug.current)]{ "slug": slug.current }`);
  
  return newsItems.map((item: { slug: string }) => ({
    slug: item.slug,
  }));
}
