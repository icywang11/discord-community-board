import Link from "next/link";
import { communityDWeek } from "@/lib/community-d";

export function CommunityDWeek() {
  return (
    <section className="rounded-[2rem] border-[3px] border-white bg-[#fff8e8] p-5 shadow-[0_12px_32px_rgba(255,122,162,0.08)] sm:p-6">
      <p className="font-cute text-xs tracking-[0.2em] text-amber-500">
        最近一周活动 · {communityDWeek.period}
      </p>
      <h2 className="mt-1 font-cute text-2xl text-rose-500">版更周把这几场跑完了</h2>
      <p className="mt-2 text-sm leading-7 text-foreground/70">{communityDWeek.summary}</p>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <Mini label="外显人数" value={communityDWeek.members} delta={communityDWeek.membersDelta} />
        <Mini label="日均访客" value={communityDWeek.dau} delta={communityDWeek.dauDelta} />
        <Mini label="周消息" value={communityDWeek.messages} delta={communityDWeek.messagesDelta} />
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {communityDWeek.activities.map((item) => (
          <article key={item.name} className="rounded-[1.5rem] bg-white/90 px-4 py-3">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-cute text-lg text-rose-500">{item.name}</h3>
              <span className="font-cute text-[11px] text-amber-500">{item.tag}</span>
            </div>
            <p className="mt-1 text-[11px] text-foreground/45">{item.period}</p>
            <p className="mt-2 text-sm leading-6 text-foreground/80">{item.stats}</p>
            <p className="mt-1 font-cute text-sm text-teal-600">{item.wow}</p>
            <p className="mt-1 text-sm leading-6 text-foreground/60">{item.takeaway}</p>
          </article>
        ))}
      </div>
      <div className="mt-4 rounded-[1.5rem] bg-white/80 px-4 py-3">
        <p className="font-cute text-xs tracking-[0.2em] text-amber-500">下周先做</p>
        <ul className="mt-2 space-y-1.5 text-sm leading-6 text-foreground/70">
          {communityDWeek.nextMoves.map((item) => (
            <li key={item}>· {item}</li>
          ))}
        </ul>
      </div>
      <p className="mt-4 text-sm">
        <Link href="/cases" className="text-rose-500 underline-offset-4 hover:underline">
          对照数字也写进代表做法了 →
        </Link>
      </p>
    </section>
  );
}

function Mini({ label, value, delta }: { label: string; value: string; delta: string }) {
  const up = delta.includes("+") || delta.includes("↑");
  return (
    <div className="rounded-2xl bg-white/90 px-3 py-3 text-center">
      <p className="font-cute text-[11px] text-amber-500">{label}</p>
      <p className="font-num mt-1 text-lg text-rose-500 sm:text-2xl">{value}</p>
      <p className={`mt-1 text-[11px] ${up ? "text-teal-600" : "text-violet-400"}`}>{delta}</p>
    </div>
  );
}
