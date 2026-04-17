import ModuleRenderer from "@/components/modules/ModuleRenderer";
import { client } from "@/sanity/lib/client";
import { PAGE_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await client.fetch(PAGE_QUERY, { slug });

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
    const page = await client.fetch(PAGE_QUERY, { slug: "home" });
    if (!page) notFound();
    return (
      <div className="flex flex-col w-full">
        <ModuleRenderer modules={page.modules} />
      </div>
    );
  }

  const page = await client.fetch(PAGE_QUERY, { slug });

  if (!page) {
    notFound();
  }

  return (
    <div className="flex flex-col w-full">
      <ModuleRenderer modules={page.modules} />
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
