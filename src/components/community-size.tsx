import { cn } from "@/lib/utils";
import type { CommunitySize as Size } from "@/lib/types";

export function CommunitySize({
  size,
  className,
}: {
  size: Size[];
  className?: string;
}) {
  if (!size?.length) return null;
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {size.map((item) => (
        <span
          key={`${item.label}-${item.value}`}
          className="rounded-full border border-border bg-white px-3 py-1 text-sm text-foreground"
        >
          {item.label} {item.value}
        </span>
      ))}
    </div>
  );
}
