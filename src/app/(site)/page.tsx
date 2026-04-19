import ModuleRenderer from "@/components/modules/ModuleRenderer";
import { client } from "@/sanity/lib/client";
import { PAGE_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";

export default async function Home() {
  const data = await client.fetch(PAGE_QUERY, { slug: "home" });
  const page = data?.page;

  if (!page) {
    // If no home page is found, we can show a prompt or notFound
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-8 text-center bg-surface">
        <h1 className="text-4xl font-headline font-bold mb-4 tracking-tighter">
          NO LANDING SITE DETECTED.
        </h1>
        <p className="text-on-surface-variant max-w-md">
          Please create a page with the slug <b>"home"</b> in Sanity Studio to begin your monolithic construction.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <ModuleRenderer modules={page.modules} business={data?.business} />
    </div>
  );
}

