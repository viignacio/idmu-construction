import Footer from "@/components/layout/Footer";
import Link from "next/link";
import Header from "@/components/layout/Header";
import { client } from "@/sanity/lib/client";
import {
  BUSINESS_INFO_QUERY,
  FOOTER_QUERY,
  HEADER_QUERY,
} from "@/sanity/lib/queries";
import { css } from "../../styled-system/css";

export default async function NotFound() {
  const [headerData, footerData, businessData] = await Promise.all([
    client.fetch(HEADER_QUERY),
    client.fetch(FOOTER_QUERY),
    client.fetch(BUSINESS_INFO_QUERY),
  ]).catch(() => [null, null, null]);

  return (
    <>
      <Header data={headerData} business={businessData} />
      <main
        className={css({
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "4rem",
          backgroundColor: "#F9F9FF",
          minHeight: "calc(100vh - 10rem)",
          paddingTop: "10rem", // Allowance for Header
        })}
      >
        <h1
          className={css({
            fontFamily: "headline",
            fontSize: { base: "8xl", md: "12xl" },
            fontWeight: "900",
            color: "primary",
            lineHeight: "none",
            marginBottom: "1rem",
            letterSpacing: "tighter",
          })}
        >
          404
        </h1>
        <h2
          className={css({
            fontFamily: "headline",
            fontSize: { base: "xl", md: "2xl" },
            fontWeight: "bold",
            color: "primary",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            marginBottom: "2rem",
          })}
        >
          Structural Error Detected.
        </h2>
        <p
          className={css({
            fontFamily: "body",
            fontSize: "lg",
            color: "secondary",
            maxWidth: "32rem",
            marginBottom: "3rem",
            lineHeight: "relaxed",
          })}
        >
          The architectural path you followed does not exist in our current blueprints or has been demolished.
        </p>

        <Link
          href="/"
          className={css({
            backgroundColor: "primary",
            color: "white",
            paddingX: "3rem",
            paddingY: "1.25rem",
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: "widest",
            textDecoration: "none",
            fontSize: "sm",
            transition: "all 0.2s",
            _hover: { backgroundColor: "tertiary", transform: "translateY(-2px)" },
            _active: { transform: "translateY(0)" },
          })}
        >
          Return to Ground Zero →
        </Link>
      </main>
      <Footer data={footerData} business={businessData} />
    </>
  );
}
