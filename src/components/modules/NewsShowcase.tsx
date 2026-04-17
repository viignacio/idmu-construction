import { css } from "../../../styled-system/css";
import NewsCard from "./NewsCard";
import UpdateCard from "./UpdateCard";

interface NewsShowcaseProps {
  heading?: string;
  subheading?: string;
  featuredUpdate?: any;
  recentNews?: any[];
}

export default function NewsShowcase({ 
  heading = "FROM THE JOB SITE.", 
  subheading, 
  featuredUpdate, 
  recentNews = [] 
}: NewsShowcaseProps) {
  
  // Blueprint Empty State for UpdateCard
  const UpdatePlaceholder = () => (
    <div className={css({
      padding: "2rem",
      backgroundColor: "surface-dim",
      borderWidth: "1px",
      borderStyle: "dashed",
      borderColor: "primary",
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      opacity: 0.6,
    })}>
      <div className={css({ display: "flex", alignItems: "center", gap: "1rem" })}>
        <div className={css({ width: "2.5rem", height: "2.5rem", borderRadius: "full", border: "1px solid", borderColor: "primary" })} />
        <div className={css({ height: "1rem", width: "40%", backgroundColor: "primary" })} />
      </div>
      <div className={css({ height: "0.75rem", width: "100%", backgroundColor: "primary" })} />
      <div className={css({ height: "0.75rem", width: "80%", backgroundColor: "primary" })} />
      <span className={css({ fontSize: "x-small", fontWeight: "bold", textTransform: "uppercase" })}>
        Status: Awaiting Dispatch
      </span>
    </div>
  );

  // Blueprint Empty State for NewsCard
  const NewsPlaceholder = () => (
    <div className={css({
      height: "full",
      borderWidth: "1px",
      borderStyle: "dashed",
      borderColor: "primary",
      backgroundColor: "surface-dim",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      opacity: 0.5,
    })}>
      <div className={css({ height: "12rem", backgroundColor: "primary", opacity: 0.1 })} />
      <div className={css({ padding: "2rem", display: "flex", flexDirection: "column", gap: "0.75rem" })}>
        <div className={css({ height: "0.5rem", width: "30%", backgroundColor: "primary" })} />
        <div className={css({ height: "1rem", width: "90%", backgroundColor: "primary" })} />
        <div className={css({ height: "1rem", width: "70%", backgroundColor: "primary" })} />
      </div>
    </div>
  );

  return (
    <section className={css({
      paddingY: { base: "6rem", md: "8rem" },
      paddingX: { base: "2rem", md: "6rem" },
      backgroundColor: "surface-container-low",
    })}>
      <div className={css({
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        gap: { base: "4rem", md: "4rem" },
      })}>
        
        {/* Sidebar Column */}
        <div className={css({ gridColumn: { base: "span 12", md: "span 4" } })}>
          <h2 className={css({
            fontFamily: "headline",
            fontWeight: "bold",
            fontSize: { base: "5xl", md: "5xl" }, // Specific sizing for News section
            lineHeight: "0.9",
            color: "primary",
            letterSpacing: "tighter",
            textTransform: "uppercase",
            marginBottom: "2rem",
          })}>
            {heading.split(".")[0]}. <br/> {heading.split(".")[1] || "JOB SITE."}
          </h2>
          
          {subheading && (
            <p className={css({
              color: "on-surface-variant",
              marginBottom: "3rem",
              fontSize: "lg",
              lineHeight: "relaxed",
            })}>
              {subheading}
            </p>
          )}

          {/* Featured Update Card */}
          {featuredUpdate ? (
            <UpdateCard news={featuredUpdate} />
          ) : (
            <UpdatePlaceholder />
          )}
        </div>

        {/* Main Feed Column */}
        <div className={css({ gridColumn: { base: "span 12", md: "span 8" } })}>
          <div className={css({
            display: "grid",
            gridTemplateColumns: { base: "1fr", md: "repeat(2, 1fr)" },
            gap: "2rem",
          })}>
            {recentNews.length > 0 ? (
              recentNews.map((news, i) => (
                <NewsCard key={i} news={news} />
              ))
            ) : (
              [1, 2].map((i) => <NewsPlaceholder key={i} />)
            )}
            
            {/* If only 1 news item, show one placeholder */}
            {recentNews.length === 1 && <NewsPlaceholder />}
          </div>
        </div>

      </div>
    </section>
  );
}
