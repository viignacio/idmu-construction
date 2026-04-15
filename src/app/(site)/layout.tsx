import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { client } from "@/sanity/lib/client";
import {
  BUSINESS_INFO_QUERY,
  FOOTER_QUERY,
  HEADER_QUERY,
} from "@/sanity/lib/queries";
import { css } from "../../../styled-system/css";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [headerData, footerData, businessData] = await Promise.all([
    client.fetch(HEADER_QUERY),
    client.fetch(FOOTER_QUERY),
    client.fetch(BUSINESS_INFO_QUERY),
  ]).catch((err) => {
    console.error("Sanity fetch failed:", err);
    return [null, null, null];
  });

  return (
    <>
      <Header data={headerData} business={businessData} />
      <main className={css({ flex: 1, paddingTop: "5rem" })}>{children}</main>
      <Footer data={footerData} business={businessData} />
    </>
  );
}

