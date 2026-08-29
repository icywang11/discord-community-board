import { OptimizeBoard } from "@/components/optimize-board";
import { SiteHeader } from "@/components/site-header";

export default function OptimizePage() {
  return (
    <div className="relative min-h-full">
      <SiteHeader />
      <main className="relative z-10 mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <OptimizeBoard />
      </main>
    </div>
  );
}
