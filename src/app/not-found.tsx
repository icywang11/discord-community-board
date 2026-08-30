import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

export default function NotFound() {
  return (
    <div className="min-h-full">
      <SiteHeader />
      <main className="mx-auto max-w-lg px-6 py-20 text-center">
        <p className="font-display text-6xl italic">404</p>
        <p className="mt-3 text-sm text-muted-foreground">这个社区页不存在，回到目录再选一张卡片吧。</p>
        <Link href="/communities" className="mt-8 inline-block text-[11px] tracking-[0.2em] uppercase hover:underline">
          查看社区详情 →
        </Link>
      </main>
    </div>
  );
}
