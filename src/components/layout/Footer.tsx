"use client";

import { PortableText } from "@portabletext/react";
import { css } from "../../../styled-system/css";

export default function Footer({ data, business }: any) {
  if (!data) return null;

  return (
    <footer
      className={css({
        width: "full",
        padding: "4rem 2rem",
        backgroundColor: "primary",
        backgroundImage: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3))",
        color: "white",
        display: "grid",
        gridTemplateColumns: { base: "1fr", md: "repeat(5, 1fr)" },
        gap: "3rem",
        border: "none",
        fontFamily: "body",
      })}
    >
      <div
        className={css({
          gridColumn: { base: "span 1", md: "span 1" },
          display: "flex",
          flexDirection: "column",
        })}
      >
        <a
          href="/"
          className={css({
            height: "8rem",
            width: "fit-content",
            display: "flex",
            alignItems: "center",
            marginTop: "-4rem",
            marginBottom: "1.5rem",
            textDecoration: "none",
          })}
        >
          {business?.logoUrl ? (
            <img
              src={business.logoUrl}
              alt={data?.brandName || business?.name}
              className={css({
                height: "full",
                width: "auto",
                objectFit: "contain",
                objectPosition: "left top",
              })}
            />
          ) : (
            <span
              className={css({
                fontSize: "2xl",
                fontWeight: "black",
                color: "white",
                fontFamily: "headline",
              })}
            >
              {data?.brandName || business?.name || "IDMU Construction"}
            </span>
          )}
        </a>
        <div
          className={css({
            color: "#CBD5E1",
            fontSize: "sm",
            lineHeight: "relaxed",
            paddingTop: "0.5rem",
          })}
        >
          <PortableText value={data.description} />
        </div>
      </div>

      {/* Spacer Column */}
      <div className={css({ display: { base: "none", md: "block" } })} />

      <div
        className={css({ display: "flex", flexDirection: "column", gap: "1rem" })}
      >
        <h5
          className={css({
            fontWeight: "bold",
            fontSize: "xs",
            textTransform: "uppercase",
            letterSpacing: "widest",
            color: "white",
            marginBottom: "0.5rem",
            opacity: 0.9,
            fontFamily: "headline",
          })}
        >
          {data.column1?.title || "Navigation"}
        </h5>
        {data.column1?.links?.map((link: any) => (
          <a
            key={link.url}
            href={link.url}
            className={css({
              color: "#CBD5E1",
              textDecoration: "none",
              transition: "all 0.2s",
              _hover: { color: "white" },
            })}
          >
            {link.text}
          </a>
        ))}
      </div>

      <div
        className={css({ display: "flex", flexDirection: "column", gap: "1rem" })}
      >
        <h5
          className={css({
            fontWeight: "bold",
            fontSize: "xs",
            textTransform: "uppercase",
            letterSpacing: "widest",
            color: "white",
            marginBottom: "0.5rem",
            opacity: 0.9,
            fontFamily: "headline",
          })}
        >
          {data.column2?.title || "Insights"}
        </h5>
        {data.column2?.links?.map((link: any) => (
          <a
            key={link.url}
            href={link.url}
            className={css({
              color: "#CBD5E1",
              textDecoration: "none",
              transition: "all 0.2s",
              _hover: { color: "white" },
            })}
          >
            {link.text}
          </a>
        ))}
      </div>

      <div
        className={css({ display: "flex", flexDirection: "column", gap: "1rem" })}
      >
        <h5
          className={css({
            fontWeight: "bold",
            fontSize: "xs",
            textTransform: "uppercase",
            letterSpacing: "widest",
            color: "white",
            marginBottom: "0.5rem",
            opacity: 0.9,
            fontFamily: "headline",
          })}
        >
          {data.connect?.title || "Connect"}
        </h5>
        <div
          className={css({
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            fontSize: "sm",
          })}
        >
          {business?.email && (
            <a
              href={`mailto:${business.email}`}
              className={css({
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                color: "#CBD5E1",
                textDecoration: "none",
                _hover: { color: "white" },
              })}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "18px" }}
              >
                mail
              </span>
              {business.email}
            </a>
          )}
          {business?.phone && (
            <a
              href={`tel:${business.phone}`}
              className={css({
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                color: "#CBD5E1",
                textDecoration: "none",
                _hover: { color: "white" },
              })}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "18px" }}
              >
                call
              </span>
              {business.phone}
            </a>
          )}
          {business?.address && (
            <div
              className={css({
                display: "flex",
                alignItems: "flex-start",
                gap: "0.75rem",
                color: "#CBD5E1",
                lineHeight: "relaxed",
              })}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "18px", marginTop: "2px" }}
              >
                location_on
              </span>
              <p className={css({ whiteSpace: "pre-line" })}>
                {business.address}
              </p>
            </div>
          )}
        </div>
      </div>

      <div
        className={css({
          gridColumn: { base: "span 1", md: "span 5" },
          borderTop: "1px solid rgba(65, 90, 119, 0.2)",
          paddingTop: "2rem",
          marginTop: "2rem",
          display: "flex",
          flexDirection: { base: "column", md: "row" },
          justifyContent: "space-between",
          color: "#CBD5E1",
          fontSize: "xs",
          textTransform: "uppercase",
          letterSpacing: "widest",
          fontFamily: "headline",
        })}
      >
        <p>{data.copyright}</p>
        <p>{data.attribution}</p>
      </div>
    </footer>
  );
}
