import { cn } from "@/lib/utils";

export function KpiCloud({
  label,
  value,
}: {
  label: string;
  value: string;
  tone?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div className="grid size-[5.5rem] place-items-center rounded-full bg-foreground text-background sm:size-24">
        <span className="font-num text-2xl leading-none sm:text-3xl">{value}</span>
      </div>
      <p className={cn("kicker")}>{label}</p>
    </div>
  );
}
