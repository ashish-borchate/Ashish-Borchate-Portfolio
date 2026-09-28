import type { NextConfig } from "next";

const staticExport = process.env.BUILD_STATIC === "1";

const nextConfig: NextConfig = {
  ...(staticExport
    ? {
        output: "export",
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
