import Link from "next/link";
import { communityDWeek } from "@/lib/community-d";

export function CommunityDWeek() {
  return (
    <section className="card-editorial p-6 sm:p-8">
      <p className="kicker">最近一周活动 · {communityDWeek.period}</p>
      <h2 className="mt-2 font-display text-3xl">版更周把这几场跑完了</h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">{communityDWeek.summary}</p>
      <div className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-border bg-border">
        <Mini label="外显人数" value={communityDWeek.members} delta={communityDWeek.membersDelta} />
        <Mini label="日均访客" value={communityDWeek.dau} delta={communityDWeek.dauDelta} />
        <Mini label="周消息" value={communityDWeek.messages} delta={communityDWeek.messagesDelta} />
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {communityDWeek.activities.map((item) => (
          <article key={item.name} className="rounded-lg bg-[#f7f6f2] px-4 py-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display text-xl">{item.name}</h3>
              <span className="kicker">{item.tag}</span>
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground">{item.period}</p>
            <p className="mt-3 text-sm leading-6">{item.stats}</p>
            <p className="mt-1 font-display text-lg">{item.wow}</p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.takeaway}</p>
          </article>
        ))}
      </div>
      <div className="mt-5 rounded-lg border border-border px-4 py-4">
        <p className="kicker">下周先做</p>
        <ul className="mt-2 space-y-1.5 text-sm leading-6 text-muted-foreground">
          {communityDWeek.nextMoves.map((item) => (
            <li key={item}>· {item}</li>
          ))}
        </ul>
      </div>
      <p className="mt-5 text-[11px] tracking-[0.18em] uppercase">
        <Link href="/cases" className="hover:underline">
          对照数字也写进代表做法了 →
        </Link>
      </p>
    </section>
  );
}

function Mini({ label, value, delta }: { label: string; value: string; delta: string }) {
  return (
    <div className="bg-white px-3 py-4 text-center">
      <p className="kicker">{label}</p>
      <p className="font-num mt-2 text-xl sm:text-2xl">{value}</p>
      <p className="mt-1 text-[11px] text-muted-foreground">{delta}</p>
    </div>
  );
}
