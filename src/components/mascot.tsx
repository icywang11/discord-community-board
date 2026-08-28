import { cn } from "@/lib/utils";

type Kind = "berry" | "mint" | "grape" | "pudding";

const FACE: Record<Kind, { fill: string; blush: string; bow: string }> = {
  berry: { fill: "#fff5f8", blush: "#ffb3c7", bow: "#ff7aa2" },
  mint: { fill: "#f3fffb", blush: "#9de0d4", bow: "#5ec8b8" },
  grape: { fill: "#f8f4ff", blush: "#d4c2ff", bow: "#a78bfa" },
  pudding: { fill: "#fff8e8", blush: "#ffd28a", bow: "#f5b942" },
};

export function Mascot({
  kind,
  className,
}: {
  kind: Kind;
  className?: string;
}) {
  const c = FACE[kind];
  return (
    <svg viewBox="0 0 120 120" className={cn("drop-shadow-sm", className)} aria-hidden>
      <ellipse cx="60" cy="108" rx="28" ry="6" fill="black" opacity="0.08" />
      <circle cx="60" cy="64" r="38" fill={c.fill} stroke="#3a2a32" strokeWidth="3" />
      <circle cx="46" cy="62" r="5" fill="#3a2a32" />
      <circle cx="74" cy="62" r="5" fill="#3a2a32" />
      <circle cx="47.5" cy="60.5" r="1.5" fill="white" />
      <circle cx="75.5" cy="60.5" r="1.5" fill="white" />
      <circle cx="42" cy="72" r="6" fill={c.blush} opacity="0.85" />
      <circle cx="78" cy="72" r="6" fill={c.blush} opacity="0.85" />
      <path d="M52 78 Q60 86 68 78" fill="none" stroke="#3a2a32" strokeWidth="3" strokeLinecap="round" />
      <path d="M60 18 L48 36 Q60 30 72 36 Z" fill={c.bow} stroke="#3a2a32" strokeWidth="3" strokeLinejoin="round" />
      <circle cx="60" cy="34" r="6" fill={c.bow} stroke="#3a2a32" strokeWidth="3" />
    </svg>
  );
}
