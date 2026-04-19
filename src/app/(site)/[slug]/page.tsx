import ModuleRenderer from "@/components/modules/ModuleRenderer";
import { client } from "@/sanity/lib/client";
import { PAGE_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { css } from "../../../../styled-system/css";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await client.fetch(PAGE_QUERY, { slug });
  const page = data?.page;

  if (!page) {
    return {
      title: "Page Not Found | IDMU Construction",
    };
  }

  return {
    title: `${page.title} | IDMU Construction`,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  
  // If slug is "home", redirect to root or just handle it
  if (slug === "home") {
    const data = await client.fetch(PAGE_QUERY, { slug: "home" });
    const page = data?.page;
    if (!page) notFound();
    return (
      <div className={css({ display: "flex", flexDirection: "column", width: "full" })}>
        <ModuleRenderer modules={(page.modules || []) as any[]} business={data?.business} />
      </div>
    );
  }

  const data = await client.fetch(PAGE_QUERY, { slug });
  const page = data?.page;

  if (!page) {
    notFound();
  }

  return (
    <div className={css({ display: "flex", flexDirection: "column", width: "full" })}>
      <ModuleRenderer modules={(page.modules || []) as any[]} business={data?.business} />
    </div>
  );
}

// Optional: Pre-render all pages at build time
export async function generateStaticParams() {
  const pages = await client.fetch(`*[_type == "page" && defined(slug.current)]{ "slug": slug.current }`);
  
  return pages
    .filter((page: { slug: string }) => page.slug !== "/")
    .map((page: { slug: string }) => ({
      slug: page.slug,
    }));
}
