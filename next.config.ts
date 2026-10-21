import type { NextConfig } from "next";
import path from "path";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  ...(isGithubPages
    ? {
        output: "export",
        images: { unoptimized: true },
        trailingSlash: true,
      }
    : {}),
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
