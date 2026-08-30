import { cn } from "@/lib/utils";

type Kind = "berry" | "mint" | "grape" | "pudding";

const MARK: Record<Kind, string> = {
  berry: "A",
  mint: "B",
  grape: "C",
  pudding: "D",
};

export function Mascot({
  kind,
  className,
}: {
  kind: Kind;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid place-items-center rounded-full bg-foreground font-sans text-lg font-semibold tracking-[0.2em] text-background",
        className,
      )}
      aria-hidden
    >
      {MARK[kind]}
    </div>
  );
}
