import type { Metadata } from "next";
import { M_PLUS_Rounded_1c, ZCOOL_KuaiLe } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const rounded = M_PLUS_Rounded_1c({
  variable: "--font-rounded",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const display = ZCOOL_KuaiLe({
  variable: "--font-cute",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "社区活动数据看板",
  description: "四个社区的活动效果对照、Top 活动与改进建议。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-CN"
      className={`${rounded.variable} ${display.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
