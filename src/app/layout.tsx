import type { Metadata } from "next";
import { PaperGrid } from "@/components/paper-grid";
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
            font-family: "Cormorant Garamond";
            src: url("${fontBase}/fonts/cormorant-600.woff2") format("woff2");
            font-weight: 500 700;
            font-style: normal;
            font-display: swap;
          }
          @font-face {
            font-family: "Cormorant Garamond";
            src: url("${fontBase}/fonts/cormorant-500-italic.woff2") format("woff2");
            font-weight: 500;
            font-style: italic;
            font-display: swap;
          }
          @font-face {
            font-family: "Noto Serif SC";
            src: url("${fontBase}/fonts/noto-serif-sc-400.woff2") format("woff2");
            font-weight: 400 600;
            font-style: normal;
            font-display: swap;
          }
        `}</style>
        <PaperGrid />
        <div className="relative z-10 flex min-h-full flex-1 flex-col">
          <TooltipProvider>{children}</TooltipProvider>
        </div>
      </body>
    </html>
  );
}
