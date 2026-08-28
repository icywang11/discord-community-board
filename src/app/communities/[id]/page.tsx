import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CommunityView } from "@/components/community-view";
import { SiteHeader } from "@/components/site-header";
import { catalog, getCommunity } from "@/lib/catalog";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return catalog.communities.map((item) => ({ id: item.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/communities/[id]">): Promise<Metadata> {
  const { id } = await params;
  const community = getCommunity(id);
  return {
    title: community ? `${community.label} · 社区活动数据看板` : "社区活动数据看板",
  };
}

export default async function CommunityPage({ params }: PageProps<"/communities/[id]">) {
  const { id } = await params;
  const community = getCommunity(id);
  if (!community) notFound();

  return (
    <div className="min-h-full">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
        <Link
          href="/communities"
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "mb-4 rounded-full")}
        >
          ← 返回社区 1234
        </Link>
        <CommunityView community={community} />
      </main>
    </div>
  );
}
