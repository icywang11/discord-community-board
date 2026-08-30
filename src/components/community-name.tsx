import { cn } from "@/lib/utils";

/** Keep A–D in a readable sans so the serif display font does not turn B/D into lookalikes. */
export function CommunityName({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  const match = label.match(/^(社区)\s*([A-D])$/);
  if (!match) {
    return <span className={className}>{label}</span>;
  }
  return (
    <span className={cn("inline-flex items-baseline gap-1.5", className)}>
      <span className="font-display">{match[1]}</span>
      <span className="font-sans font-bold tracking-wide">{match[2]}</span>
    </span>
  );
}
