import Link from "next/link";
import { css } from "../../../styled-system/css";
import NavLinks from "./NavLinks";

export default function Header({ data, business }: any) {
  const logoUrl = business?.logoUrl;
  const brandName =
    data?.brandName || business?.name || "IDMU Construction";

  return (
    <nav
      className={css({
        position: "fixed",
        top: 0,
        width: "full",
        zIndex: 50,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(10px)",
      })}

    >
      <div
        className={css({
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "full",
          padding: "0 2rem",
          height: "5rem", // Fixed height for the navbar
          maxWidth: "full",
          margin: "0 auto",
        })}
      >
        <Link
          href="/"
          className={css({
            height: "full",
            display: "flex",
            alignItems: "center",
            fontSize: "xl",
            fontWeight: "bold",
            letterSpacing: "tighter",
            textDecoration: "none",
            color: "primary",
            fontFamily: "headline",
          })}
        >
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={brandName}
              className={css({
                height: "full",
                width: "auto",
                objectFit: "contain",
              })}
            />
          ) : (
            brandName
          )}
        </Link>

        <NavLinks links={data?.links} />

        <Link
          href={data?.cta?.url || "#"}
          className={css({ textDecoration: "none" })}
        >
          <button
            className={css({
              backgroundColor: "primary",
              color: "white",
              padding: "0.5rem 2rem",
              fontWeight: "bold",
              fontFamily: "headline",
              textTransform: "uppercase",
              letterSpacing: "widest",
              fontSize: "sm",
              border: "none",
              cursor: "pointer",
              transition: "all 300ms",
              _hover: { opacity: 0.8 },
              _active: { transform: "scale(0.95)" },
            })}
          >
            {data?.cta?.text || "Get a Quote"}
          </button>
        </Link>
      </div>
    </nav>
  );
}
