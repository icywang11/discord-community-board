import Link from "next/link";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "封面" },
  { href: "/communities", label: "详情" },
  { href: "/cases", label: "案例" },
  { href: "/tips", label: "提示" },
  { href: "/optimize", label: "优化" },
];

export function SiteHeader({ compact = false }: { compact?: boolean }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-[#f3f2ee]/85 backdrop-blur-md">
      <div className={cn("mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6", compact && "py-3")}>
        <Link href="/" className="flex items-center gap-3 text-foreground">
          <span className="grid size-8 place-items-center rounded-full bg-foreground text-[10px] tracking-[0.14em] text-background">
            IW
          </span>
          <span className="font-display text-xl italic leading-none">Archive</span>
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-0.5 text-[11px] tracking-[0.18em] uppercase text-muted-foreground sm:gap-1">
          {NAV.map((item) => (
            <Link key={item.href} className="rounded-full px-2.5 py-1.5 hover:bg-white hover:text-foreground sm:px-3" href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
