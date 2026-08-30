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
  return <Tag className={cn("font-display", className)}>{text}</Tag>;
}
