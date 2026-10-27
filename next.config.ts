import type { NextConfig } from "next";
import path from "node:path";
const nextConfig: NextConfig = {
  poweredByHeader: false,
  distDir: process.env.PORTFOLIO_BUILD_DIR || ".next",
  outputFileTracingRoot: path.resolve(__dirname),
  turbopack: { root: path.resolve(__dirname) },
};
export default nextConfig;
