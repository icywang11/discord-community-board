import type { NextConfig } from "next";

const isPages = process.env.GITHUB_PAGES === "1";
const basePath = isPages ? "/discord-community-board" : "";

const nextConfig: NextConfig = {
  output: isPages ? "export" : undefined,
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: isPages,
  images: { unoptimized: true },
  allowedDevOrigins: [
    "127.0.0.1",
    "localhost",
    "::1",
    "0.0.0.0",
    "*.cursor.com",
    "*.cursor.sh",
  ],
};

export default nextConfig;
