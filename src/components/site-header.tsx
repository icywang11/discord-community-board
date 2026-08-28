import Link from "next/link";
import { cn } from "@/lib/utils";

export function SiteHeader({ compact = false }: { compact?: boolean }) {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-white/80 bg-white/75 backdrop-blur-md">
      <div className={cn("mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6", compact && "py-2.5")}>
        <Link href="/" className="flex items-center gap-2 font-cute text-lg text-rose-500">
          <span className="grid size-8 place-items-center rounded-full bg-rose-100 text-base shadow-sm">♡</span>
          Discord看板
        </Link>
        <nav className="flex items-center gap-0.5 text-sm sm:gap-1">
          <Link className="rounded-full px-2 py-1.5 hover:bg-rose-50 sm:px-3" href="/">
            封面
          </Link>
          <Link className="rounded-full px-2 py-1.5 hover:bg-teal-50 sm:px-3" href="/communities">
            详情
          </Link>
          <Link className="rounded-full px-2 py-1.5 hover:bg-amber-50 sm:px-3" href="/cases">
            案例
          </Link>
          <Link className="rounded-full px-2 py-1.5 hover:bg-violet-50 sm:px-3" href="/tips">
            提示
          </Link>
        </nav>
      </div>
    </header>
  );
}
