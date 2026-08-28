import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

export default function NotFound() {
  return (
    <div className="min-h-full">
      <SiteHeader />
      <main className="mx-auto max-w-lg px-6 py-20 text-center">
        <p className="font-display text-5xl text-rose-400">404</p>
        <p className="mt-3 text-sm text-foreground/70">这个社区页不存在，回到目录再选一张卡片吧。</p>
        <Link href="/communities" className="mt-6 inline-block rounded-full bg-primary px-5 py-2 font-display text-primary-foreground">
          回到 Discord社区详情
        </Link>
      </main>
    </div>
  );
}
