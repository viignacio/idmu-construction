import { css } from "../../../styled-system/css";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

interface Personnel {
  name: string;
  position: string;
  profileImage: any;
  bio: string;
  socialLinks?: Array<{ platform: string; url: string }>;
}

interface PersonnelGridProps {
  heading: string;
  subheading?: string;
  backgroundColor?: string;
  members: Personnel[];
}

export default function PersonnelGrid({
  heading,
  subheading,
  backgroundColor = "surface",
  members,
}: PersonnelGridProps) {
  const isDarkSection = backgroundColor === "primary" || backgroundColor === "surface";

  return (
    <section className={css({
      paddingY: { base: "6rem", md: "8rem" },
      paddingX: { base: "1.5rem", md: "4rem" },
      backgroundColor: backgroundColor,
    })}>
      <div className={css({ maxWidth: "1280px", marginX: "auto" })}>
        <div className={css({ marginBottom: "4rem" })}>
          <h2 className={css({
            fontFamily: "headline",
            fontWeight: "bold",
            fontSize: { base: "4xl", md: "5xl" },
            letterSpacing: "tighter",
            color: isDarkSection ? "white" : "primary",
            textTransform: "uppercase",
          })}>
            {heading}
          </h2>
          {subheading && (
            <p className={css({
              color: isDarkSection ? "rgba(255, 255, 255, 0.7)" : "on-surface-variant",
              marginTop: "0.5rem",
              fontSize: "lg",
              fontWeight: "medium",
            })}>
              {subheading}
            </p>
          )}
        </div>

        <div className={css({
          display: "grid",
          gridTemplateColumns: {
            base: "1fr",
            md: "repeat(3, 1fr)",
          },
          gap: "2rem",
        })}>
          {members?.map((member, index) => (
            <div
              key={index}
              className={`group ${css({
                position: "relative",
                overflow: "hidden",
                backgroundColor: isDarkSection ? "rgba(255, 255, 255, 0.05)" : "surface-container-low",
                aspectRatio: "3/4",
              })}`}
            >
              {/* Member Portrait */}
              <div className={css({
                width: "full",
                height: "full",
                filter: "grayscale(100%)",
                transition: "all 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
                _groupHover: {
                  filter: "grayscale(0%)",
                  transform: "scale(1.02)",
                },
              })}>
                {member.profileImage && (
                  <Image
                    src={urlFor(member.profileImage).width(800).height(1067).fit("crop").url()}
                    alt={member.name}
                    fill
                    className={css({ objectFit: "cover" })}
                  />
                )}
              </div>

              {/* Glass Overlay Content */}
              <div className={css({
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "full",
                padding: "2rem",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(12px)", // glass-nav aesthetic
                transform: "translateY(2.5rem)",
                transition: "all 0.5s ease",
                _groupHover: {
                  transform: "translateY(0)",
                },
              })}>
                <p className={css({
                  fontSize: "10px",
                  fontWeight: "black",
                  letterSpacing: "0.2em",
                  color: "tertiary",
                  textTransform: "uppercase",
                  marginBottom: "0.25rem",
                })}>
                  {member.position}
                </p>
                <h3 className={css({
                  fontFamily: "headline",
                  fontSize: "2xl",
                  fontWeight: "bold",
                  color: "primary",
                  letterSpacing: "tight",
                })}>
                  {member.name}
                </h3>
                
                {/* Biography reveals on hover */}
                <div className={css({
                  marginTop: "1rem",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                  transitionDelay: "200ms",
                  _groupHover: {
                    opacity: 1,
                  },
                })}>
                  <p className={css({
                    fontSize: "sm",
                    color: "on-surface-variant",
                    lineHeight: "relaxed",
                  })}>
                    {member.bio}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
