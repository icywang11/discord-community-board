import type { Metadata } from "next";
import { SanrioScene } from "@/components/sanrio-scene";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

export const metadata: Metadata = {
  title: "Discord社区活动数据看板",
  description: "创建人 Icy Wang。改善社区运营的现状，提升平时的效率。",
};

const fontBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="relative min-h-full flex flex-col">
        <style>{`
          @font-face {
            font-family: "ZCOOL KuaiLe";
            src: url("${fontBase}/fonts/zcool-kuaile.woff2") format("woff2");
            font-weight: 400;
            font-display: swap;
          }
          @font-face {
            font-family: "Fredoka";
            src: url("${fontBase}/fonts/fredoka.woff2") format("woff2");
            font-weight: 500;
            font-display: swap;
          }
        `}</style>
        <SanrioScene />
        <div className="relative z-10 flex min-h-full flex-1 flex-col">
          <TooltipProvider>{children}</TooltipProvider>
        </div>
      </body>
    </html>
  );
}
