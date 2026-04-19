"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { css, cx } from "@/styled-system/css";
import NavLinks from "./NavLinks";
import { urlFor } from "@/sanity/lib/image";
import { HEADER_QUERYResult, BUSINESS_INFO_QUERYResult } from "../../../sanity.types";

interface HeaderProps {
  data: HEADER_QUERYResult;
  business: BUSINESS_INFO_QUERYResult;
}

export default function Header({ data, business }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  
  const logo = business?.logo;
  const brandName = data?.brandName || business?.name || "IDMU Construction";
  const links = data?.links || [];
  const cta = data?.cta;

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <>
      <nav
        className={css({
          position: "fixed",
          top: 0,
          width: "full",
          zIndex: 100,
          backgroundColor: isOpen ? "background" : "rgba(255, 255, 255, 0.8)",
          backdropFilter: isOpen ? "none" : "blur(10px)",
          transition: "background-color 0.3s ease",
        })}
      >
        <div
          className={css({
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "full",
            padding: "0 2rem",
            height: "5rem",
            maxWidth: "full",
            margin: "0 auto",
          })}
        >
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
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
              zIndex: 110,
            })}
          >
            {logo ? (
              <Image
                src={urlFor(logo).width(400).auto("format").url()}
                alt={brandName}
                width={200}
                height={50}
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

          {/* Desktop Navigation */}
          <NavLinks links={links} />

          {/* Desktop CTA */}
          <Link
            href={cta?.url || "#"}
            className={css({ 
              textDecoration: "none",
              display: { base: "none", md: "block" }
            })}
          >
            <button
              className={css({
                backgroundColor: "primary",
                color: "white",
                padding: "0.5rem 2rem",
                fontWeight: "900",
                fontFamily: "headline",
                textTransform: "uppercase",
                letterSpacing: "widest",
                fontSize: "xs",
                border: "none",
                cursor: "pointer",
                transition: "all 300ms",
                _hover: { opacity: 0.8 },
                _active: { transform: "scale(0.95)" },
              })}
            >
              {cta?.text || "Get a Quote"}
            </button>
          </Link>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={css({
              display: { base: "flex", md: "none" },
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "primary",
              zIndex: 110,
              padding: "0.5rem",
            })}
            aria-label="Toggle Menu"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>
              {isOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={css({
        position: "fixed",
        inset: 0,
        backgroundColor: "background",
        zIndex: 90,
        display: { base: "flex", md: "none" },
        flexDirection: "column",
        padding: "8rem 2rem 4rem",
        transform: isOpen ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        overflowY: "auto",
      })}>
        <div className={css({
          display: "flex",
          flexDirection: "column",
          gap: "2.5rem",
          flex: 1,
        })}>
          {links.map((link: any) => (
            <Link
              key={link.url}
              href={link.url}
              className={css({
                fontFamily: "headline",
                fontSize: "4xl",
                fontWeight: "900",
                textTransform: "uppercase",
                textDecoration: "none",
                color: pathname === link.url ? "tertiary" : "primary",
                letterSpacing: "tighter",
                transition: "all 0.3s ease",
              })}
            >
              {link.text}
            </Link>
          ))}
        </div>

        <div className={css({
          marginTop: "4rem",
          borderTop: "1px solid",
          borderColor: "rgba(0,0,0,0.1)",
          paddingTop: "2.5rem",
        })}>
          <Link
            href={cta?.url || "#"}
            className={css({ textDecoration: "none" })}
          >
            <button
              className={css({
                width: "100%",
                backgroundColor: "primary",
                color: "white",
                padding: "1.25rem",
                fontWeight: "900",
                fontFamily: "headline",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                fontSize: "sm",
                border: "none",
                cursor: "pointer",
              })}
            >
              {cta?.text || "Get a Quote"}
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
