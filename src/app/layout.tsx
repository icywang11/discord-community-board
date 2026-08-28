import type { Metadata } from "next";
import { SanrioScene } from "@/components/sanrio-scene";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

export const metadata: Metadata = {
  title: "Discord社区活动数据看板",
  description: "创建人 Icy Wang。改善社区运营的现状，提升平时的效率。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="relative min-h-full flex flex-col">
        <SanrioScene />
        <div className="relative z-10 flex min-h-full flex-1 flex-col">
          <TooltipProvider>{children}</TooltipProvider>
        </div>
      </body>
    </html>
  );
}
