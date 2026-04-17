import { css } from "../../../styled-system/css";

interface UpdateCardProps {
  news: {
    excerpt: string;
    author?: string;
    date: string;
  };
}

export default function UpdateCard({ news }: UpdateCardProps) {
  if (!news) return null;

  const { excerpt, author = "IDMU Construction", date } = news;

  // Initials logic: first and last strings
  const getInitials = (name: string) => {
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  // Time format logic
  const getTimeAgo = (dateStr: string) => {
    const pubDate = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - pubDate.getTime();
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffHrs < 1) return "Just now";
    if (diffHrs < 24) return `${diffHrs} hours ago`;
    return "> 1 day ago";
  };

  return (
    <div className={css({
      padding: "2rem",
      backgroundColor: "white",
      borderLeftWidth: "4px",
      borderLeftColor: "tertiary",
      boxShadow: "sm",
    })}>
      {/* Author Header */}
      <div className={css({
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        marginBottom: "1rem",
      })}>
        {/* Avatar */}
        <div className={css({
          width: "2.5rem", // w-10
          height: "2.5rem", // h-10
          backgroundColor: "primary-container",
          borderRadius: "full",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: "bold",
          fontSize: "xs",
        })}>
          {getInitials(author)}
        </div>

        <div>
          <div className={css({
            fontWeight: "bold",
            fontSize: "sm",
            color: "primary",
          })}>
            {author}
          </div>
          <div className={css({
            fontSize: "xs",
            color: "slate.400",
          })}>
            {getTimeAgo(date)}
          </div>
        </div>
      </div>

      {/* Excerpt */}
      <p className={css({
        fontSize: "sm",
        color: "slate.600",
        marginBottom: "1rem",
        fontStyle: "italic",
        lineHeight: "relaxed",
      })}>
        "{excerpt}"
      </p>

      {/* Static social footer (as per design screenshot icons) */}
      <div className={css({
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        fontSize: "xs",
        fontWeight: "bold",
        color: "primary",
      })}>
        <span className={css({ display: "flex", alignItems: "center", gap: "0.25rem" })}>
           <span className={css({ fontFamily: "Material Symbols Outlined", fontSize: "16px" })}>thumb_up</span>
           124
        </span>
        <span className={css({ display: "flex", alignItems: "center", gap: "0.25rem" })}>
           <span className={css({ fontFamily: "Material Symbols Outlined", fontSize: "16px" })}>comment</span>
           12
        </span>
      </div>
    </div>
  );
}
