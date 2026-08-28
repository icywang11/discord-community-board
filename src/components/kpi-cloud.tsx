import { cn } from "@/lib/utils";

const TONE = {
  pink: { fill: "#fff5f8", bow: "#ff7aa2", text: "text-rose-500", label: "text-rose-400" },
  mint: { fill: "#f3fffb", bow: "#5ec8b8", text: "text-teal-600", label: "text-teal-500" },
  grape: { fill: "#f8f4ff", bow: "#a78bfa", text: "text-violet-500", label: "text-violet-400" },
  sun: { fill: "#fff8e8", bow: "#f5b942", text: "text-amber-500", label: "text-amber-500" },
} as const;

export function KpiCloud({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: keyof typeof TONE;
}) {
  const c = TONE[tone];
  return (
    <div className="relative px-1 pt-5 text-center">
      <svg viewBox="0 0 80 56" className="sanrio-wiggle absolute left-1/2 top-0 w-10 -translate-x-1/2" aria-hidden>
        <path d="M40 28 L16 8 Q30 26 16 48 Z" fill={c.bow} stroke="#3a2a32" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M40 28 L64 8 Q50 26 64 48 Z" fill={c.bow} stroke="#3a2a32" strokeWidth="2.2" strokeLinejoin="round" />
        <circle cx="40" cy="28" r="7" fill="#fff6b0" stroke="#3a2a32" strokeWidth="2.2" />
      </svg>
      <div
        className={cn(
          "rounded-[2.4rem] border-[3px] border-white px-3 pb-4 pt-6 shadow-[0_10px_28px_rgba(255,122,162,0.14)]",
        )}
        style={{ background: c.fill }}
      >
        <div className={cn("font-cute text-[13px]", c.label)}>{label}</div>
        <div className={cn("font-num mt-1 text-3xl leading-none tracking-wide sm:text-4xl", c.text)}>{value}</div>
      </div>
    </div>
  );
}
