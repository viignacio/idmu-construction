import ModuleRenderer from "@/components/modules/ModuleRenderer";
import { client } from "@/sanity/lib/client";
import { PAGE_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import { css } from "@/styled-system/css";

export default async function Home() {
  const data = await client.fetch(PAGE_QUERY, { slug: "home" });
  const page = data?.page;

  if (!page) {
    // If no home page is found, we can show a prompt or notFound
    return (
      <div className={css({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        paddingX: "2rem",
        textAlign: "center",
        backgroundColor: "surface"
      })}>
        <h1 className={css({
          fontSize: "4xl",
          fontFamily: "headline",
          fontWeight: "bold",
          marginBottom: "1rem",
          letterSpacing: "tighter"
        })}>
          NO LANDING SITE DETECTED.
        </h1>
        <p className={css({
          color: "on-surface-variant", // Equivalent or mapped inside Panda config
          maxWidth: "md"
        })}>
          Please create a page with the slug <b className={css({ fontWeight: "bold" })}>"home"</b> in Sanity Studio to begin your monolithic construction.
        </p>
      </div>
    );
  }

  return (
    <div className={css({ display: "flex", flexDirection: "column", width: "full" })}>
      <ModuleRenderer modules={page.modules as any[]} business={data?.business} />
    </div>
  );
}

