import { cn } from "@/lib/utils";

export function BounceText({
  text,
  as: Tag = "span",
  className,
}: {
  text: string;
  as?: "h1" | "h2" | "p" | "span";
  className?: string;
}) {
  return (
    <Tag className={cn("font-cute", className)}>
      {Array.from(text).map((ch, index) => (
        <span
          key={`${ch}-${index}`}
          className="bounce-glyph"
          style={{ animationDelay: `${index * 0.08}s` }}
        >
          {ch === " " ? "\u00a0" : ch}
        </span>
      ))}
    </Tag>
  );
}
